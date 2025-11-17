import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'

const baseUrl = 'https://bigfeelsbotanical.com'
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Big Feels Botanical',
    template: '%s | Kelly Zick',
  },
  description: 'Feelings help us grow.',
  openGraph: {
    title: 'Big Feels Botanical',
    description: 'Flowers and feelings.',
    url: baseUrl,
    siteName: 'Big Feels Botanical',
    locale: 'en_US',
    type: 'website',
  },
}

interface Cx {
  (...classes: (string | undefined | null | false)[]): string
}

const cx: Cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="antialiased">
        <div className="flex-auto min-w-0 mt-6 flex flex-col min-h-screen">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  )
}
