import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cognitive Skills & Student Performance Dashboard',
  description: 'Analyze cognitive skills, performance, and personas',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-800 sticky top-0 z-10 bg-slate-950/70 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
              <h1 className="text-xl font-bold text-white">Cognitive Skills & Student Performance</h1>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

