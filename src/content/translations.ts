import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import i18nConfig from '@/i18nConfig'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import type { Locale } from '@/types'

export const getTranslations = async (locale: string) => {
  try {
    let selectedLocale = locale as Locale

    if (!i18nConfig.locales.includes(selectedLocale)) {
      selectedLocale = i18nConfig.defaultLocale
    }

    const filePath = path.join('_data', `${selectedLocale}.json`)
    const json = fs.readFileSync(filePath, 'utf8')

    return JSON.parse(json)
  } catch (_e) {
    return undefined
  }
}

export const getHtmlFromMD = async (content: string, processLinks = true): Promise<string> => {
  const result = String(await remark().use(remarkHtml, { sanitize: false }).process(content))

  if (processLinks) {
    return normalizeLinks(result)
  }

  return result
}

export const normalizeLinks = (html: string): string => {
  return html.replace(
    /<a([^>]*)href=['"]((?:https?):\/\/[^'"]*)['"]([^>]*)>(.*?)<\/a>/gi,
    (_match, beforeHref, url, afterHref, linkText) => {
      return `<a${beforeHref} href="${url}" target="_blank"${afterHref}>${linkText}</a>`
    },
  )
}
