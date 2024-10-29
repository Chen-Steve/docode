export interface Topic {
  id: string
  name: string
  icon: string
  path: string
  category: 'javascript' | 'html' | 'css' | 'react'
  description: string
} 