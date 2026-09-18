import { expect, test } from "@playwright/test"

test.use({ storageState: { cookies: [], origins: [] } })

test("defaults to Chinese and persists the selected language", async ({
  page,
}) => {
  await page.goto("/login")

  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN")
  await expect(page.getByRole("heading", { name: "登录账户" })).toBeVisible()

  await page.getByTestId("language-button").click()
  await page.getByTestId("language-en").click()

  await expect(page.locator("html")).toHaveAttribute("lang", "en")
  await expect(
    page.getByRole("heading", { name: "Login to your account" }),
  ).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("app-language")))
    .toBe("en")

  await page.reload()

  await expect(page.locator("html")).toHaveAttribute("lang", "en")
  await expect(
    page.getByRole("heading", { name: "Login to your account" }),
  ).toBeVisible()
})
