'use client'

import { useState } from 'react'
import CodeEditor from '@/components/CodeEditor'
import PreviewRenderer from '@/components/PreviewRenderer'

export default function EditorPage() {
  const [content, setContent] = useState({
    html: '<h1>Hello World</h1>',
    css: 'h1 { color: blue; }',
    js: 'console.log("Hello from JavaScript!");'
  });

  const handleContentChange = (newContent: string, type: 'html' | 'css' | 'js') => {
    setContent(prev => ({
      ...prev,
      [type]: newContent
    }));
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 h-screen">
        <CodeEditor 
          content={content}
          onChange={handleContentChange}
        />
      </div>
      <div className="w-1/2 h-screen">
        <PreviewRenderer content={content} />
      </div>
    </div>
  )
} 