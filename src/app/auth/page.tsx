'use client'

import Auth from '@/components/Auth'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <Auth />
      </div>
    </div>
  )
} 