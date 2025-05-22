import { getTranslations } from '@/content/translations'
import { FaHandSpock } from 'react-icons/fa6'
import { Layout } from '@/components/Layout'
import type { Locale } from '@/types'

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const translations = await getTranslations(locale)

  return (
    <Layout currentLocale={locale}>
      <div className={'section'}>
        <div className={'transparent-stripes w-full h-[500px]'} />
        <div className={'flex gap-4 justify-center items-center w-screen h-screen'}>
          <FaHandSpock />
          {translations.message}
        </div>
      </div>
    </Layout>
  )
}
