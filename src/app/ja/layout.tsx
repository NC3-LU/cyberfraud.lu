import '../globals.css'
import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cyberfraud.lu - Special Edition - @Osaka2025',
  description: 'Cyberfraud.lu - Special Edition - @Osaka2025',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
