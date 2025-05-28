import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { WithLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type HeaderProps = WithLocale

export const Header = ({ currentLocale }: HeaderProps) => {
  return (
    <div className={'flex justify-between items-center py-16'}>
      <div className={'w-[350px] h-[80px]'}>
        <Link href='/'>
          <Image
            src={'/images/cy_logo.svg'}
            alt={'Cybersecurity Luxembourg'}
            width={500}
            height={222}
            className={'object-contain w-full h-auto'}
            priority={true}
          />
        </Link>
      </div>
      <div>
        <LanguageSwitcher currentLocale={currentLocale} />
      </div>
    </div>
  )
}
