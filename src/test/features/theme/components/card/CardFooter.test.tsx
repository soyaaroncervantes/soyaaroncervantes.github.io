import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeCardFooter } from '@/features/theme/components/card/CardFooter'

describe('ThemeCardFooter', () => {
  it('renders children', () => {
    render(<ThemeCardFooter>Footer content</ThemeCardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('has slot="footer" attribute', () => {
    const { container } = render(<ThemeCardFooter>footer</ThemeCardFooter>)
    expect(container.firstChild).toHaveAttribute('slot', 'footer')
  })

  it('forwards className prop', () => {
    const { container } = render(
      <ThemeCardFooter className="custom-footer">footer</ThemeCardFooter>
    )
    expect(container.firstChild).toHaveClass('custom-footer')
  })

  it('forwards additional HTML attributes', () => {
    render(<ThemeCardFooter data-testid="card-footer">footer</ThemeCardFooter>)
    expect(screen.getByTestId('card-footer')).toBeInTheDocument()
  })
})
