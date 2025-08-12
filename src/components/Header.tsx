import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { WithLocale } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'

type HeaderProps = WithLocale<{ additionalLogo?: React.ReactNode }>

export const Header = ({ currentLocale, additionalLogo }: HeaderProps) => {
  return (
    <div className={'flex justify-between items-center py-2'}>
      <div className={'flex items-center justify-start gap-0'}>
        <div className={'w-[190px] lg:w-[300px]'}>
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
        {additionalLogo ? (
          <>
            <div className={'text-3xl font-primary font-light px-0 pl-14'}>X</div>
            <div className={'w-[190px] lg:w-[300px] m-0 p-0'}>{additionalLogo}</div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        <LanguageSwitcher currentLocale={currentLocale} />
      </div>
    </div>
  )
}
