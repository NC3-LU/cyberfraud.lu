import type { Metadata } from 'next'
import '../globals.css'
import { Fjalla_One, Roboto } from 'next/font/google'
import type React from 'react'
import i18nConfig from '@/i18nConfig'
import type { Locale } from '@/types'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Cyberfraud.lu',
  description: 'Cybersecurity Luxembourg',
}

const fjalla = Fjalla_One({ subsets: ['latin'], weight: '400', variable: '--font-fjalla' })
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params
  if (!i18nConfig.locales.includes(locale)) {
    notFound()
    return
  }

  return (
    <html lang={locale} className={`${fjalla.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  )
}
