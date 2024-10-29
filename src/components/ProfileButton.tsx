'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { SignInModal } from './SignInModal'

export function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <div className="absolute top-8 right-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full hover:opacity-90 transition-opacity bg-gradient-to-br from-blue-300 to-blue-600"
        aria-label="Profile menu"
      />
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2 space-y-1">
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-900 font-medium">
                  {user.email}
                </div>
                
                <Link
                  href="/profile"
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  View Profile
                </Link>

                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowSignInModal(true)
                  setIsOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />
    </div>
  )
} 