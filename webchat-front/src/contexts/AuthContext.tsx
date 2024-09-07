import { FetchResult, useMutation, useQuery } from '@apollo/client'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'

import type {
  AuthUser,
  LoginInput,
  LoginMutation,
  RegisterInput,
  RegisterMutation
} from '@/__generated__/graphql'
import { JWT_COOKIE_NAME } from '@/constants/cookies'
import { GET_ME, LOGIN, LOGOUT, REGISTER } from '@/http/requests/auth'

import { useToast } from './ToastContext'

interface AuthContextType {
  user: AuthUser | undefined
  login: (data: LoginInput) => Promise<FetchResult<LoginMutation>>
  logout: () => void
  register: (data: RegisterInput) => Promise<FetchResult<RegisterMutation>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [_, setCookie, removeCookie] = useCookies([JWT_COOKIE_NAME])
  const { addToast } = useToast()

  const [user, setUser] = useState<AuthUser | undefined>(undefined)

  const { data } = useQuery(GET_ME)

  useEffect(() => {
    if (data) setUser(data.getMe)
  }, [data])

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      setUser(login.user)
      setCookie(JWT_COOKIE_NAME, login.token)
      window.location.reload()
    },
    onError: () => {
      addToast('Invalid credentials', 'error')
    }
  })

  const [register] = useMutation(REGISTER, {
    onCompleted: ({ register }) => {
      setUser(register.user)
      setCookie(JWT_COOKIE_NAME, register.token)
      window.location.reload()
    },
    onError: () => {
      addToast('Invalid credentials', 'error')
    }
  })

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      setUser(undefined)
      removeCookie(JWT_COOKIE_NAME)
      window.location.reload()
    },
    onError: () => {
      addToast('Failed to logout', 'error')
    }
  })

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login: async data => await login({ variables: { data } }),
      logout: async () => await logout(),
      register: async data => await register({ variables: { data } })
    }),
    [user, login, logout, register]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}
