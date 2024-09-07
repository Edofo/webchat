import { gql } from '@/__generated__/gql'

export const GET_ME = gql(`
  query GetMe {
    getMe {
      id
      email
      pseudo  
    }
  }
`)

export const LOGIN = gql(`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        email
        pseudo
      }
    }
  }
`)

export const REGISTER = gql(`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      user {
        id
        email
        pseudo
      }
    }
  }
`)

export const LOGOUT = gql(`
  mutation Logout {
    logout
  }
`)
