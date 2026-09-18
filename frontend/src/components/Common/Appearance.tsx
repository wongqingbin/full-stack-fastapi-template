import { Monitor, Moon, Sun } from "lucide-react"
import { useTranslation } from "react-i18next"

import { type Theme, useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>

const ICON_MAP: Record<Theme, LucideIcon> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
}

export const SidebarAppearance = () => {
  const { isMobile } = useSidebar()
  const { setTheme, theme } = useTheme()
  const { t } = useTranslation()
  const Icon = ICON_MAP[theme]

  return (
    <SidebarMenuItem>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={t("common.appearance")}
            data-testid="theme-button"
          >
            <Icon className="text-muted-foreground" />
            <span>{t("common.appearance")}</span>
            <span className="sr-only">{t("common.toggleTheme")}</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={isMobile ? "top" : "right"}
          align="end"
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              data-testid="light-mode"
              onClick={() => setTheme("light")}
            >
              <Sun />
              {t("common.light")}
            </DropdownMenuItem>
            <DropdownMenuItem
              data-testid="dark-mode"
              onClick={() => setTheme("dark")}
            >
              <Moon />
              {t("common.dark")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor />
              {t("common.system")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

export const Appearance = () => {
  const { setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            data-testid="theme-button"
            variant="outline"
            size="icon"
            aria-label={t("common.toggleTheme")}
          >
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              data-testid="light-mode"
              onClick={() => setTheme("light")}
            >
              <Sun />
              {t("common.light")}
            </DropdownMenuItem>
            <DropdownMenuItem
              data-testid="dark-mode"
              onClick={() => setTheme("dark")}
            >
              <Moon />
              {t("common.dark")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor />
              {t("common.system")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
