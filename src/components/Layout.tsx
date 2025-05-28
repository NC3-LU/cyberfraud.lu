import type React from 'react'
import type { WithLocale } from '@/types'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type LayoutProps = React.PropsWithChildren<WithLocale>

export const Layout = ({ children, currentLocale }: LayoutProps) => {
  return (
    <main className={'main-container py-4'}>
      <div className={'section'}>
        <Header currentLocale={currentLocale} />
      </div>
      {children}
      <div className={'page-container'}>
        <Footer />
      </div>
    </main>
  )
}
