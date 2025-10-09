'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Check, CheckCheck } from 'lucide-react'
import { TypingIndicator } from './typing-indicator'
import { useEffect, useRef } from 'react'

export function ChatMessages({ messages, participant, isTyping = false }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages, isTyping])

  const formatMessageTime = (date) => {
    return format(date, 'h:mm a')
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback
              className="text-white font-semibold"
              style={{ backgroundColor: participant.avatar_color }}
            >
              {participant.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-900 text-lg">{participant.username}</h2>
            <p className="text-sm text-green-600 capitalize">{participant.status}</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-6" ref={scrollRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message, index) => {
            const showTimestamp =
              index === 0 ||
              messages[index - 1]?.sender_id !== message.sender_id ||
              new Date(message.created_at).getTime() - new Date(messages[index - 1]?.created_at).getTime() > 300000

            return (
              <div key={message.id} className={cn('flex flex-col', message.is_own && 'items-end')}>
                {showTimestamp && (
                  <div className="text-xs text-gray-500 mb-1 px-1">
                    {formatMessageTime(message.created_at)}
                  </div>
                )}
                <div
                  className={cn(
                    'rounded-2xl px-5 py-3 max-w-2xl shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300',
                    message.is_own
                      ? 'bg-blue-600 text-white rounded-tr-md'
                      : 'bg-white text-gray-900 rounded-tl-md border border-gray-200'
                  )}
                >
                  <p className="text-[15px] leading-relaxed">{message.content}</p>
                  {message.is_own && (
                    <div className="flex items-center justify-end mt-1 gap-1">
                      {message.status === 'sent' && <CheckCheck className="h-3 w-3" />}
                      {message.status === 'sending' && <Check className="h-3 w-3" />}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          {isTyping && (
            <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
              <TypingIndicator />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}


