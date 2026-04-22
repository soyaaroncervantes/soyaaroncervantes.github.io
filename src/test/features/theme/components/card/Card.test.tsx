import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/card', () => ({
  M3eCard: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-card" className={className} {...props}>
      {children}
    </div>
  ),
}))

import { ThemeCard, Card } from '@/features/theme/components/card/Card'
import cardStyles from '@/features/theme/components/card/card.module.css'

describe('ThemeCard', () => {
  it('renders children', () => {
    render(<ThemeCard>Card body</ThemeCard>)
    expect(screen.getByText('Card body')).toBeInTheDocument()
  })

  it('applies the base CSS class', () => {
    render(<ThemeCard>body</ThemeCard>)
    expect(screen.getByTestId('m3e-card')).toHaveClass(cardStyles.base)
  })

  it('merges the base class with an external className', () => {
    render(<ThemeCard className="page-card">body</ThemeCard>)
    const el = screen.getByTestId('m3e-card')
    expect(el).toHaveClass(cardStyles.base)
    expect(el).toHaveClass('page-card')
  })

  it('forwards additional props', () => {
    render(<ThemeCard aria-label="profile card">body</ThemeCard>)
    expect(screen.getByTestId('m3e-card')).toHaveAttribute('aria-label', 'profile card')
  })
})

describe('Card compound', () => {
  it('exposes Card.Content sub-component', () => {
    expect(Card.Content).toBeDefined()
  })

  it('exposes Card.Footer sub-component', () => {
    expect(Card.Footer).toBeDefined()
  })

  it('exposes Card.Header sub-component', () => {
    expect(Card.Header).toBeDefined()
  })

  it('exposes Card.Actions sub-component', () => {
    expect(Card.Actions).toBeDefined()
  })
})
