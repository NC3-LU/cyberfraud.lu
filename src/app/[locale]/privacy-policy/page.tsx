import type { Locale } from '@/types'
import { getTranslations } from '@/content/translations'
import { Markdown } from '@/components/Markdown'
import { Layout } from '@/components/Layout'
import Link from 'next/link'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const translations = await getTranslations(locale as Locale)
  const body = (await translations['privacy-policy']?.content) || ''
  const linkRightTitle = (await translations['terms-and-conditions']?.title) || 'Terms and conditions'

  return (
    <Layout
      currentLocale={locale}
      siteDescription={translations.footer.siteDescription}
      patronage={translations.footer.patronage}
    >
      <div className={'page-container '}>
        <div className={'section primary-stripes mb-10 flex flex-col items-center justify-center py-14'}>
          <div className={'flex flex-col justify-between min-h-[calc(100vh-220px)] max-w-[min(1000px, 100vw)] bg-white'}>
            <div className={'flex h-[60px] items-center justify-between px-6 pt-4 '}>
              <Link
                href={'/'}
                className={'mx-[-16] inline-flex h-full items-center gap-2 px-4 text-primary hover:underline'}
              >
                <LuArrowLeft />
                Home
              </Link>
              <Link
                href={'/terms-and-conditions'}
                className={'mx-[-16] inline-flex h-full items-center gap-2 px-4 text-primary hover:underline'}
              >
                {linkRightTitle}
                <LuArrowRight />
              </Link>
            </div>
            <Markdown className={'px-8 pb-12 md:px-16 md:pt-4 md:pb-14 lg:px-24 lg:pt-8 lg:pb-24'}>{body}</Markdown>
            <div className={'flex h-[60px] items-center justify-end px-6 pb-4'}>
              <Link
                href={'/terms-and-conditions'}
                className={'mx-[-16] inline-flex h-full items-center gap-2 px-4 text-primary hover:underline'}
              >
                {linkRightTitle}
                <LuArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
