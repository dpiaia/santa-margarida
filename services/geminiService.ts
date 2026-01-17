import { GoogleGenAI } from "@google/genai";
import { RULES, SCHEDULES, CONDO_NAME } from '../constants';

// Construct a context string from our static data to feed the AI
const getSystemContext = () => {
  const scheduleText = SCHEDULES.map(s => 
    `- ${s.area}: Aberto das ${s.openTime} às ${s.closeTime} (${s.days}). ${s.maintenance ? `Manutenção: ${s.maintenance}` : ''}`
  ).join('\n');

  const rulesText = RULES.map(cat => 
    `Categoria: ${cat.title}\n` +
    `  Permitido:\n` + cat.allowed.map(r => `    - ${r.text}`).join('\n') + '\n' +
    `  Proibido:\n` + cat.prohibited.map(r => `    - ${r.text}`).join('\n')
  ).join('\n\n');

  return `
    Você é o assistente virtual amigável e prestativo do condomínio ${CONDO_NAME}.
    
    Use APENAS as informações abaixo para responder aos moradores. Se a informação não estiver aqui, diga educadamente que eles devem consultar a administração.
    
    Seja breve, cordial e direto.
    
    HORÁRIOS DE FUNCIONAMENTO:
    ${scheduleText}
    
    REGRAS E NORMAS:
    ${rulesText}
    
    Responda sempre em Português do Brasil.
  `;
};

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using flash model for speed and cost-effectiveness for simple Q&A
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: getSystemContext(),
        temperature: 0.3, // Low temperature for more factual answers based on context
      }
    });

    const text = response.text;
    return text || "Desculpe, não consegui processar sua solicitação no momento.";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, estou tendo dificuldades técnicas. Tente novamente mais tarde.";
  }
};