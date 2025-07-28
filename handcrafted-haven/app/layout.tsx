import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'ArtisanHub - Discover Unique Handcrafted Treasures',
  description: 'Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story. Every piece is made with passion and traditional craftsmanship.',
  keywords: 'handcrafted, artisan, unique gifts, handmade, craftsmanship, pottery, jewelry, textiles, woodwork',
  authors: [{ name: 'ArtisanHub Team' }],
  openGraph: {
    title: 'ArtisanHub - Discover Unique Handcrafted Treasures',
    description: 'Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtisanHub - Discover Unique Handcrafted Treasures',
    description: 'Connect with talented artisans and discover one-of-a-kind handcrafted items that tell a story.',
  },
  viewport: 'width=device-width, initial-scale=1',
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
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}