'use client'

interface PreviewRendererProps {
  content: {
    html: string;
    css: string;
    js: string;
  }
}

// Extend Window interface to include console
declare global {
  interface Window {
    console: typeof console;
  }
}

export default function PreviewRenderer({ content }: PreviewRendererProps) {
  // Add safety check for content
  if (!content) {
    return <div>No content to preview</div>;
  }

  // Combine the HTML, CSS, and JS into a complete webpage
  const combinedContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          ${content.css || ''}
        </style>
      </head>
      <body>
        ${content.html || ''}
        <script>
          window.onerror = function(msg, url, lineNo, columnNo, error) {
            console.error('Error: ' + msg + '\nLine: ' + lineNo);
            return false;
          };
          try {
            ${content.js || ''}
          } catch (error) {
            console.error('JavaScript error:', error);
          }
        </script>
      </body>
    </html>
  `.trim();

  return (
    <div className="h-full w-full">
      <iframe 
        srcDoc={combinedContent}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-modals allow-same-origin"
        title="preview"
        onLoad={(e) => {
          const iframe = e.target as HTMLIFrameElement;
          if (iframe.contentWindow) {
            // Properly type the console methods
            iframe.contentWindow.console.log = (...args: unknown[]) => console.log(...args);
            iframe.contentWindow.console.error = (...args: unknown[]) => console.error(...args);
          }
        }}
      />
    </div>
  );
} 