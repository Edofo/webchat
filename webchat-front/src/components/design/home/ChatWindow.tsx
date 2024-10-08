import { useEffect } from 'react'

import { useAuth } from '@/contexts/AuthContext'
import { useChat } from '@/contexts/ChatContext'

export const ChatWindow = () => {
  const { user } = useAuth()
  const { room, roomMessages } = useChat()

  useEffect(() => {
    if (!roomMessages || !room) return
    const chatWindow = document.querySelector('.flex-1')
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight
    }
  }, [room, roomMessages])

  if (!room) return null

  return (
    <div className="flex flex-col h-full">
      <header className="mx-4 mt-4 bg-white bg-opacity-20 backdrop-blur-lg p-4 shadow-lg sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-white">Chat with: {room.name}</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {roomMessages.map(message => (
          <div
            key={message.id}
            className={`max-w-xs mx-2 p-3 rounded-lg ${
              message.user.id === user?.id
                ? 'ml-auto bg-blue-500 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            <p>{message.content}</p>
            <span className="text-xs opacity-75">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
