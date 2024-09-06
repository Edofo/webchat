import { gql } from '@/__generated__/gql'

export const GET_ROOMMESSAGES = gql(`
  query getRoomMessages($roomId: String!) {
    getRoomMessages(roomId: $roomId) {
      id
      text
      createdAt
      user {
        id
        pseudo
      }
    }
  }
`)

export const SEND_MESSAGE = gql(`
  mutation SendMessage($roomId: String!, $message: String!) {
    sendMessage(roomId: $roomId, message: $message) {
      id
      text
      createdAt
      user {
        id
        pseudo
      }
    }
  }
`)

export const ON_MESSAGE_ADDED = gql(`
  subscription userJoinedRoom($roomId: String!) {
    userJoinedRoom(roomId: $roomId) {
      id
      text
      createdAt
      user {
        id
        pseudo
      }
    }
  }
`)
