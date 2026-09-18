import type { ColumnDef } from "@tanstack/react-table"
import type { TFunction } from "i18next"
import { Check, Copy } from "lucide-react"

import type { ItemPublic } from "@/client"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { cn } from "@/lib/utils"
import { ItemActionsMenu } from "./ItemActionsMenu"

function CopyId({ id, label }: { id: string; label: string }) {
  const [copiedText, copy] = useCopyToClipboard()
  const isCopied = copiedText === id

  return (
    <div className="flex items-center gap-1.5 group">
      <span className="font-mono text-xs text-muted-foreground">{id}</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copy(id)}
        aria-label={label}
      >
        {isCopied ? (
          <Check className="size-3 text-primary" />
        ) : (
          <Copy className="size-3" />
        )}
      </Button>
    </div>
  )
}

export const getColumns = (t: TFunction): ColumnDef<ItemPublic>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <CopyId id={row.original.id} label={t("items.copyId")} />
    ),
  },
  {
    accessorKey: "title",
    header: t("common.title"),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "description",
    header: t("common.description"),
    cell: ({ row }) => {
      const description = row.original.description
      return (
        <span
          className={cn(
            "max-w-xs truncate block text-muted-foreground",
            !description && "italic",
          )}
        >
          {description || t("items.noDescription")}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">{t("common.actions")}</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <ItemActionsMenu item={row.original} />
      </div>
    ),
  },
]
