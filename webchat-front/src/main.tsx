import './index.css'

import { ApolloProvider } from '@apollo/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ChatProvider } from './contexts/ChatContext.tsx'
import { FriendProvider } from './contexts/FriendContext.tsx'
import { getClient } from './http/client.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={getClient()}>
      <AuthProvider>
        <FriendProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </FriendProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
)
