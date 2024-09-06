import { gql } from '@/__generated__/gql'

export const GET_MYFRIENDS = gql(`
  query GetMyFriends {
    getMyFriends {
      id
      pseudo
      isOnline
    }
  }
`)

export const ADD_FRIEND = gql(`
  mutation AddFriend($pseudo: String!) {
    addFriend(pseudo: $pseudo) {
      id
      pseudo
      isOnline
    }
  }
`)

export const ON_FRIEND_ADDED = gql(`
  subscription userFriend {
    userFriend {
      id
      pseudo
      isOnline
    }
  }
`)
