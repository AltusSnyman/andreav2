import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'NexGen Roofing And Construction',
  description: 'Licensed And Insured For All Types Of Roofing Work in the Darwin area Northern Territory.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}

        {/* Voice AI Widget */}
        <link rel="stylesheet" href="/widget.css" />
        <div className="widget-container">
          <button id="voice-ai-widget-btn" className="voice-widget-btn" aria-label="Start Voice AI" suppressHydrationWarning>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>
        <Script src="/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
