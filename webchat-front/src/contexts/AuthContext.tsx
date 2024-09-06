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
import { GET_ME, LOGIN, REGISTER } from '@/http/requests/auth'

interface AuthContextType {
  user: AuthUser | undefined
  login: (data: LoginInput) => Promise<FetchResult<LoginMutation>>
  logout: () => void
  register: (data: RegisterInput) => Promise<FetchResult<RegisterMutation>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [_, setCookie, removeCookie] = useCookies([JWT_COOKIE_NAME])

  const [user, setUser] = useState<AuthUser | undefined>(undefined)

  const { data } = useQuery(GET_ME)

  useEffect(() => {
    if (data) setUser(data.getMe)
  }, [data])

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      setUser(login.user)
      setCookie(JWT_COOKIE_NAME, login.token)
    }
  })

  const [register] = useMutation(REGISTER, {
    onCompleted: ({ register }) => {
      setUser(register.user)
      setCookie(JWT_COOKIE_NAME, register.token)
    }
  })

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login: async data => await login({ variables: { data } }),
      logout: () => {
        setUser(undefined)
        removeCookie(JWT_COOKIE_NAME)
      },
      register: async data => await register({ variables: { data } })
    }),
    [user, login, register, removeCookie]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}
