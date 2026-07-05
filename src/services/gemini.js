import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const analyzeIncident = async (incidentText) => {
  if (!apiKey) {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  if (!apiKey.startsWith("AIza") && !apiKey.startsWith("AQ")) {
    throw new Error("Invalid API key format. Gemini API keys typically start with 'AIza' or 'AQ'.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an expert crisis response AI for cyber harassment, deepfakes, and extortion.
Analyze this incident:
"${incidentText}"

Return ONLY a JSON object (no markdown) with this exact structure:
{
  "harm_type": "string (e.g. Deepfake, Sextortion, Impersonation)",
  "risk_level": "string (Low, Medium, High, Critical)",
  "red_flags": ["string", "string"],
  "agent_trace": ["string", "string"],
  "immediate_steps": ["string", "string"],
  "evidence_checklist": ["string", "string"],
  "report_summary": "string (A formal 2-3 sentence summary)"
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const text = response.text;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze incident with Gemini. " + error.message);
  }
};

export const analyzeScam = async (messageText) => {
  if (!apiKey) {
    throw new Error("Missing Gemini API Key.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Analyze this potentially threatening or scam message:
"${messageText}"

Return ONLY a JSON object with this exact structure:
{
  "scam_confidence": "number (0-100)",
  "threat_type": "string",
  "psychological_tactics": ["string", "string"],
  "risk_level": "string (Low, Medium, High, Critical)",
  "recommended_response": "string"
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1
      }
    });

    const text = response.text;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    return JSON.parse(text.substring(jsonStart, jsonEnd));
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze scam with Gemini.");
  }
};

export const analyzeImage = async (base64Data, mimeType) => {
  if (!apiKey) {
    throw new Error("Missing Gemini API Key.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are ProofShield AI, a digital safety assistant.
Analyze this image for possible AI manipulation, deepfake signs, editing, impersonation, or harassment risk.

Important:
Do NOT claim certainty. Give a cautious risk assessment only.

Return ONLY a JSON object with this exact structure:
{
  "riskLevel": "Low | Medium | High",
  "confidence": "Low | Medium | High",
  "suspiciousSigns": ["string", "string"],
  "explanation": "string",
  "victimSafetyAdvice": "string",
  "disclaimer": "This is not a forensic result. It is an AI-based risk scan and should be verified with trusted sources or authorities."
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const text = response.text;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    return JSON.parse(text.substring(jsonStart, jsonEnd));
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    throw new Error("Failed to analyze image with Gemini. " + error.message);
  }
};
