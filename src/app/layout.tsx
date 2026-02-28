import type { Metadata } from 'next'
import { Syne, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'StudyFlow — Your All-in-One Study Platform',
  description: 'AI-powered study platform for students. Manage tasks, track progress, generate flashcards with AI, and ace your academics.',
  keywords: ['study', 'AI', 'flashcards', 'student', 'education', 'productivity'],
  authors: [{ name: 'StudyFlow' }],
  openGraph: {
    title: 'StudyFlow — Your All-in-One Study Platform',
    description: 'AI-powered study platform for students.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="aurora-bg min-h-screen">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#161622',
              color: '#f0f0ff',
              border: '1px solid #232338',
              borderRadius: '12px',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '13px',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
