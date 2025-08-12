import { Card } from '@/components/Card'
import { Layout } from '@/components/Layout'
import { Title } from '@/components/Title'
import { getTranslations } from '@/content/translations'
import Image from 'next/image'

/** Made a separated page because we need a reduced temporary version **/
export default async function Home() {
  const locale = 'ja'
  const translations = await getTranslations('ja')

  const section3 = translations.sections[0]
  const section5 = translations.sections[1]

  return (
    <>
      <Layout
        currentLocale={locale}
        siteDescription={translations.footer.siteDescription}
        patronage={translations.footer.patronage}
        additionalLogo={
          <Image
            src={'images/osaka_logo.svg'}
            className={'w-full h-auto object-cover'}
            width={257}
            height={150}
            alt={'@Osaka2025'}
            priority={true}
          />
        }
      >
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
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                {section3.cards.map((item: any, index: number) => {
                  return (
                    <div
                      key={`horizontal_card_${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
            <div className={'section pt-8 xl:pt-36 pb-8 xl:pb-24'}>
              <Title level={'h2'} title={section5.titles} />
            </div>
            <div className={'section mt-0 xl:mt-16'}>
              <div className={'grid grid-cols-1 xl:grid-cols-3 gap-4 items-start'}>
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                {section5.cards.map((card: any, index: number) => {
                  return (
                    <Card
                      key={`section5_card_${
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
      </Layout>
    </>
  )
}
