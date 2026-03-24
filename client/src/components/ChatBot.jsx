import React, { useState, useEffect, useRef } from "react";
import authAxios from "../utils/authAxios";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error, try again" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
      
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 text-center font-semibold text-sm">
        🤖 Chat Support
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm border"
              }`}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-1">{children}</p>,
                    li: ({ children }) => (
                      <li className="ml-4 list-disc">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold">
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {/* Typing Loader */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl text-sm border shadow text-gray-500 animate-pulse">
              Typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-2 border-t flex gap-2 bg-white">
        <input
          className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;