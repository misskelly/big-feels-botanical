import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomePage from './page'

vi.mock('@/lib/gallery', () => ({
  getGalleryImages: vi.fn(async () => [
    {
      id: 'one',
      name: 'peony.jpg',
      url: 'https://storage.googleapis.com/big-feels-botanical.firebasestorage.app/peony.jpg',
      contentType: 'image/jpeg',
    },
    {
      id: 'two',
      name: 'dahlia.jpg',
      url: 'https://storage.googleapis.com/big-feels-botanical.firebasestorage.app/dahlia.jpg',
      contentType: 'image/jpeg',
    },
  ]),
}))

// HomePage is an async server component: resolve it, then render the result.
const renderHomePage = async () => render(await HomePage())

describe('Home Page', () => {
  it('renders the main heading', async () => {
    await renderHomePage()

    expect(
      screen.getByRole('heading', { level: 1, name: /big feels\s*botanical/i }),
    ).toBeInTheDocument()
  })

  it('renders the featured and about sections', async () => {
    await renderHomePage()

    expect(
      screen.getByRole('heading', { level: 2, name: /seasonal arrangements/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /the story/i }),
    ).toBeInTheDocument()
  })

  it('renders one image per gallery item', async () => {
    await renderHomePage()

    expect(screen.getByRole('img', { name: 'peony.jpg' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'dahlia.jpg' })).toBeInTheDocument()
  })

  it('links to pages that exist', async () => {
    await renderHomePage()

    expect(screen.getByRole('link', { name: /our story/i })).toHaveAttribute(
      'href',
      '#about',
    )
    expect(
      screen.getByRole('link', { name: /view the full gallery/i }),
    ).toHaveAttribute('href', '/gallery')
  })
})
