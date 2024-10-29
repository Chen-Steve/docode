'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

interface Command {
  id: string
  name: string
  icon: string
  path: string
  category: 'javascript' | 'html' | 'css' | 'react'
  description?: string
}

// Import the topics from your shared data source
import { LEARNING_TOPICS } from '@/data/topics'

// Convert learning topics to commands
const COMMANDS: Command[] = LEARNING_TOPICS.map(topic => ({
  id: topic.id,
  name: topic.name,
  icon: topic.icon,
  path: topic.path,
  category: topic.category,
  description: topic.description
}))

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  // Enhanced search to include description if available
  const filteredCommands = COMMANDS.filter(command =>
    command.name.toLowerCase().includes(search.toLowerCase()) ||
    command.description?.toLowerCase().includes(search.toLowerCase()) ||
    command.category.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.altKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const onSelect = (command: Command) => {
    router.push(command.path)
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/50"
        onClick={() => setIsOpen(false)}
      />

      {/* Command Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl">
        {/* Search input */}
        <div className="flex items-center px-4 border-b">
          <Icon 
            icon="material-symbols:search" 
            className="text-neutral-400 text-lg"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands..."
            className="w-full py-4 px-2 text-neutral-900 placeholder-neutral-400 
                     bg-transparent border-none outline-none"
            autoFocus
          />
          <kbd className="hidden sm:block px-2 py-1 text-xs font-semibold text-neutral-500 
                       bg-neutral-100 rounded">
            ESC
          </kbd>
        </div>

        {/* Updated Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-neutral-500">
              No results found for &apos;{search}&apos;
            </div>
          ) : (
            filteredCommands.map((command) => (
              <button
                key={command.id}
                onClick={() => onSelect(command)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left
                         text-neutral-900 hover:bg-neutral-50"
              >
                <Icon 
                  icon={command.icon} 
                  className={`text-2xl ${getCategoryColor(command.category)}`}
                />
                <div className="flex-1">
                  <div>{command.name}</div>
                  {command.description && (
                    <div className="text-sm text-neutral-500">{command.description}</div>
                  )}
                </div>
                <span className="text-xs text-neutral-400">
                  {command.category.toUpperCase()}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function to get category colors
function getCategoryColor(category: Command['category']) {
  switch (category) {
    case 'html':
      return 'text-orange-500'
    case 'css':
      return 'text-blue-500'
    case 'javascript':
      return 'text-yellow-500'
    case 'react':
      return 'text-cyan-500'
    default:
      return 'text-neutral-500'
  }
} 