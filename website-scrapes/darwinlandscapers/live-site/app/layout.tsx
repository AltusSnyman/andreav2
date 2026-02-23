import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Darwin Landscapers - Professional Landscaping & Garden Maintenance",
  description: "Darwin's #1 Landscape Gardeners. Professional landscaping, garden maintenance, irrigation, and design services in Darwin and NT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <link rel="stylesheet" href="/widget.css" />
        <div className="widget-container">
          <button id="voice-ai-widget-btn" className="voice-widget-btn" aria-label="Start Voice AI">
            <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
          </button>
        </div>
        <script src="/widget.js" async></script>
      </body>
    </html>
  );
}
