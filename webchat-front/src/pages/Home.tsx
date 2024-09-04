import { useState } from 'react'

import { ChatWindow } from '@/components/design/home/ChatWindow'
import { MessageInput } from '@/components/design/home/MessageInput'
import { Sidebar } from '@/components/design/home/Sidebar'
import { Chat, Message } from '@/types/chat'

const HomePage = () => {
  const [chats] = useState<Chat[]>([
    { id: '1', name: 'Funny Friends' },
    { id: '2', name: 'Meme Team' },
    { id: '3', name: 'Joke Central' }
  ])

  const [messages] = useState<Message[]>([
    { id: '1', content: 'Hello!', sender: 'them', timestamp: new Date().toISOString() },
    { id: '2', content: 'Hi!', sender: 'me', timestamp: new Date().toISOString() },
    { id: '3', content: 'How are you?', sender: 'them', timestamp: new Date().toISOString() },
    { id: '4', content: 'Good, you?', sender: 'me', timestamp: new Date().toISOString() },
    { id: '5', content: 'I am great thanks!', sender: 'them', timestamp: new Date().toISOString() },
    {
      id: '6',
      content: 'That is good to hear!',
      sender: 'me',
      timestamp: new Date().toISOString()
    },
    {
      id: '7',
      content: 'What are you up to?',
      sender: 'them',
      timestamp: new Date().toISOString()
    },
    { id: '8', content: 'Just chilling', sender: 'me', timestamp: new Date().toISOString() },
    { id: '9', content: 'Nice', sender: 'them', timestamp: new Date().toISOString() },
    { id: '10', content: 'Yeah', sender: 'me', timestamp: new Date().toISOString() }
  ])

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-400 via-pink-500 to-red-500">
      <Sidebar chats={chats} onSelectChat={chat => console.log(chat)} />
      <main className="flex flex-col h-full relative w-full">
        <ChatWindow currentChat={chats[0]} messages={messages} />
        <div className="absolute bottom-0 left-0 right-0">
          <MessageInput isActive onSendMessage={() => {}} />
        </div>
      </main>
    </div>
  )
}

const AuthHomePage = () => {
  return (
    <div>
      <HomePage />
    </div>
  )
}

export default AuthHomePage
