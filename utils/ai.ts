import { GoogleGenAI } from "@google/genai";

// Initialize the client
// Fix: Use process.env.API_KEY exclusively as per guidelines to resolve TS error with import.meta.env
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API Key tidak ditemukan. Pastikan process.env.API_KEY diset.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateVideoPrompt = async (imageBlob: Blob): Promise<string> => {
  if (!apiKey) {
    return "API Key belum dikonfigurasi.";
  }

  try {
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
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Gagal menghasilkan prompt. Pastikan API Key valid atau coba lagi nanti.";
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