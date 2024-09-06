import { useCallback, useState } from 'react'

export type ToastType = 'info' | 'warn' | 'error' | 'success'

interface Toast {
  id: number
  message: string
  type: ToastType
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now()
    setToasts(prevToasts => [...prevToasts, { id, message, type }])

    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
    }, 5000)
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}
