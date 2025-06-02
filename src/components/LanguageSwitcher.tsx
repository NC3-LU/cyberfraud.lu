'use client'

import i18nConfig from '@/i18nConfig'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import Link from 'next/link'

type LanguageSwitcherProps = {
  currentLocale: string
}

export const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
  const locales = i18nConfig.locales
  return (
    <Listbox value={currentLocale}>
      <ListboxButton className={'font-secondary cursor-pointer p-3 text-2xl text-white bg-secondary'}>
        {currentLocale.toUpperCase()}
      </ListboxButton>
      <ListboxOptions
        transition={true}
        anchor={'bottom start'}
        className={
          'bg-secondary text-white text-2xl font-secondary w-(--button-width) text-center origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0'
        }
      >
        {locales
          .filter((l) => l !== currentLocale)
          .map((locale) => (
            <ListboxOption key={locale} value={locale} className={'py-2'}>
              <Link href={`/${locale}`}>{locale.toLocaleUpperCase()}</Link>
            </ListboxOption>
          ))}
      </ListboxOptions>
    </Listbox>
  )
}
