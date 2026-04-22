import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeCardActions } from '@/features/theme/components/card/CardActions'

describe('ThemeCardActions', () => {
  it('renders children', () => {
    render(<ThemeCardActions>Action buttons</ThemeCardActions>)
    expect(screen.getByText('Action buttons')).toBeInTheDocument()
  })

  it('has slot="actions" attribute', () => {
    const { container } = render(<ThemeCardActions>actions</ThemeCardActions>)
    expect(container.firstChild).toHaveAttribute('slot', 'actions')
  })

  it('forwards className prop', () => {
    const { container } = render(
      <ThemeCardActions className="custom-actions">actions</ThemeCardActions>,
    )
    expect(container.firstChild).toHaveClass('custom-actions')
  })

  it('forwards additional HTML attributes', () => {
    render(<ThemeCardActions data-testid="card-actions">actions</ThemeCardActions>)
    expect(screen.getByTestId('card-actions')).toBeInTheDocument()
  })
})
