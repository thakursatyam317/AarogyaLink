import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import ApiResponse from "../utils/ApiResponse.js";

dotenv.config({ path: "../../.env" });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatBot = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: [
        {
          parts: [
            {
              text: `
                    You are a medical assistant chatbot for a hospital website.

                  Rules:
                  1. Answer ONLY if the question is related to healthcare, medicine, hospital, doctors, symptoms, or treatment.
                  2. If the question is NOT related to medical or hospital topics, reply with:
                    "I can only help with medical or healthcare-related queries."

                  3. Keep answers simple, short, and easy to understand.
                  4. Do not provide harmful or unsafe medical advice.

                  User Question: ${text}
          `,
            },
          ],
        },
      ],
    });

    console.log("Response chatbot:-" + response.text);
    res.json(
      new ApiResponse(true, "Chatbot response", { reply: response.text }),
    );
  } catch (err) {
    console.error("ERROR:", err.message);
  }
};
