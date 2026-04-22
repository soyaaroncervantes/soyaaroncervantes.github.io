import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/heading', () => ({
  M3eHeading: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-heading" {...props}>
      {children}
    </span>
  ),
}))

import { ThemeCardHeader } from '@/features/theme/components/card/CardHeader'

describe('ThemeCardHeader', () => {
  it('renders children', () => {
    render(<ThemeCardHeader>Card Title</ThemeCardHeader>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('forwards props to the M3E heading', () => {
    render(<ThemeCardHeader aria-label="card title">Title</ThemeCardHeader>)
    expect(screen.getByTestId('m3e-heading')).toHaveAttribute('aria-label', 'card title')
  })

  it('forwards className prop', () => {
    render(<ThemeCardHeader className="card-title-lg">Title</ThemeCardHeader>)
    expect(screen.getByTestId('m3e-heading')).toHaveClass('card-title-lg')
  })
})
