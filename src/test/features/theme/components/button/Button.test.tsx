import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/button', () => ({
  M3eButton: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <button data-testid="m3e-button" {...props}>
      {children}
    </button>
  ),
}))

import { Button } from '@/features/theme/components/button/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('forwards props to the M3E button', () => {
    render(<Button aria-label="submit">Submit</Button>)
    expect(screen.getByTestId('m3e-button')).toHaveAttribute('aria-label', 'submit')
  })

  it('forwards className prop', () => {
    render(<Button className="primary-btn">Click</Button>)
    expect(screen.getByTestId('m3e-button')).toHaveClass('primary-btn')
  })
})
