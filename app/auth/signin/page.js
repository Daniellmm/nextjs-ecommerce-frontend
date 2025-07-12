'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PrimaryBtn from '@/components/PrimaryBtn'
import Image from 'next/image'
import GL from '../../../public/googleLogo.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else if (result?.ok) {
        const urlParams = new URLSearchParams(window.location.search);
        const rawCallbackUrl = urlParams.get('callbackUrl');
        const callbackUrl = rawCallbackUrl ? decodeURIComponent(rawCallbackUrl) : '/cart';
        router.push(callbackUrl);

      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    // Get the callback URL from URL params or default to cart
    const urlParams = new URLSearchParams(window.location.search);
    const callbackUrl = urlParams.get('callbackUrl') || '/cart';

    signIn('google', {
      callbackUrl: callbackUrl
    });
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div className='w-full'>
              <PrimaryBtn
                type="submit"
                disabled={loading}
                className='w-full'
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </PrimaryBtn>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {"Don't have an account?"}{' '}
                <Link href="/auth/signup" className="font-medium text-black hover:text-gray-800">
                  Sign up
                </Link>
              </p>
            </div>
          </form>

          <div className="text-center mt-4 w-full flex justify-center">
            <PrimaryBtn
              onClick={handleGoogleSignIn}
              className='rounded-full bg-black w-full py-3 flex gap-3 justify-center items-center text-black lg:w-auto px-10 cursor-pointer'
            >
              <Image src={GL} height={30} width={30} alt='google-logo' />
              Sign in with Google
            </PrimaryBtn>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}