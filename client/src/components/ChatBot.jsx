import React, { useState, useEffect, useRef } from "react";
import authAxios from "../utils/authAxios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Fetch old messages
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await authAxios.get("/chatbot/chatbotMessages");
//         const data = await res.data;
//         setMessages(data.messages || []);
//       } catch (err) {
//         console.log("Error:", err);
//       }
//     };

//     fetchMessages();
//   }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = {
    sender: "user",
    text: input,
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const res = await authAxios.post("/chatbot/chatbotMessages", {
      text: input,
    });

    const data = res.data.data;

    const botMessage = {
      sender: "bot",
      text: data.reply || "Sorry, no response",
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error(error);

    // Optional: error message
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Server error, try again" },
    ]);
  }

  setLoading(false);
};

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 text-center font-semibold">
        Chat Support 🤖
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="text-gray-400 text-xs">Typing...</div>}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-2 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
