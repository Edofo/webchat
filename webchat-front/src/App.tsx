import { lazy, Suspense } from 'react'

import LoadingPage from './components/design/LoadingPage'
import { useToast } from './hooks/useToast'

const AuthHomePage = lazy(() => import('@pages/Home'))
import { Toast } from './components/design/Toast'

const App = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <AuthHomePage />
      </Suspense>
      <div className="fixed bottom-4 right-4 z-50 space-y-4">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
