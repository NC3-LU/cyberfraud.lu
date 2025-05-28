import Image from 'next/image'
import { Title } from '@/components/Title'

type HeroProps = {
  content: Array<{
    title: string
    style: string
  }>
}

export const Hero = ({ content }: HeroProps) => {
  return (
    <div className={'w-full relative'}>
      <div
        className={'absolute z-10 flex items-start justify-center w-full h-full section top-0 bottom-0 left-0  right-0'}
      >
        <div className={'text-left'}>
          <Title level={'h1'} className={'uppercase'} title={content} />
        </div>
      </div>
      <div className={'flex items-center justify-center'}>
        <Image
          src={'/images/bg1.png'}
          alt={'Cyberfraud.lu hero section'}
          width={1920}
          height={1078}
          className={'h-auto'}
        />
      </div>
    </div>
  )
}
