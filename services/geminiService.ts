import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AgentType, MinimalChatMessage, ChatMessage } from '../types'; // Added MinimalChatMessage, kept ChatMessage for other potential uses if any in this file
import { getAgentSystemInstruction } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will not work. Please set process.env.API_KEY.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "fallback_key_for_type_checking_only" });
const model = 'gemini-2.5-flash-preview-04-17';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const generateAgentResponse = async (
  agentType: AgentType,
  userMessage: string,
  history: MinimalChatMessage[] // Updated type for history
): Promise<string> => {
  if (!API_KEY) {
    return "Gemini API key not configured. Please contact support.";
  }

  const systemInstruction = getAgentSystemInstruction(agentType);

  const contents: GeminiMessage[] = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));
  
  // Add current user message to contents
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: contents, // Pass the full history
      config: { 
        systemInstruction: systemInstruction,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error('Error generating content from Gemini:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        return "The Gemini API key is invalid. Please check your configuration.";
    }
    return 'Sorry, I encountered an error trying to respond. Please try again later.';
  }
};