import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/heading', () => ({
  M3eHeading: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-heading" {...props}>
      {children}
    </span>
  ),
}))

import { ThemeText } from '@/features/theme/components/Text'

describe('ThemeText', () => {
  it('renders children', () => {
    render(<ThemeText>Hello world</ThemeText>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('forwards props to the M3E heading', () => {
    render(<ThemeText aria-label="section title">Title</ThemeText>)
    expect(screen.getByTestId('m3e-heading')).toHaveAttribute('aria-label', 'section title')
  })

  it('forwards className prop', () => {
    render(<ThemeText className="headline-lg">Title</ThemeText>)
    expect(screen.getByTestId('m3e-heading')).toHaveClass('headline-lg')
  })
})
