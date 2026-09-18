import { AxiosError } from "axios"

import i18n from "@/i18n"

const API_ERROR_KEYS: Record<string, string> = {
  "Incorrect email or password": "errors.api.incorrectCredentials",
  "Invalid token": "errors.api.invalidToken",
  "Inactive user": "errors.api.inactiveUser",
  "The user with this email already exists in the system":
    "errors.api.emailExists",
  "New password cannot be the same as the current one":
    "errors.api.samePassword",
}

const translateErrorMessage = (message: string) => {
  const translationKey = API_ERROR_KEYS[message]
  return translationKey ? i18n.t(translationKey) : message
}

function extractErrorMessage(err: Error): string {
  if (err instanceof AxiosError) {
    const errDetail = (err.response?.data as any)?.detail
    if (Array.isArray(errDetail) && errDetail.length > 0) {
      return translateErrorMessage(errDetail[0].msg)
    }
    if (typeof errDetail === "string") {
      return translateErrorMessage(errDetail)
    }
    return translateErrorMessage(err.message)
  }
  return i18n.t("errors.generic")
}

export const handleError = function (this: (msg: string) => void, err: Error) {
  const errorMessage = extractErrorMessage(err)
  this(errorMessage)
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}
