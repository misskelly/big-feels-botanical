import { test, expect } from '@playwright/test'

test('homepage loads and displays heading', async ({ page }) => {
  await page.goto('/')

  // Check that the main heading is visible
  await expect(
    page.getByRole('heading', { name: 'Big Feels Botanical' }),
  ).toBeVisible()
})

test('homepage displays welcome message', async ({ page }) => {
  await page.goto('/')

  // Check that the welcome message is present
  await expect(page.getByText('Pretty things coming soon!')).toBeVisible()
})
