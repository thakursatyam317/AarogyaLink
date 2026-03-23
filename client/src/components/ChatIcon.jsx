import React, { useState, useEffect, useRef } from "react";
import ChatBot from "./ChatBot";
import { MessageCircle, X } from "lucide-react";

const ChatIcons = () => {
  const [open, setOpen] = useState(false);
  const chatRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Chat Box */}
      <div
        ref={chatRef}
        className={`fixed bottom-20 right-5 w-[320px] sm:w-[350px] h-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 transform transition-all duration-300 ${
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <ChatBot />
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl z-50 transition-all duration-300 flex items-center justify-center"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
};

export default ChatIcons;