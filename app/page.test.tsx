import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Page from './page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', {
      name: /big feels botanical/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the welcome message', () => {
    render(<Page />)

    const message = screen.getByText(/pretty things coming soon!/i)
    expect(message).toBeInTheDocument()
  })

  it('renders the heading with correct styling classes', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', {
      name: /big feels botanical/i,
    })
    expect(heading).toHaveClass('mb-8', 'text-2xl', 'font-semibold')
  })
})
