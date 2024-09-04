import { Chat, Message } from '@/types/chat'

interface ChatWindowProps {
  currentChat: Chat
  messages: Message[]
}

export const ChatWindow = ({ currentChat, messages }: Readonly<ChatWindowProps>) => {
  return (
    <div className="flex flex-col h-full">
      <header className="mx-4 mt-4 bg-white bg-opacity-20 backdrop-blur-lg p-4 shadow-lg sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-white">{currentChat.name}</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map(message => (
          <div
            key={message.id}
            className={`max-w-xs mx-2 p-3 rounded-lg ${
              message.sender === 'me' ? 'ml-auto bg-blue-500 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <p>{message.content}</p>
            <span className="text-xs opacity-75">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
