'use client'

import { useState, useEffect, use } from 'react'
import CodeEditor from '@/components/CodeEditor'
import PreviewRenderer from '@/components/PreviewRenderer'
import { LEARNING_TOPICS } from '@/data/topics'

interface TopicContent {
  html: string
  css: string
  js: string
}

const topicContents: Record<string, TopicContent> = {
  'js-syntax': {
    html: '<h1>JavaScript Syntax</h1>\n<p>Start writing your JavaScript code below:</p>',
    css: 'body { padding: 20px; }\nh1 { color: #333; }',
    js: '// Learn JavaScript Syntax\nlet message = "Hello World!";\nconsole.log(message);'
  },
  'js-control': {
    html: '<h1>Control Structures</h1>\n<p>Practice if statements and loops:</p>',
    css: 'body { padding: 20px; }\nh1 { color: #444; }',
    js: '// Practice control structures\nfor(let i = 0; i < 5; i++) {\n  console.log(`Iteration ${i}`);\n}'
  },
  // Add more topic contents as needed
}

export default function TopicEditorPage({ params }: { params: Promise<{ topicId: string }> }) {
  const resolvedParams = use(params);
  const topicId = resolvedParams.topicId;

  const [content, setContent] = useState<TopicContent>({
    html: '',
    css: '',
    js: ''
  });

  const topic = LEARNING_TOPICS.find(t => t.path.includes(topicId));

  useEffect(() => {
    // Load topic-specific content
    if (topicContents[topicId]) {
      setContent(topicContents[topicId]);
    }
  }, [topicId]);

  const handleContentChange = (newContent: string, type: 'html' | 'css' | 'js') => {
    setContent(prev => ({
      ...prev,
      [type]: newContent
    }));
  };

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-gray-100 border-b">
        <h1 className="text-xl font-bold">{topic.name}</h1>
        <p className="text-gray-600">{topic.description}</p>
      </div>
      <div className="flex flex-1">
        <div className="w-1/2 h-[calc(100vh-88px)]">
          <CodeEditor 
            content={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="w-1/2 h-[calc(100vh-88px)]">
          <PreviewRenderer content={content} />
        </div>
      </div>
    </div>
  )
} 