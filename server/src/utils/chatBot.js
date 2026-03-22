import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatBot = async ()=> {
  try {
    const {text} = req.body;
    console.log(text);

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: [
        {
          parts: [
            { text: "Explain how AI works in simple words" }
          ],
        },
      ],
    });

    console.log(response.text);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

chatBot();