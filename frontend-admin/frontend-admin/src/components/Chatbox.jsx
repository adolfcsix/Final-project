import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { X, MessageSquare, Send } from "lucide-react";

const Chatbox = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const nodeRef = useRef(null); // ⚡️ Cách sửa lỗi

  const toggleChatbox = () => setOpen(!open);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" handle=".chat-header">
      <div ref={nodeRef} className="fixed bottom-4 right-4 max-w-[320px]">
        {/* Nút mở chatbox */}
        {!open && (
          <motion.button 
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
            whileTap={{ scale: 0.9 }}
            onClick={toggleChatbox}
          >
            <MessageSquare size={24} />
          </motion.button>
        )}

        {/* Chatbox */}
        {open && (
          <motion.div 
            className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* Header (dùng làm handle kéo) */}
            <div className="chat-header p-3 bg-blue-600 text-white flex justify-between items-center rounded-t-lg cursor-move">
              <span>Chat Support</span>
              <button onClick={toggleChatbox}><X size={20} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 flex border-t">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Draggable>
  );
};

export default Chatbox;
