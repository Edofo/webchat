export interface Chat {
  id: string
  name: string
}

export interface Message {
  id: string
  content: string
  sender: 'me' | 'them'
  timestamp: string
}
