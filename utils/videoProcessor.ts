import { FrameData } from '../types';

export const extractFramesFromVideo = async (
  videoFile: File,
  intervalSeconds: number,
  onProgress: (current: number, total: number, log: string) => void
): Promise<FrameData[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    if (!ctx) {
      reject(new Error("Browser tidak mendukung Canvas API 2D."));
      return;
    }

    const videoUrl = URL.createObjectURL(videoFile);
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const frames: FrameData[] = [];
    let currentTime = 0;
    
    // Cleanup function
    const cleanup = () => {
      URL.revokeObjectURL(videoUrl);
      video.remove();
      canvas.remove();
    };

    video.onloadedmetadata = async () => {
      const duration = video.duration;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const totalFramesToExtract = Math.floor(duration / intervalSeconds);
      let extractedCount = 0;

      const seekResolve = () => new Promise<void>((res) => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          res();
        };
        video.addEventListener('seeked', onSeeked);
        video.currentTime = currentTime;
      });

      try {
        // Loop through the video duration
        while (currentTime < duration) {
          onProgress(extractedCount, totalFramesToExtract, `Mencari frame pada detik ke-${currentTime.toFixed(1)}...`);
          
          await seekResolve();
          
          // Draw video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert to blob
          const blob = await new Promise<Blob | null>((resBlob) => {
            canvas.toBlob(resBlob, 'image/jpeg', 0.85);
          });

          if (blob) {
            const timestampStr = currentTime.toFixed(2).replace('.', '_');
            frames.push({
              id: crypto.randomUUID(),
              timestamp: currentTime,
              blob: blob,
              url: URL.createObjectURL(blob),
              fileName: `frame_${timestampStr}s.jpg`
            });
          }

          extractedCount++;
          currentTime += intervalSeconds;
          
          // Give the UI thread a moment to breathe
          await new Promise(r => setTimeout(r, 0));
        }

        onProgress(totalFramesToExtract, totalFramesToExtract, "Selesai mengekstrak semua frame.");
        cleanup();
        resolve(frames);

      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Gagal memuat file video. Format mungkin tidak didukung."));
    };
  });
};
