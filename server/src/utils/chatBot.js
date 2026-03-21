import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

async function main() {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: "Explain AI simply" }],
          },
        ],
      }
    );

    console.log(
      res.data.candidates[0].content.parts[0].text
    );
  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
  }
}

main();