/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Locale, TranslationKey, translations } from './translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => undefined,
  t: (key) => translations.en[key] ?? key,
})

const STORAGE_KEY = 'fastcode-language'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (saved && ['en', 'ru', 'uz', 'kz'].includes(saved)) {
      return saved as Locale
    }
    return 'en'
  })

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translations[locale]?.[key] ?? translations.en[key] ?? key,
    }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

