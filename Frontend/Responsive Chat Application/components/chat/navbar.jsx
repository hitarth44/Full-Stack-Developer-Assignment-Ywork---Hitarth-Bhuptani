'use client'

import { Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar({ onToggleSidebar, isSidebarOpen }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            L
          </div>
          <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">Chat App</h1>
        </div>
      </div>

      <Button size="icon" variant="ghost" className="rounded-full">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}


