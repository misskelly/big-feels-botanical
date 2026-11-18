import { test, expect } from '@playwright/test'

test('homepage loads and displays heading', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { level: 1, name: 'Big Feels Botanical' }),
  ).toBeVisible()
})

test('homepage displays the featured and about sections', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Seasonal Arrangements' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The Story' })).toBeVisible()
})

test('nav links to the gallery', async ({ page }) => {
  await page.goto('/')

  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'gallery' })
    .click()

  await expect(page).toHaveURL(/\/gallery$/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Gallery' }),
  ).toBeVisible()
})

test('footer links to the privacy policy', async ({ page }) => {
  await page.goto('/')

  await page
    .getByRole('navigation', { name: 'Footer' })
    .getByRole('link', { name: 'Privacy Policy' })
    .click()

  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Policy' }),
  ).toBeVisible()
})
