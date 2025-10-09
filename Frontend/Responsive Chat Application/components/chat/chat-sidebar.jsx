'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChatSidebar({ conversations, selectedConversationId, onSelectConversation, isOpen, onClose }) {
  const handleSelectConversation = (id) => {
    onSelectConversation(id)
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "fixed lg:relative top-0 left-0 h-full w-80 border-r border-gray-200 bg-gray-50 flex flex-col z-50 transition-transform duration-300 ease-in-out",
        !isOpen && "-translate-x-full lg:translate-x-0"
      )}>
      <div className="p-6 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">logo</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Chats</h2>
      </div>

      <ScrollArea className="flex-1 bg-gray-50">
        <div className="px-3 py-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation.id)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white mb-1",
                selectedConversationId === conversation.id && "bg-white shadow-sm"
              )}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="w-12 h-12">
                  <AvatarFallback
                    className="text-white font-semibold text-sm"
                    style={{ backgroundColor: conversation.participant.avatar_color }}
                  >
                    {conversation.participant.initials}
                  </AvatarFallback>
                </Avatar>
                {conversation.participant.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {conversation.participant.username}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {conversation.last_message_time}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.last_message}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
    </>
  )
}


