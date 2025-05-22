import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import i18nConfig from '@/i18nConfig'

export const getTranslations = async (locale: string) => {
  let selectedLocale = locale

  if (!i18nConfig.locales.includes(locale)) {
    selectedLocale = i18nConfig.defaultLocale
  }

  const filePath = path.join('_data', `${selectedLocale}.json`)
  const json = fs.readFileSync(filePath, 'utf8')

  return JSON.parse(json)
}
