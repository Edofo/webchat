import { useState } from 'react'

import { AuthGuard } from '@/components/AuthGuard'
import { ChatWindow } from '@/components/design/home/ChatWindow'
import { MessageInput } from '@/components/design/home/MessageInput'
import { Sidebar } from '@/components/design/home/Sidebar'
import { ChatRoom } from '@/types/chat'

const HomePage = () => {
  const [chats] = useState<ChatRoom[]>([
    { id: '1', name: 'Funny Friends' },
    { id: '2', name: 'Meme Team' },
    { id: '3', name: 'Joke Central' }
  ])

  return (
    <>
      <Sidebar chats={chats} />
      <main className="flex flex-col h-full relative w-full">
        <ChatWindow />
        <div className="absolute bottom-0 left-0 right-0">
          <MessageInput />
        </div>
      </main>
    </>
  )
}

const AuthHomePage = () => {
  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-400 via-pink-500 to-red-500">
      <AuthGuard render={() => <HomePage />} />
    </div>
  )
}

export default AuthHomePage
