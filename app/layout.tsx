import type { Metadata, Viewport } from 'next'
import { Syne, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({ 
  subsets: ["latin"],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rosnel KANA | Freelance Full-Stack Engineer',
  description: 'Full-Stack Web & Software Engineer specializing in AI integration, scalable backends, and modern frontend development. Available for freelance projects worldwide.',
  keywords: ['Full-Stack Developer', 'Freelance Engineer', 'Web Development', 'AI Integration', 'React', 'Next.js', 'Node.js'],
  authors: [{ name: 'Rosnel KANA' }],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Rosnel KANA | Freelance Full-Stack Engineer',
    description: 'Full-Stack Web & Software Engineer specializing in AI integration, scalable backends, and modern frontend development.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${syne.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
