// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { SendHorizonal } from 'lucide-react'

// export default function ChatInterface({ title, apiEndpoint, icon, receiverRole }) {
//   const [messages, setMessages] = useState([
//     { sender: receiverRole, text: `Hi! I'm ${title}. How can I help you?` },
//   ])
//   const [input, setInput] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const chatEndRef = useRef(null)

//   const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })

//   const sendMessage = async () => {
//     if (!input.trim()) return

//     const userMsg = { sender: 'user', text: input }
//     setMessages(prev => [...prev, userMsg])
//     setInput('')
//     setIsTyping(true)
//     scrollToBottom()

//     try {
//       const res = await fetch(apiEndpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input, history: [...messages, userMsg] }),
//       })

//       const data = await res.json()
//       const replyText = data.reply || 'Sorry, I have no response.'
//       const replySender = receiverRole

//       const estimatedTime = Math.min(Math.max(replyText.length, 300), 1800)

//       setTimeout(() => {
//         setMessages(prev => [...prev, { sender: replySender, text: replyText }])
//         setIsTyping(false)
//         scrollToBottom()
//       }, estimatedTime)
//     } catch {
//       setMessages(prev => [...prev, { sender: receiverRole, text: 'Oops! Something went wrong 🥺' }])
//       setIsTyping(false)
//     }
//   }

//   useEffect(scrollToBottom, [messages])
//   return (
//     <div>
//     <div className='w-full bg-white h-20 top-30 p-20 fixed z-10 border-b border-blue shadow-md'></div>
//     <div className="flex flex-col h-screen bg-[#e6f7fb] text-black px-4 md:px-20 mt-20 pt-20 bg-green-100">
//       {/* Sticky Header */}
//       <div className="bg-[#d4eff4] px-4 py-3 flex items-center justify-between shadow-md rounded-xl fixed z-10 bg-white w-60">
//         <div className="text-xl font-semibold">{title}</div>
//         <div className="text-blue-500">{icon}</div>
//       </div>


//       {/* Scrollable Chat Area */}
//       <div className="flex-1 overflow-y-auto px-2 pt-10 space-y-2 mt-20 px-20 mx-20 bg-green-200 border border-green-300  shadow-lg chat-messages">
//         {messages.map((msg, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`px-4 py-2 rounded-2xl shadow relative break-words max-w-[80%] ${
//                 msg.sender === 'user' ? 'bg-[#b3eaf2]' : 'bg-white'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </motion.div>
//         ))}

//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="bg-white rounded-2xl px-4 py-2 flex space-x-1 shadow">
//               {[0, 1, 2].map(i => (
//                 <div
//                   key={i}
//                   className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                   style={{ animationDelay: `${i * 0.2}s` }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <div ref={chatEndRef} />
//       </div>
//       </div>

//       {/* Input Area */}
//       <div className="bg-white border-[#bce6ee] px-4 flex justify-center absolute bottom-0 w-full">
//         <div className="flex justify-center items-center text-center w-full max-w-2xl border border-gray-800 rounded-full px-3 bg-white shadow-sm py-2 ">
//           <textarea
//             className="w-full overflow-hidden focus:outline-none bg-transparent pt-3 px-3"
//             placeholder="Type your message..."
//             value={input}
//             style={{ maxHeight: '50px' }}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//           />
//           <button
//             className="bg-[#5ac8e4] bg-blue-500 hover:bg-[#48bbd7] text-white p-3 rounded-full"
//             onClick={sendMessage}
//           >
//             <SendHorizonal size={28} strokeWidth={2.5} />
//           </button>
//         </div>
//       </div>
    

//     </div>
//   );
// }



'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SendHorizonal } from 'lucide-react'

export default function ChatInterface({ title, apiEndpoint, icon, receiverRole }) {
  const [messages, setMessages] = useState([
    { sender: receiverRole, text: `Hi! I'm ${title}. How can I help you?` },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    scrollToBottom()

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: [...messages, userMsg] }),
      })

      const data = await res.json()
      const replyText = data.reply || 'Sorry, I have no response.'

      setTimeout(() => {
        setMessages(prev => [...prev, { sender: receiverRole, text: replyText }])
        setIsTyping(false)
        scrollToBottom()
      }, Math.min(Math.max(replyText.length * 10, 300), 1800))
    } catch {
      setMessages(prev => [...prev, { sender: receiverRole, text: 'Oops! Something went wrong 🥺' }])
      setIsTyping(false)
    }
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex flex-col h-screen bg-[#f9fbfc] text-black px-20 mx-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex items-center justify-between mt-20 pt-20 px-20 mx-20">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-blue-500">{icon}</div>
      </div>

      {/* Chat Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 px-20 mx-20">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl shadow max-w-[75%] break-words ${
                msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2 flex space-x-1 shadow">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Sticky Footer Input Area */}
      <div className="sticky bottom-0 z-20 bg-white px-4 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2 max-w-4xl mx-auto border border-gray-300 rounded-full px-4 py-2 shadow-sm bg-white">
          <textarea
            className="w-full resize-none overflow-hidden focus:outline-none bg-transparent py-2"
            placeholder="Type your message..."
            value={input}
            style={{ maxHeight: '150px' }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full"
            onClick={sendMessage}
          >
            <SendHorizonal size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
