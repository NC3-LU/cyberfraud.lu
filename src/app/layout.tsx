import type React from 'react'
import { Fjalla_One, Roboto } from 'next/font/google'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import './globals.css'
import i18nConfig from '@/i18nConfig'
import { notFound } from 'next/navigation'
import type { Locale } from '@/types'
import { TrackingScripts } from '@/lib/tracking-scripts'
import { CookieConsentProvider } from '@/lib/consent'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Cyberfraud.lu',
  description: 'CyberFraud.lu - Luxembourg',
}

const fjalla = Fjalla_One({ subsets: ['latin'], weight: '400', variable: '--font-fjalla' })
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-next-i18n-router-locale') || 'en'

  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={`${fjalla.variable} ${roboto.variable}`}>
    <Head>
      <CookieConsentProvider />
    </Head>
    <body>
        {process.env.NODE_ENV === 'production'
          ? <TrackingScripts />
          : null
        }
        {children}
      </body>
    </html>
  )
}
