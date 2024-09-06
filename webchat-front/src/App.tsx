import { lazy, Suspense } from 'react'

import LoadingPage from './components/design/LoadingPage'

const AuthHomePage = lazy(() => import('@pages/Home'))
import ToastContainer from './components/ToastContainer'

const App = () => {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <AuthHomePage />
      </Suspense>
      <ToastContainer />
    </div>
  )
}

export default App
