import { useCallback, useState } from 'react'
import {
  baseLocale,
  getLocale,
  locales,
  setLocale as paraglideSetLocale,
} from '@/paraglide/runtime.js'

export type Locale = (typeof locales)[number]

export type I18nType = {
  locale: Locale
  locales: readonly Locale[]
  baseLocale: Locale
  browserLocale: Locale
  setLocale: (locale: Locale) => void
}

const getBrowserLocale = (): Locale => {
  const browserLang = navigator.language.split('-')[0] as Locale
  return locales.includes(browserLang) ? browserLang : baseLocale
}

export const useI18nController = (): I18nType => {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale() as Locale)

  const setLocale = useCallback((newLocale: Locale) => {
    paraglideSetLocale(newLocale)
    setLocaleState(newLocale)
  }, [])

  return {
    locale,
    locales,
    baseLocale: baseLocale as Locale,
    browserLocale: getBrowserLocale(),
    setLocale,
  }
}
