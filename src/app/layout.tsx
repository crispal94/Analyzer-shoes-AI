import '@/styles/globals.css'
// import 'material-symbols' // Removed in favor of Google Fonts CDN for display:swap
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { Barlow, Kanit } from 'next/font/google'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const kanit = Kanit({
  subsets: ['latin'],
  // Kanit se ve genial en pesos altos (600+), asegúrate de incluirlos
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-kanit', // Variable única para Kanit
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://runwise.ai', // Placeholder URL
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@runwise_ai',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={clsx(barlow.variable, kanit.variable)} lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={clsx(
          'min-h-screen text-foreground font-sans antialiased bg-background-light dark:bg-background-dark'
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>{children}</Providers>
      </body>
    </html>
  )
}
