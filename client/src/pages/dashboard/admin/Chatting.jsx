import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Chatting = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "doctor", text: "Hello 👋 How can I help you today?" },
    { id: 2, sender: "user", text: "Hi Doctor, I have a headache." },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: input },
    ]);

    setInput("");

    // Fake doctor reply (can replace with API/socket)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "doctor",
          text: "Please take rest and drink plenty of water 💊",
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-[20%] bg-gray-900 text-white fixed h-full">
        <div className="mt-20 px-6">
          <h1 className="text-2xl font-bold mb-8">Doctor Panel</h1>

          <nav className="space-y-3">
            <NavLink to="/doctor/dashboard" className="block p-3 rounded-lg hover:bg-gray-700">
              Dashboard
            </NavLink>
            <NavLink to="/doctor/dashboard/appointment" className="block p-3 rounded-lg hover:bg-gray-700">
              Appointments
            </NavLink>
            <NavLink to="/doctor/dashboard/details" className="block p-3 rounded-lg hover:bg-gray-700">
              Details
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="md:ml-[20%] w-full flex flex-col mt-[4%]">
        {/* Header */}
        <header className="sticky top-0 bg-white shadow-md p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <h1 className="text-lg font-semibold">Patient Name</h1>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chatting;
