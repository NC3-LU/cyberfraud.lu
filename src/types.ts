import type i18nConfig from '@/i18nConfig'

export type Locale = (typeof i18nConfig.locales)[number]

export type WithLocale<T = unknown> = {
  currentLocale: (typeof i18nConfig.locales)[number]
} & T
