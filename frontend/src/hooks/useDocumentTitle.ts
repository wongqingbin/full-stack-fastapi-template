import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export const useDocumentTitle = (translationKey: string) => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t(translationKey)
  }, [t, translationKey])
}
