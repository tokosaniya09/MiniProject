'use client';
import { useState } from 'react';
import { Bot } from 'lucide-react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm here to listen. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    const botMessage = { sender: 'bot', text: "I'm here for you 💙" };
    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-5 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition-all duration-300 z-50"
      >
        <Bot />
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-80 max-h-[500px] bg-white border border-blue-200 rounded-xl shadow-xl flex flex-col z-50">
          <div className="p-3 font-semibold text-blue-700 bg-blue-50 border-b border-blue-100 rounded-t-xl">
            Chat with us 💬
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-blue-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-lg max-w-[75%] ${
                  msg.sender === 'user'
                    ? 'bg-blue-400 text-white self-end ml-auto'
                    : 'bg-white text-gray-800 self-start'
                } shadow-sm`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t border-blue-200 p-2 bg-white rounded-b-xl">
            <input
              className="flex-1 text-sm p-2 border border-blue-200 rounded-l-md outline-none focus:ring-1 focus:ring-blue-300"
              type="text"
              placeholder="Type something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
