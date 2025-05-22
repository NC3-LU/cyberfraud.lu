import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { WithLocale } from '@/types'
import Image from 'next/image'

type HeaderProps = WithLocale

export const Header = ({ currentLocale }: HeaderProps) => {
  return (
    <div className={'flex justify-around items-center py-16'}>
      <div className={'w-[350px] h-[80px]'}>
        <Image
          src={'/images/cy_logo.svg'}
          alt={'Cybersecurity Luxembourg'}
          width={500}
          height={222}
          className={'object-contain w-full h-auto'}
          priority={true}
        />
      </div>
      <div>
        <LanguageSwitcher currentLocale={currentLocale} />
      </div>
    </div>
  )
}
