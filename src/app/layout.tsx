import type React from 'react'
import { Fjalla_One, Roboto } from 'next/font/google'

const fjalla = Fjalla_One({ subsets: ['latin'], weight: '400', variable: '--font-fjalla' })
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${fjalla.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  )
}
