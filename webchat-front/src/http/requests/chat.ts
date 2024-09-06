import { gql } from '@/__generated__/gql'

export const GET_ROOMMESSAGES = gql(`
  query GetRoomMessages($friendId: String!) {
    getRoomMessages(friendId: $friendId) {
      id
      content
      createdAt
      user {
        id
        pseudo
      }
    }
  }
`)

export const SEND_MESSAGE = gql(`
  mutation SendMessage($friendId: String!, $message: String!) {
    sendMessage(friendId: $friendId, message: $message) {
      id
      content
      createdAt
      user {
        id
        pseudo
      }
    }
  }
`)

export const ON_MESSAGE_ADDED = gql(`
  subscription userJoinedRoom($friendId: String!) {
    userJoinedRoom(friendId: $friendId) {
      id
      content
      createdAt
      user {
        id
        pseudo
      }
    }
  }
`)
