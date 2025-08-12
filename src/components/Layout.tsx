import type React from 'react'
import type { WithLocale } from '@/types'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type LayoutProps = React.PropsWithChildren<
  WithLocale & {
    siteDescription?: string
    patronage?: string
    additionalLogo?: React.ReactNode
  }
>

export const Layout = ({
  children,
  currentLocale,
  siteDescription = '',
  patronage = '',
  additionalLogo,
}: LayoutProps) => {
  return (
    <main className={'main-container'}>
      <div className={'page-container'}>
        <div className={'section'}>
          <Header currentLocale={currentLocale} additionalLogo={additionalLogo} />
        </div>
      </div>
      {children}
      <div className={'page-container'}>{<Footer siteDescription={siteDescription} patronage={patronage} />}</div>
    </main>
  )
}
