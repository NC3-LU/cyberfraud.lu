import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { WithLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type HeaderProps = WithLocale

export const Header = ({ currentLocale }: HeaderProps) => {
  return (
    <div className={'flex justify-between items-center py-4 xl:py-16'}>
      <div className={'w-[190px] h-[60px] xl:w-[300px] xl:h-[95x]'}>
        <Link href='/' className={'w-full h-auto'}>
          <Image
            src={'/images/logo.svg'}
            alt={'Cybersecurity Luxembourg'}
            width={300}
            height={95}
            className={'object-cover w-full h-auto'}
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
