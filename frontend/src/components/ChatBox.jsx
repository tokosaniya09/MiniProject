
'use client';

import { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';
import BookCallForm from './BookCallForm';
import { UserContext } from '../context/UserContext';
import io from 'socket.io-client';

let socket;

export default function ChatBox({ person, onClose }) {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [remainingMessages, setRemainingMessages] = useState(5);
  const [isBookCallFormVisible, setIsBookCallFormVisible] = useState(false);

  useEffect(() => {
    if (!user || !person) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/messages?senderId=${user.id}&receiverId=${person._id}`);
        const data = await res.json();

        if (data.success) {
          setMessages(
            data.messages.map((m) => ({
              sender: m.senderId === user.id ? 'You' : person.name,
              text: m.text,
            }))
          );
        }
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };

    setMessages([]);
    fetchMessages();
  }, [user, person]);

  useEffect(() => {
    socket = io({
      path: 'http://localhost:5000/api/socket',
    });

    socket.on('receiveMessage', (newMsg) => {
      if (newMsg.senderId === person._id && newMsg.receiverId === user.id) {
        setMessages((prev) => [...prev, { sender: person.name, text: newMsg.text }]);

        // Show browser notification
        if (Notification.permission === 'granted') {
          new Notification(`New message from ${person.name}`, {
            body: newMsg.text,
          });
        }
      }
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [person, user]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

    useEffect(() => {
    const fetchQuota = async () => {
        try {
        const res = await fetch(`http://localhost:5000/api/messageQuota?senderId=${user.id}&receiverId=${person._id}`);
        const data = await res.json();
        if (data.success) setRemainingMessages(data.remainingMessages);
        } catch (err) {
            console.error('Failed to fetch message quota:', err);
        }
    };

    if (user && person) fetchQuota();
    }, [user, person]);


  const handleMessageSend = async () => {
    if (!userMessage.trim() || remainingMessages <= 0) return;

    const newMsg = {
      sender: user.name,
      text: userMessage,
      senderId: user.id,
      receiverId: person._id,
      createdAt: new Date().toISOString(),
    };

    // Optimistically update UI
    setMessages((prev) => [...prev, { sender: 'You', text: userMessage }]);
    setRemainingMessages((prev) => prev - 1);
    setUserMessage('');

    // Emit real-time update
    if (socket) {
      socket.emit('sendMessage', newMsg);
    }

    try {
      // Save message to DB
      await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });

      // Update chat participants (if first time chatting)
      await fetch('http://localhost:5000/api/myChats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: person._id,
        }),
      });

      await fetch('http://localhost:5000/api/messageQuota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            senderId: user.id,
            receiverId: person._id
        })
      })
    } catch (err) {
      console.error('❌ Failed to send message or update chats or update quota:', err);
    }
  };

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (user?.id) {
      socket.emit('join', user.id);
    }
  }, [user]);


  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleProceedToBookCall = () => {
    setIsBookCallFormVisible(true);
  };

  const handleCloseBookCallForm = () => {
    setIsBookCallFormVisible(false);
  };

  return (
    <div className="w-[70%] h-full bg-white rounded-xl shadow-lg p-4 pt-10 relative overflow-hidden mt-20">
      {!isBookCallFormVisible && (
        <>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            <X />
          </button>

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4 mt-5">
            <div className="flex items-center gap-3">
              <img
                src={person?.image || '/images/default.jpg'}
                alt={person?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{person?.name}</h2>
              </div>
            </div>
            <button
              onClick={handleProceedToBookCall}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
              Proceed to Book Call
            </button>
          </div>

          {/* Info Line */}
          <p className="text-sm text-gray-600 text-center">
            {remainingMessages > 0
              ? `${remainingMessages} messages left.`
              : 'No more messages can be sent. Subscribe to send more.'}
          </p>
          <p className="text-xs text-gray-400 text-center mb-4">
            Only 5 messages are available for free. Additional messages will require a subscription.
          </p>

          {/* Chat Section */}
          <div className="h-[60%] overflow-y-auto border p-3 rounded-lg mb-3 chat-messages">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center">No messages yet</p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 flex ${msg.sender === 'You' ? 'justify-end' : ''}`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg ${
                      msg.sender === 'You'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <span className="font-semibold">{msg.sender}:</span>
                    <span> {msg.text}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 sticky bottom-0 bg-white">
            <input
              type="text"
              className="flex-1 border rounded-lg px-3 py-2"
              placeholder={
                remainingMessages > 0
                  ? 'Type your message...'
                  : 'No more messages can be sent.'
              }
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && userMessage.trim()) {
                  handleMessageSend();
                }
              }}
              disabled={remainingMessages === 0}
            />
            <button
              onClick={handleMessageSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
              disabled={remainingMessages === 0}
            >
              Send
            </button>
          </div>
        </>
      )}

      {isBookCallFormVisible && (
        <BookCallForm
          selectedVolunteer={person}
          setSelectedVolunteer={person}
          handleBackToChat={handleCloseBookCallForm}
        />
      )}
    </div>
  );
}