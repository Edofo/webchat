import './App.css'

import { Suspense } from 'react'
import { Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Suspense fallback={'Loading..'}>
        <Routes>{/* <Route path="/" element={<Home />} /> */}</Routes>
      </Suspense>
    </div>
  )
}

export default App
