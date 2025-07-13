'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PrimaryBtn from '@/components/PrimaryBtn'

export default function Profile() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return // Still loading
        if (!session) router.push('/auth/login')
    }, [session, status, router])

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (!session) {
        return null
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <p className="mt-1 text-sm text-gray-900">{session.user.name}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-sm text-gray-900">{session.user.email}</p>
                        </div>

                        <div className="pt-4">
                            <PrimaryBtn
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="hidden lg:block w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Sign out
                            </PrimaryBtn>
                        </div>
                    </div>
                </div>
            </div>
    
        </>
    )
}