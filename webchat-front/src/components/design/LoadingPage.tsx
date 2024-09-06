import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const loadingMessages = [
  'Preparing the fun...',
  'Warming up the chat bubbles...',
  'Tuning the laughter frequency...',
  'Polishing the emojis...',
  'Inflating the joy balloons...',
  'Sprinkling magic dust...',
  'Charging the happy batteries...',
  'Unleashing the giggles...',
  'Calibrating the smile-o-meter...',
  'Fueling the excitement rockets...'
]

const LoadingPage = () => {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <div className="mb-8">
          <Loader2 className="h-16 w-16 animate-spin text-white mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Loading FunChat</h1>
        <p className="text-xl text-white animate-pulse">{loadingMessages[messageIndex]}</p>
      </div>
      <div className="mt-16 flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={'w-4 h-4 rounded-full bg-white animate-bounce'}
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default LoadingPage
