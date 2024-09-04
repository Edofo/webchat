import { useState } from 'react'

import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

export const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className="min-h-screen min-w-[90vw] max-w-[500px] flex items-center justify-center mx-auto relative overflow-hidden">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md z-10">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          {isSignIn ? 'Welcome Back! 🎉' : 'Register Now! 🎉'}
        </h1>
        {isSignIn ? <SignIn /> : <SignUp />}

        <p className="mt-6 text-center text-sm text-white">
          {isSignIn ? "Don't have an account?" : 'Already have an account?'}
          <button
            className="border-none bg-transparent px-1 font-medium text-blue-300 hover:text-blue-200"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? 'Sign up now!' : 'Sign in!'}
          </button>
        </p>
      </div>
    </div>
  )
}
