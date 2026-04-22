import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/nav-rail', () => ({
  M3eNavRail: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-rail" className={className} {...props}>
      {children}
    </div>
  ),
  M3eNavRailToggle: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <button data-testid="m3e-nav-rail-toggle" {...props}>
      {children}
    </button>
  ),
}))

import { NavRailToggle } from '@/features/theme/components/nav/NavRailToggle'

describe('NavRailToggle', () => {
  it('renders children', () => {
    render(<NavRailToggle id="nav-toggle">Toggle</NavRailToggle>)
    expect(screen.getByText('Toggle')).toBeInTheDocument()
  })

  it('forwards additional props to the M3E toggle', () => {
    render(
      <NavRailToggle id="nav-toggle" aria-label="open nav">
        Toggle
      </NavRailToggle>
    )
    expect(screen.getByTestId('m3e-nav-rail-toggle')).toHaveAttribute('aria-label', 'open nav')
  })
})
