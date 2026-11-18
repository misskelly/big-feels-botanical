import './global.css'
import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { SkipLink } from './components/ui'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
})

const baseUrl = 'https://bigfeelsbotanical.com'
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Big Feels Botanical | Seed to Soul Floral and Garden Design',
    template: '%s | Big Feels Botanical',
  },
  description: 'Seed to Soul Floral and Garden Design.',
  openGraph: {
    title: 'Big Feels Botanical',
    description: 'Seed to Soul Floral and Garden Design.',
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
        'bg-surface text-ink',
        fraunces.variable,
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="flex min-h-screen flex-col font-body antialiased">
        <SkipLink />
        <Navbar />
        <main id="main-content" className="flex-auto">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
