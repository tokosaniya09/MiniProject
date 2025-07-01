'use client'
import ChatInterface from '../../components/ChatInterface'
import { Bot } from 'lucide-react'

export default function ChatbotPage() {
  return (
    <ChatInterface
      title="Hope Bot"
      apiEndpoint="http://localhost:5000/api/chatbot"
      icon={<Bot size={36} />}
      receiverRole="bot"
    />
  )
}
