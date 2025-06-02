import { Title } from '@/components/Title'

type HeroProps = {
  content: Array<{
    title: string
    style: string
  }>
}

export const Hero = ({ content }: HeroProps) => {
  return (
    <div
      className={
        'w-full bg-[url(/images/bg1_mobile.png)] xl:bg-[url(/images/bg1.png)] bg-position-[top center] bg-cover bg-no-repeat min-h-[766px] xl:min-h-[1077px] flex items-end xl:items-center justify-center pb-16 xl:pb-0'
      }
    >
      <div className={'flex items-start justify-center h-full section w-full'}>
        <div className={'text-left'}>
          <Title level={'h1'} className={'uppercase'} title={content} />
        </div>
      </div>
    </div>
  )
}
