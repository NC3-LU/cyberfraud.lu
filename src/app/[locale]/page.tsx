import Image from 'next/image'
import Link from 'next/link'
import VideoImage from '@/assets/video_image.png'
import { Accordion } from '@/components/Accordion'
import { Card } from '@/components/Card'
import { Hero } from '@/components/Hero'
import { Icon } from '@/components/Icon'
import { Layout } from '@/components/Layout'
import { LEssentielPopup } from '@/components/LEssentielPopup'
import { Title } from '@/components/Title'
import { YouTubeVideo } from '@/components/YouTubeVideo'
import { getHtmlFromMD, getTranslations } from '@/content/translations'
import type { Locale } from '@/types'

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const { campaign = undefined } = await searchParams
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

  const section1 = translations.sections[0]
  const section2 = translations.sections[1]
  const section3 = translations.sections[2]
  const section4 = translations.sections[3]
  const section5 = translations.sections[4]
  const [partners1, partners2] = translations.partners
  const video = translations.video

  return (
    <>
      <Layout
        currentLocale={locale}
        siteDescription={translations.footer.siteDescription}
        patronage={translations.footer.patronage}
      >
        <div className={'page-container'}>
          <Hero content={translations.hero.content} />
        </div>
        <div className={'page-container'}>
          <div className={'primary-stripes py-8 md:py-24'}>
            <div className={'section'}>
              <Title level={'h2'} title={section1.titles} />
            </div>
            <div className={'section mt-16'}>
              <div
                className={'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-2 auto-rows-fr pb-8 xl:pb-0'}
              >
                {/* biome-ignore lint/suspicious/noExplicitAny: we need it */}
                {section1.cards.map((card: any, index: number) => {
                  return (
                    <Card
                      key={`section1_card_${
                        // biome-ignore lint/suspicious/noArrayIndexKey: it's fine
                        index
                      }`}
                      title={card.title}
                      style={card.style}
                      body={card.body}
                      icon={card.icon}
                      className={`${card.style === 'alert' ? 'animate-shake' : ''}`}
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
              <Title level='h2' title={section2.titles} />
            </div>
            <div className='section my-8 xl:my-16'>
              <div className={'flex flex-col gap-4'}>
                {
                  await Promise.all(
                    // biome-ignore lint/suspicious/noExplicitAny: we need it
                    section2.accordionItems.map(async (item: any, index: number) => {
                      return (
                        <Accordion
                          key={`section2_accordion_${
                            // biome-ignore lint/suspicious/noArrayIndexKey: it's fine
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
        <div className={'page-container'}>
          <div
            className={
              "w-full h-full flex flex-col items-start justify-start py-16 xl:py-40 bg-[url('/images/bg4_mobile.png')] md:bg-[url('/images/bg4.png')] bg-position-[top_center] bg-cover bg-no-repeat"
            }
          >
            <div className={'section pb-16 xl:pb-24'}>
              <Title level={'h2'} title={section3.titles} />
            </div>
            <div className={'section pt-4 pb-16'}>
              <div className={'flex flex-col items-center justify-center w-full gap-4'}>
                {/* biome-ignore lint/suspicious/noExplicitAny: we need it */}
                {section3.cards.map((item: any, index: number) => {
                  return (
                    <div
                      key={`horizontal_card_${
                        // biome-ignore lint/suspicious/noArrayIndexKey: it's fine
                        index
                      }`}
                      className={
                        'w-full flex items-stretch justify-center h-auto xl:h-[180px] bg-transparent xl:bg-white'
                      }
                    >
                      <div
                        className={`${(index + 1) % 2 === 0 ? 'xl:order-2 primary-stripes-dark' : 'xl:order-1 secondary-stripes-dark'} w-[120px] xl:w-[390px] flex items-center justify-center font-secondary text-6xl xl:text-9xl text-white py-8 xl:py-0`}
                      >
                        0{index + 1}
                      </div>
                      <div
                        className={` ${(index + 1) % 2 === 0 ? 'xl:order-1' : 'xl:order-2'} bg-white flex-1 flex flex-col items-start justify-center p-4 px-8 gap-2 ${(index + 1) % 2 === 0 ? 'text-primary' : 'text-secondary'} text-wrap`}
                      >
                        <div className={'font-secondary text-2xl uppercase break-words'}>{item.title}</div>
                        <div className={'text-base/5 break-words'}>{item.body}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={'transparent-stripes w-full pb-24'}>
              <div className={'section pb-16'}>
                <Title level={'h2'} title={section4.titles} />
              </div>
              <div className={'section mt-8 xl:mt-16 overflow-x-auto'}>
                <div className={'grid grid-cols-4 gap-4 w-[max-content] xl:w-full'}>
                  {/* biome-ignore lint/suspicious/noExplicitAny: we need it */}
                  {section4.cards.map((card: any, index: number) => {
                    return (
                      <Card
                        className={'max-w-[300px] xl:max-w-none'}
                        style={card.style}
                        key={`section4_card_${
                          // biome-ignore lint/suspicious/noArrayIndexKey: it's fine
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
            <div className={'section pt-8 xl:pt-36 pb-8 xl:pb-24'}>
              <Title level={'h2'} title={section5.titles} />
            </div>
            <div className={'section mt-0 xl:mt-16'}>
              <div className={'grid grid-cols-1 xl:grid-cols-3 gap-4 items-start'}>
                {/* biome-ignore lint/suspicious/noExplicitAny: we need it */}
                {section5.cards.map((card: any, index: number) => {
                  return (
                    <Card
                      key={`section5_card_${
                        // biome-ignore lint/suspicious/noArrayIndexKey: it's fine
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
        <div className={'page-container'}>
          <div className={'secondary-stripes-dark-2 py-24'}>
            <div className={'section '}>
              <Title level={'h2'} title={video.titles} />
            </div>
            <div className={'section py-16'}>
              <YouTubeVideo videoUrl={video.url} embedUrl={video.embed} image={VideoImage} />
            </div>
            <div className={'section'}>
              <div
                className={
                  '[clip-path:polygon(0_0,100%_0,100%_70%,95%_100%,0_100%)] bg-white flex flex-col lg:flex-row items-center justify-start gap-16 p-8 text-secondary'
                }
              >
                <div className={'uppercase  text-2xl font-secondary'}>{video.linksTitle}</div>
                <div className={'flex justify-start items-center gap-4'}>
                  {/* biome-ignore lint/suspicious/noExplicitAny: we need it */}
                  {video.links.map((link: any) => {
                    return (
                      <Link key={link.url} href={link.url} target={'_blank'} rel='noopener noreferrer'>
                        <Icon name={link.icon} className={'text-5xl'} />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'page-container'}>
          <div className={'section bg-white'}>
            <Title level={'h2'} title={partners1.titles} />
          </div>
          <div className={'section py-16'}>
            <div
              className={
                'my-8 xl:my-16 grid grid-cols-2 xl:grid-cols-4 gap-16 xl:gap-8 w-full auto-rows-[60px] xl:auto-rows-[80px]'
              }
            >
              {/* biome-ignore lint/suspicious/noExplicitAny: we should use it here */}
              {partners1.items[0].map((item: any) => {
                return (
                  <div key={`partners1_item_${item.name}`} className={'flex  justify-center items-center m-auto'}>
                    <Link href={item.url} target={'_blank'} rel={'noreferrer noopener'}>
                      <Image src={item.image} alt={item.name} className={'w-full h-auto'} width={200} height={80} />
                    </Link>
                  </div>
                )
              })}
            </div>
            <div
              className={
                'grid grid-cols-3 xl:grid-cols-6 gap-16 lg:gap-8 xl:gap-2 w-full my-8 xl:my-16 items-center auto-rows-[60px] xl:auto-rows-[80px] justify-center'
              }
            >
              {/* biome-ignore lint/suspicious/noExplicitAny: same as line 245 */}
              {partners1.items[1].map((item: any) => {
                return (
                  <Link
                    key={`partners1_item_${item.name}`}
                    href={item.url}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                    className={'w-auto h-full m-auto'}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className={'w-auto h-full m-auto'}
                      width={200}
                      height={80}
                    />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        <div className={'page-container'}>
          <div className={'border-t-primary border-t-4'}>
            <div className={'section bg-white'}>
              <Title level={'h2'} title={partners2.titles} />
            </div>
            <div className={'section py-16'}>
              <div
                className={
                  'my-8 xl:my-16 grid grid-cols-2 lg:grid-cols-[30px_1fr_30px_1fr_30px] xl:grid-cols-[50px_1fr_150px_1fr_50px] gap-16 w-full justify-center items-center auto-rows-[50px] xl:auto-rows-[80px]'
                }
              >
                {/* biome-ignore lint/suspicious/noExplicitAny: still need any */}
                {partners2.items[0].map((item: any, index: number) => {
                  return (
                    <div
                      key={`partners2_item_${item.name}`}
                      className={`flex items-center justify-center ${index === 0 ? 'lg:col-start-2' : 'lg:col-start-4'}`}
                    >
                      <Link
                        href={item.url}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                        className={'w-full h-auto m-auto'}
                      >
                        <Image src={item.image} alt={item.name} className={'w-auto h-full'} width={400} height={100} />
                      </Link>
                    </div>
                  )
                })}
              </div>
              <div
                className={
                  'grid grid-cols-3 xl:grid-cols-5 gap-16 xl:gap-8 w-full justify-center my-8 xl:my-16 flex-wrap auto-rows-[40px] xl:auto-rows-[50px]'
                }
              >
                {/* biome-ignore lint/suspicious/noExplicitAny: we need it */}
                {partners2.items[1].map((item: any) => {
                  return (
                    <Link
                      href={item.url}
                      target={'_blank'}
                      rel={'noreferrer noopener'}
                      key={`partners2_item_${item.name}`}
                      className={'w-auto h-full m-auto'}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        className={'w-auto h-full m-auto'}
                        width={130}
                        height={80}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <LEssentielPopup isOpen={!!(locale === 'fr' && campaign && campaign === 'lessentiel')} />
    </>
  )
}
