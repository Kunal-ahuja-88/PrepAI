

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  require('dotenv').config();
  
  const apiKey = "AIzaSyBxcezP_pdWgJiSRd6woQhULbZbqnoTaV0"
  if (!apiKey) {
    throw new Error('API key is missing. Please set NEXT_GEMINI_API_KEY in your environment variables.');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
  
     
    });

  