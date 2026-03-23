import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import ApiResponse from "../utils/ApiResponse.js";

dotenv.config({ path: "../../.env" });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatBot = async (req, res) => {
  try {
    const {text} = req.body;
    console.log(text);

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: [
        {
          parts: [
            { text: text}
          ],
        },
      ],
    });

    console.log("Response chatbot:-" + response.text);
    res.json(
      new ApiResponse(true, "Chatbot response", { reply: response.text })
    )
    
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

