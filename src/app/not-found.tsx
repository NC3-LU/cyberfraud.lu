import type { Locale } from '@/types'
import { Layout } from '@/components/Layout'
import { headers } from 'next/headers'
import './globals.css'

export default async function NotFound() {
  const headersList = await headers()
  const locale = headersList.get('x-next-i18n-router-locale') || 'en'
  return (
    <Layout currentLocale={locale as Locale}>
      <div className={'page-container'}>
        <div className={'primary-stripes py-36'}>
          <div className={'section flex flex-col items-center justify-center gap-8'}>
            <h1>Not Found.</h1>
            <h2>Please try another page. If the error persists, report it to info@lhc.lu</h2>
          </div>
        </div>
      </div>
    </Layout>
  )
}
