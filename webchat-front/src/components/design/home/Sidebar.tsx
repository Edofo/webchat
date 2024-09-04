import { Menu, MessageSquare, X } from 'lucide-react'
import { useState } from 'react'

import { Chat } from '@/types/chat'

interface SidebarProps {
  chats: Chat[]
  onSelectChat: (chat: Chat) => void
}

export const Sidebar = ({ chats, onSelectChat }: Readonly<SidebarProps>) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-2 right-2 z-30 p-2 bg-blue-600 bg-opacity-80 backdrop-blur-lg rounded-full text-white"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 w-72 bg-white bg-opacity-10 backdrop-blur-lg p-4
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Chats</h2>
        <ul className="space-y-2">
          {chats.map(chat => (
            <li key={chat.id}>
              <button
                onClick={() => {
                  onSelectChat(chat)
                  setIsOpen(false)
                }}
                className="w-full text-left p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white flex items-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{chat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  )
}
