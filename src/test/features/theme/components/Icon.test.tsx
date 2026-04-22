import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/icon', () => ({
  M3eIcon: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-icon" {...props}>
      {children}
    </span>
  ),
}))

import { ThemeIcon } from '@/features/theme/components/Icon'

describe('ThemeIcon', () => {
  it('renders children', () => {
    render(<ThemeIcon>person</ThemeIcon>)
    expect(screen.getByText('person')).toBeInTheDocument()
  })

  it('forwards props to the M3E icon', () => {
    render(<ThemeIcon aria-label="user icon">person</ThemeIcon>)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('aria-label', 'user icon')
  })

  it('forwards className prop', () => {
    render(<ThemeIcon className="icon-sm">person</ThemeIcon>)
    expect(screen.getByTestId('m3e-icon')).toHaveClass('icon-sm')
  })
})
