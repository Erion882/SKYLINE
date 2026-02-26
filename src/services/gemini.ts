import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatWithGemini = async (message: string, history: any[] = []) => {
  const model = "gemini-3-flash-preview";
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: `You are the AI assistant for Skyline Digital, a business specializing in:
1. Drone Shooting (Cinematography, Inspections, Real Estate)
2. Video Editing (Color grading, Sound design, Motion graphics)
3. Web Development (React, Next.js, Full-stack solutions)

Your goal is to help users understand our services, answer questions about pricing (general ranges), and guide them to the booking form.
Be professional, creative, and helpful.`,
    },
  });

  // Convert history to Gemini format if needed, but for simplicity we'll just send the message
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const analyzeBookingRequest = async (text: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this user request and extract booking details if present: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isBookingIntent: { type: Type.BOOLEAN },
          name: { type: Type.STRING },
          service: { type: Type.STRING, description: "One of: Drone, Video, Web" },
          date: { type: Type.STRING, description: "ISO date if mentioned" },
          notes: { type: Type.STRING },
        },
        required: ["isBookingIntent"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};
