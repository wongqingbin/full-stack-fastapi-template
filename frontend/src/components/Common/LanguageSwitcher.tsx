import { Languages } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { SupportedLanguage } from "@/i18n"

const normalizeLanguage = (language: string): SupportedLanguage =>
  language === "en" ? "en" : "zh-CN"

const useLanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)

  const changeLanguage = (value: string) => {
    void i18n.changeLanguage(normalizeLanguage(value))
  }

  return { changeLanguage, language, t }
}

const LanguageOptions = () => {
  const { changeLanguage, language, t } = useLanguageSwitcher()

  return (
    <DropdownMenuRadioGroup value={language} onValueChange={changeLanguage}>
      <DropdownMenuRadioItem value="zh-CN" data-testid="language-zh-CN">
        {t("common.simplifiedChinese")}
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="en" data-testid="language-en">
        {t("common.english")}
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  )
}

export const SidebarLanguageSwitcher = () => {
  const { isMobile } = useSidebar()
  const { t } = useTranslation()

  return (
    <SidebarMenuItem>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={t("common.language")}
            data-testid="language-button"
          >
            <Languages className="text-muted-foreground" />
            <span>{t("common.language")}</span>
            <span className="sr-only">{t("common.languageSwitcher")}</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={isMobile ? "top" : "right"}
          align="end"
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        >
          <DropdownMenuLabel>{t("common.language")}</DropdownMenuLabel>
          <LanguageOptions />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

export const LanguageSwitcher = () => {
  const { t } = useTranslation()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="language-button"
          variant="outline"
          size="icon"
          aria-label={t("common.languageSwitcher")}
        >
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("common.language")}</DropdownMenuLabel>
        <LanguageOptions />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
