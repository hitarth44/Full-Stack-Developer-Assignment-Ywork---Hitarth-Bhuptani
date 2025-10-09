'use client'

import { useState, useCallback } from 'react'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { ChatMessages } from '@/components/chat/chat-messages'
import { MessageInput } from '@/components/chat/message-input'
import { Navbar } from '@/components/chat/navbar'
import { mockConversations, mockMessages, botReplies } from '@/lib/mock-data'

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState('1')
  const [messages, setMessages] = useState(mockMessages)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const selectedConversation = mockConversations.find((c) => c.id === selectedConversationId)
  const currentMessages = selectedConversationId ? messages[selectedConversationId] || [] : []

  const handleSendMessage = useCallback((content) => {
    if (!selectedConversationId) return

    const newMessage = {
      id: Date.now().toString(),
      conversation_id: selectedConversationId,
      sender_id: 'current',
      content,
      created_at: new Date(),
      is_own: true,
      status: 'sending',
    }

    setMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
    }))

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedConversationId]: prev[selectedConversationId].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        ),
      }))

      setIsTyping(true)

      setTimeout(() => {
        const botReply = {
          id: (Date.now() + 1).toString(),
          conversation_id: selectedConversationId,
          sender_id: selectedConversation?.participant.id || '1',
          content: botReplies[Math.floor(Math.random() * botReplies.length)],
          created_at: new Date(),
          is_own: false,
          status: 'received',
        }

        setMessages((prev) => ({
          ...prev,
          [selectedConversationId]: [...prev[selectedConversationId], botReply],
        }))
        setIsTyping(false)
      }, 2000 + Math.random() * 1500)
    }, 500)
  }, [selectedConversationId, selectedConversation])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 pt-16 overflow-hidden">
        <ChatSidebar
          conversations={mockConversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            <ChatMessages
              messages={currentMessages}
              participant={selectedConversation.participant}
              isTyping={isTyping}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}


