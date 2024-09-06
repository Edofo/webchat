import { lazy, Suspense } from 'react'

import LoadingPage from './components/design/LoadingPage'

const AuthHomePage = lazy(() => import('@pages/Home'))

const App = () => {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <AuthHomePage />
      </Suspense>
    </div>
  )
}

export default App
