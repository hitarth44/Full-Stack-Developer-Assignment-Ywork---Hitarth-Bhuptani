'use client'

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl rounded-tl-md px-5 py-3 border border-gray-200 shadow-sm w-fit">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
      </div>
    </div>
  )
}


