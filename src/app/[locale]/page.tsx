import { Layout } from '@/components/Layout'
import type { Locale } from '@/types'
import { Hero } from '@/components/Hero'
import { Title } from '@/components/Title'
import Image from 'next/image'
import { Card } from '@/components/Card'
import { getHtmlFromMD, getTranslations } from '@/content/translations'
import { Accordion } from '@/components/Accordion'

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const translations = await getTranslations(locale)

  if (!translations) {
    return (
      <Layout currentLocale={locale}>
        <div className={'page-container'}>
          <div className={'primary-stripes py-36'}>
            <div className={'section flex flex-col items-center justify-center gap-8'}>
              <h1>Coming soon...</h1>
              <h2>Sorry! We're working on it, please try another language</h2>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  const firstSection = translations.sections[0]
  const secondSection = translations.sections[1]
  const thirdSection = translations.sections[2]
  const fourthSection = translations.sections[3]
  const fifthSection = translations.sections[4]

  return (
    <Layout currentLocale={locale}>
      <div className={'page-container'}>
        <Hero content={translations.hero.content} />
      </div>
      <div className={'page-container'}>
        <div className={'primary-stripes py-24'}>
          <div className={'section'}>
            <Title level={'h2'} title={firstSection.titles} />
          </div>
          <div className={'section mt-16'}>
            <div className={'grid grid-cols-4 gap-2 auto-rows-fr'}>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
              {firstSection.cards.map((card: any, index: number) => {
                return (
                  <Card
                    key={`first_section_card_${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                    title={card.title}
                    style={card.style}
                    body={card.body}
                    icon={card.icon}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='page-container'>
        <div className='bg-primary-light pb-16'>
          <div className='section'>
            <Title level='h2' title={secondSection.titles} />
          </div>
          <div className='section my-16'>
            <div className={'flex flex-col gap-4'}>
              {
                await Promise.all(
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  secondSection.accordionItems.map(async (item: any, index: number) => {
                    return (
                      <Accordion
                        key={`second_section_accordion_${
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          index
                        }`}
                        title={item.title}
                        body={await getHtmlFromMD(item.body, true)}
                        icon={item.icon}
                      />
                    )
                  }),
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className={'page-container relative'}>
        <div className={'absolute top-0 left-0 right-0 bottom-0 page-container'}>
          <div className={'w-full h-full flex flex-col items-start justify-start py-40'}>
            <div className={'section pb-24'}>
              <Title level={'h2'} title={thirdSection.titles} />
            </div>
            <div className={'section pt-4 pb-16'}>
              <div className={'flex flex-col items-center justify-center w-full gap-4'}>
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                {thirdSection.cards.map((item: any, index: number) => {
                  return (
                    <div
                      key={`horizontal_card_${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                      }`}
                      className={'w-full flex items-stretch justify-center h-[180px] bg-white'}
                    >
                      <div
                        className={`${(index + 1) % 2 === 0 ? 'order-2 primary-stripes-dark' : 'order-1 secondary-stripes-dark'} w-[390px] flex items-center justify-center font-secondary text-9xl text-white`}
                      >
                        0{index + 1}
                      </div>
                      <div
                        className={` ${(index + 1) % 2 === 0 ? 'order-1' : 'order-2'} flex-8/12 flex flex-col items-start justify-center p-4 px-8 gap-2 ${(index + 1) % 2 === 0 ? 'text-primary' : 'text-secondary'}`}
                      >
                        <div className={'font-secondary text-2xl uppercase'}>{item.title}</div>
                        <div className={'text-base/5'}>{item.body}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={'transparent-stripes w-full pb-24'}>
              <div className={'section pb-16'}>
                <Title level={'h2'} title={fourthSection.titles} />
              </div>
              <div className={'section mt-16'}>
                <div className={'grid grid-cols-4 gap-2'}>
                  {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                  {fourthSection.cards.map((card: any, index: number) => {
                    return (
                      <Card
                        style={card.style}
                        key={`fourthSection_card_${
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          index
                        }`}
                        title={card.title}
                        body={card.body}
                        footerItems={card.footerItems}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={'section pt-36 pb-24'}>
              <Title level={'h2'} title={fifthSection.titles} />
            </div>
            <div className={'section mt-16'}>
              <div className={'grid grid-cols-3 gap-4 items-start'}>
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                {fifthSection.cards.map((card: any, index: number) => {
                  return (
                    <Card
                      key={`fifthSection_card_${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                      }`}
                      icon={card.icon}
                      style={card.style}
                      title={card.title}
                      body={card.body}
                      footerItems={card.footerItems}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col -z-10'}>
          <Image
            src={'/images/bg2.png'}
            alt={'Cyberfraud.lu'}
            width={1920}
            height={1077}
            className={'w-full h-auto object-contain'}
          />
          <Image
            src={'/images/bg3.png'}
            alt={'Cyberfraud.lu'}
            width={1920}
            height={1077}
            className={'w-full h-auto object-contain'}
          />
        </div>
      </div>
    </Layout>
  )
}
