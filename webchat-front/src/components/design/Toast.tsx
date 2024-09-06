import { ToastType } from '@hooks/useToast'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

const toastStyles = {
  info: 'bg-blue-500',
  warn: 'bg-yellow-500',
  error: 'bg-red-500',
  success: 'bg-green-500'
}

const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case 'info':
      return <Info className="h-5 w-5" />
    case 'warn':
      return <AlertCircle className="h-5 w-5" />
    case 'error':
      return <XCircle className="h-5 w-5" />
    case 'success':
      return <CheckCircle className="h-5 w-5" />
  }
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div
      className={`${toastStyles[type]} text-white p-4 rounded-lg shadow-lg flex items-center justify-between`}
      role="alert"
    >
      <div className="flex items-center">
        <ToastIcon type={type} />
        <p className="ml-3">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}
