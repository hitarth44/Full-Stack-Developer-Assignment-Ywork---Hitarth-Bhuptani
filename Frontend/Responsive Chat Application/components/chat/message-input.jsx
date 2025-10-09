'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-gray-200 bg-white px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-end gap-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[56px] max-h-32 resize-none rounded-2xl border-gray-300 px-5 py-4 text-[15px] focus-visible:ring-blue-500"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          size="icon"
          className="h-14 w-14 rounded-2xl bg-blue-600 hover:bg-blue-700 flex-shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}


