import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/icon', () => ({
  M3eIcon: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-icon" {...props}>
      {children}
    </span>
  ),
}))

import { Icon } from '@/features/theme/components/icon/Icon'

describe('Icon', () => {
  it('renders children', () => {
    render(<Icon>person</Icon>)
    expect(screen.getByText('person')).toBeInTheDocument()
  })

  it('forwards props to the M3E icon', () => {
    render(<Icon aria-label="user icon">person</Icon>)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('aria-label', 'user icon')
  })

  it('forwards className prop', () => {
    render(<Icon className="icon-sm">person</Icon>)
    expect(screen.getByTestId('m3e-icon')).toHaveClass('icon-sm')
  })

  it('exposes Svg sub-component', () => {
    expect(Icon.Svg).toBeDefined()
  })
})
