import Link from 'next/link'
import { Icon } from '@iconify/react'
import { LEARNING_TOPICS } from '@/data/topics'

const iconColorMap = {
  'js-1': 'text-blue-600',      // Syntax - Blue for code
  'js-2': 'text-purple-600',    // Control Structures - Purple for flow control
  'js-3': 'text-green-600',     // Functions - Green for actions
  'js-4': 'text-orange-500',    // Scope - Orange for boundaries
  'js-5': 'text-indigo-600',    // Arrays - Indigo for data structures
  'js-6': 'text-cyan-600',      // Objects - Cyan for data structures
  'js-7': 'text-red-500',       // DOM - Red for HTML connection
  'js-8': 'text-violet-600',    // Events - Violet for interactions
  'js-9': 'text-rose-600',      // Error Handling - Rose for warnings
  'js-10': 'text-teal-600',     // Built-in Methods - Teal for tools
  'js-11': 'text-blue-500',     // Async - Blue for processing
  'js-12': 'text-emerald-600',  // Modules - Emerald for organization
}

export function TopicsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {LEARNING_TOPICS.filter(topic => topic.category === 'javascript').map((topic) => (
        <Link
          key={topic.id}
          href={topic.path}
          className="group flex flex-col items-center gap-3 p-4 rounded-lg transition-colors duration-200"
        >
          <div className="h-16 w-16 flex items-center justify-center bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors duration-200">
            <Icon 
              icon={topic.icon} 
              className={`text-2xl ${iconColorMap[topic.id as keyof typeof iconColorMap] || 'text-yellow-500'}`}
            />
          </div>
          <span className="text-sm font-medium text-neutral-900 text-center">
            {topic.name}
          </span>
        </Link>
      ))}
    </div>
  )
} 