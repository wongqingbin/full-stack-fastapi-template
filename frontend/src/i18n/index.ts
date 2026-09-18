import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en"
import zhCN from "./locales/zh-CN"

export const LANGUAGE_STORAGE_KEY = "app-language"
export const supportedLanguages = ["zh-CN", "en"] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

const getInitialLanguage = (): SupportedLanguage => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return supportedLanguages.includes(storedLanguage as SupportedLanguage)
    ? (storedLanguage as SupportedLanguage)
    : "zh-CN"
}

const syncDocumentLanguage = (language: string) => {
  const resolvedLanguage = language === "en" ? "en" : "zh-CN"
  document.documentElement.lang = resolvedLanguage
  localStorage.setItem(LANGUAGE_STORAGE_KEY, resolvedLanguage)
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "zh-CN": { translation: zhCN },
  },
  lng: getInitialLanguage(),
  fallbackLng: "zh-CN",
  supportedLngs: supportedLanguages,
  load: "currentOnly",
  interpolation: {
    escapeValue: false,
  },
})

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language)
i18n.on("languageChanged", syncDocumentLanguage)

export default i18n
