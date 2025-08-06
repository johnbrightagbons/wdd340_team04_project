import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'ArtisanHub - Discover Unique Handcrafted Treasures.',
  description: 'Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story. Every piece is made with passion and traditional craftsmanship.',
  keywords: 'handcrafted, artisan, unique gifts, handmade, craftsmanship, pottery, jewelry, textiles, woodwork',
  authors: [{ name: 'ArtisanHub Team' }],
  openGraph: {
    title: 'ArtisanHub - Discover Unique Handcrafted Treasures.',
    description: 'Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtisanHub - Discover Unique Handcrafted Treasures.',
    description: 'Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}