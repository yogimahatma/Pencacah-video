import { GoogleGenAI } from "@google/genai";

// Fungsi untuk membuat prompt video
// Sekarang menerima apiKey sebagai parameter agar bisa dinamis (dari input user atau env)
export const generateVideoPrompt = async (imageBlob: Blob, userApiKey?: string): Promise<string> => {
  // Prioritaskan key dari input user, jika tidak ada baru cari dari environment
  // @ts-ignore - process.env handling for Vite
  const apiKey = userApiKey || process.env.API_KEY || import.meta.env?.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("API Key diperlukan. Mohon masukkan API Key Google Gemini Anda.");
  }

  try {
    // Inisialisasi client setiap kali request dengan key yang aktif
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const base64Data = await blobToBase64(imageBlob);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { 
            inlineData: { 
              mimeType: imageBlob.type || 'image/jpeg', 
              data: base64Data 
            } 
          },
          { 
            text: "Analyze this image frame and generate a highly detailed prompt that could be used to generate a video clip starting from this image. Describe the subject, action, setting, lighting, camera angle, and mood. Format as a single descriptive paragraph. Output the prompt in English." 
          }
        ]
      }
    });

    return response.text || "Tidak ada respons dari AI.";
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    // Menangani error spesifik
    if (error.message?.includes('API key')) {
       throw new Error("API Key tidak valid atau kadaluarsa.");
    }
    throw new Error("Gagal menghubungi AI. Cek koneksi internet atau kuota API.");
  }
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};