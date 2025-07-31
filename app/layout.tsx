import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from 'geist/font/mono'
import "./globals.css"

export const metadata: Metadata = {
  title: 'Arctic Life - Polar Wildlife Explorer',
  description: 'Explore amazing polar animals in 3D! Learn about Arctic wildlife through interactive models, sounds, and fun facts in our educational platform.',
  generator: 'Arctic Life',
  keywords: 'arctic, polar bear, 3D, education, wildlife, interactive, kids, learning',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <style>{`
html {
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Arial Rounded MT Bold', ${GeistSans.style.fontFamily}, sans-serif;
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="jungle-theme">{children}</body>
    </html>
  )
}
