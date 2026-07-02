import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeIncident(incidentText) {
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in environment variables.");
  }
  
  if (!apiKey.startsWith("AIza") && !apiKey.startsWith("AQ")) {
    throw new Error("Invalid API key format. Gemini API keys typically start with 'AIza' or 'AQ'. Please check your .env file.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
You are ProofShield AI, an expert crisis-response agent specializing in cyber harassment and AI-generated image abuse. 
Analyze the following user's situation. 
You must return ONLY a valid JSON object with the exact structure below, and no markdown formatting, code blocks, or extra text.

JSON Structure:
{
  "harm_type": "string (e.g., Deepfake, Sextortion, Cyberstalking)",
  "risk_level": "string (Low, Medium, High, Critical)",
  "red_flags": ["string array of 2-4 identified threats"],
  "agent_trace": ["string array of 3-4 steps you took to analyze this"],
  "immediate_steps": ["string array of 3 urgent actions"],
  "evidence_checklist": ["string array of items to screenshot/save"],
  "report_summary": "string (A formal 2-sentence summary for authorities)"
}

User's Situation:
"${incidentText}"
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // Low temp for more deterministic, structured output
      }
    });
    
    // Parse the JSON safely
    const parsedData = JSON.parse(response.text);
    return parsedData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Extract and throw the actual API error message if available
    const errorMessage = error instanceof Error ? error.message : "Unknown API error";
    throw new Error(`Failed to analyze incident with AI: ${errorMessage}`);
  }
}
