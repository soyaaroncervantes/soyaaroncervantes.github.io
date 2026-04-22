import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/button', () => ({
  M3eButton: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <button data-testid="m3e-button" {...props}>
      {children}
    </button>
  ),
}))

import { ThemeButton } from '@/features/theme/components/Button'

describe('ThemeButton', () => {
  it('renders children', () => {
    render(<ThemeButton>Click me</ThemeButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('forwards props to the M3E button', () => {
    render(<ThemeButton aria-label="submit">Submit</ThemeButton>)
    expect(screen.getByTestId('m3e-button')).toHaveAttribute('aria-label', 'submit')
  })

  it('forwards className prop', () => {
    render(<ThemeButton className="primary-btn">Click</ThemeButton>)
    expect(screen.getByTestId('m3e-button')).toHaveClass('primary-btn')
  })
})
