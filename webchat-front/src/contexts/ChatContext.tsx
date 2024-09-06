import { useMutation, useQuery } from '@apollo/client'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import type { ChatMessage } from '@/__generated__/graphql'
import { GET_ROOMMESSAGES, ON_MESSAGE_ADDED, SEND_MESSAGE } from '@/http/requests/chat'
import { ChatRoom } from '@/types/chat'

interface ChatContextType {
  room: ChatRoom | undefined
  roomMessages: ChatMessage[]
  sendNewMessage: (message: string) => Promise<void>
  setRoom: (room: ChatRoom) => void
  loadingMessage: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFriend, setSelectedFriend] = useState<ChatRoom | undefined>(undefined)

  const { subscribeToMore, data, loading, refetch } = useQuery(GET_ROOMMESSAGES, {
    variables: selectedFriend ? { friendId: selectedFriend.id } : undefined,
    skip: !selectedFriend
  })

  const [sendMessage, { loading: sendingMessage }] = useMutation(SEND_MESSAGE)

  const sendNewMessage = useCallback(
    async (message: string) => {
      if (!selectedFriend) return
      await sendMessage({ variables: { friendId: selectedFriend.id, message } })
    },
    [selectedFriend, sendMessage]
  )

  const setRoom = useCallback(
    (room: ChatRoom) => {
      setSelectedFriend(room)
      refetch({ friendId: room.id })
    },
    [refetch]
  )

  const roomMessages = useMemo(() => data?.getRoomMessages || [], [data])

  useEffect(() => {
    if (!selectedFriend) return
    const unsubscribe = subscribeToMore({
      document: ON_MESSAGE_ADDED,
      variables: { friendId: selectedFriend.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newMessage = subscriptionData.data.userJoinedRoom
        return {
          getRoomMessages: [...prev.getRoomMessages, newMessage]
        }
      }
    })
    return () => unsubscribe()
  }, [selectedFriend, subscribeToMore])

  const value: ChatContextType = useMemo(
    () => ({
      room: selectedFriend,
      roomMessages,
      setRoom,
      sendNewMessage,
      loadingMessage: loading || sendingMessage
    }),
    [selectedFriend, roomMessages, setRoom, sendNewMessage, loading, sendingMessage]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within a ChatProvider')
  return context
}
