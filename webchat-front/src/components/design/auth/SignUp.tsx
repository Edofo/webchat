import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Ajoutez ici la logique de connexion
    console.log('Login submitted')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="bg-white bg-opacity-50 border-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <Label htmlFor="pseudo" className="text-white">
          Email
        </Label>
        <Input
          id="pseudo"
          name="pseudo"
          type="text"
          autoComplete="pseudo"
          required
          className="bg-white bg-opacity-50 border-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <div className="mt-1 relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="bg-white bg-opacity-50 border-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <Button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 bg-transparent hover:bg-transparent focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="password" className="text-white">
          Confirm password
        </Label>
        <div className="mt-1 relative">
          <Input
            id="password2"
            name="password2"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="bg-white bg-opacity-50 border-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <Button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 bg-transparent hover:bg-transparent focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full text-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="h-5 w-5 mr-2" /> Sign up
        </Button>
      </div>
    </form>
  )
}
