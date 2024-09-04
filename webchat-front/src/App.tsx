import { lazy, Suspense } from 'react'

const AuthHomePage = lazy(() => import('@pages/Home'))

const App = () => {
  return (
    <div>
      <Suspense fallback={'Loading..'}>
        {/* <Routes><Route path="/" element={<Home />} /> </Routes> */}
        <AuthHomePage />
      </Suspense>
    </div>
  )
}

export default App
