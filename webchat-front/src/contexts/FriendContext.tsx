import { useMutation, useQuery } from '@apollo/client'
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react'

import type { FriendResponse } from '@/__generated__/graphql'
import { ADD_FRIEND, GET_MYFRIENDS, ON_FRIEND_ADDED } from '@/http/requests/friend'

interface FriendContextType {
  friends: FriendResponse[]
  addFriend: (pseudo: string) => Promise<void>
  loadingFriends: boolean
}

const FriendContext = createContext<FriendContextType | undefined>(undefined)

export const FriendProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { subscribeToMore, data, loading, refetch } = useQuery(GET_MYFRIENDS)

  const [addFriendMutation] = useMutation(ADD_FRIEND)

  const addFriend = useCallback(
    async (pseudo: string) => {
      await addFriendMutation({ variables: { pseudo }, onCompleted: () => refetch() })
    },
    [addFriendMutation, refetch]
  )

  const friends = useMemo(() => data?.getMyFriends || [], [data])

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: ON_FRIEND_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newFriend = subscriptionData.data.userFriend
        return {
          getMyFriends: [...prev.getMyFriends, newFriend]
        }
      }
    })
    return () => unsubscribe()
  }, [subscribeToMore])

  const value: FriendContextType = useMemo(
    () => ({
      friends,
      addFriend,
      loadingFriends: loading
    }),
    [friends, addFriend, loading]
  )

  return <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
}

export const useFriend = (): FriendContextType => {
  const context = useContext(FriendContext)
  if (!context) throw new Error('useFriend must be used within a FriendProvider')
  return context
}
