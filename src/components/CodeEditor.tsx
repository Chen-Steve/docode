'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface CodeEditorProps {
  content: {
    html: string;
    css: string;
    js: string;
  };
  onChange: (newContent: string, type: 'html' | 'css' | 'js') => void;
}

export default function CodeEditor({ content, onChange }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html')
  const [lineCount, setLineCount] = useState(1)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const tabs: Array<'html' | 'css' | 'js'> = ['html', 'css', 'js']

  const getActiveContent = useCallback(() => {
    return content[activeTab];
  }, [content, activeTab]);

  const updateContent = (newContent: string) => {
    onChange(newContent, activeTab);
  };

  // Update line count when code changes
  useEffect(() => {
    const lines = getActiveContent().split('\n').length
    setLineCount(lines)
  }, [getActiveContent])

  // Handle tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      
      const newContent = getActiveContent().substring(0, start) + '  ' + getActiveContent().substring(end)
      updateContent(newContent)
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tabs with Home button */}
      <div className="flex justify-between bg-gray-100 border-b border-gray-200">
        {/* Back to home link */}
        <Link
          href="/"
          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200"
        >
          Back to home page
        </Link>

        {/* Language tabs */}
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab
                  ? 'bg-white text-gray-800 border-t-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="bg-gray-100 text-gray-400 p-4 text-right font-mono text-sm select-none">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Code editor */}
        <textarea
          ref={textareaRef}
          value={getActiveContent()}
          onChange={(e) => updateContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 font-mono text-sm bg-white text-gray-800 outline-none resize-none"
          placeholder="Enter your code here..."
          spellCheck="false"
        />
      </div>
    </div>
  )
} 