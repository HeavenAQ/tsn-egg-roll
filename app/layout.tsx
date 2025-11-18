import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Toaster from '@/components/toaster'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '南海豊 NANHAIRICH - からすみエッグロール公式サイト',
  description: '台湾の高級からすみを使った、米と卵の香ばしい煎餅。台湾海鮮専門ブランド「南海豊 NANHAIRICH」の最新商品。',
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
    title: '南海豊 NANHAIRICH - からすみエッグロール',
    description: '台湾の高級珍味からすみを使ったプレミアム商品',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        {/* Toasts for system status */}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
