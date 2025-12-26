
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, DetectedItem } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeFrame = async (base64Image: string): Promise<AnalysisResult> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Clean up the base64 string to get only the data part
  const base64Data = base64Image.split(',')[1] || base64Image;

  const prompt = `Analyze this image frame from a video. 
  1. Identify all fashion-related items (clothing, footwear, accessories like watches, bags, hats).
  2. For each item, provide: 
     - A concise name
     - Category (clothing, footwear, accessory)
     - A brief description
     - Estimated bounding box (normalized 0-1000: [ymin, xmin, ymax, xmax])
     - Dominant color
  3. Provide a short summary of the overall style in the frame.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                description: { type: Type.STRING },
                color: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                boundingBox: {
                  type: Type.OBJECT,
                  properties: {
                    ymin: { type: Type.NUMBER },
                    xmin: { type: Type.NUMBER },
                    ymax: { type: Type.NUMBER },
                    xmax: { type: Type.NUMBER }
                  },
                  required: ["ymin", "xmin", "ymax", "xmax"]
                }
              },
              required: ["name", "category", "description", "boundingBox"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["items", "summary"]
      }
    }
  });

  const rawText = response.text;
  try {
    const parsed = JSON.parse(rawText);
    return {
      items: parsed.items.map((item: any, idx: number) => ({
        ...item,
        id: `item-${Date.now()}-${idx}`,
        confidence: item.confidence || 0.95
      })),
      summary: parsed.summary,
      timestamp: new Date().toISOString(),
      imageUrl: base64Image
    };
  } catch (error) {
    console.error("Failed to parse Gemini response:", rawText);
    throw new Error("Failed to process AI analysis results.");
  }
};
