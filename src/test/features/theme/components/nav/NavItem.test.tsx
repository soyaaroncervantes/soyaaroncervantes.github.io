import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/nav-menu', () => ({
  M3eNavMenuItemGroup: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-menu-item-group" {...props}>
      {children}
    </div>
  ),
}))

vi.mock('@m3e/react/nav-rail', () => ({
  M3eNavRail: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-rail" {...props}>
      {children}
    </div>
  ),
  M3eNavRailToggle: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <button data-testid="m3e-nav-rail-toggle" {...props}>
      {children}
    </button>
  ),
}))

vi.mock('@m3e/react/nav-bar', () => ({
  M3eNavItem: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-item" className={className} {...props}>
      {children}
    </div>
  ),
}))

import { Nav } from '@/features/theme/components/nav/Nav'
import { NavItem } from '@/features/theme/components/nav/NavItem'
import navStyles from '@/features/theme/components/nav/nav.module.css'

const renderInNav = (props: React.ComponentProps<typeof NavItem> = {}) =>
  render(
    <Nav>
      <NavItem {...props}>Item label</NavItem>
    </Nav>
  )

describe('NavItem', () => {
  it('renders children', () => {
    renderInNav()
    expect(screen.getByText('Item label')).toBeInTheDocument()
  })

  it('applies styles.disabled class when disabled prop is true', () => {
    renderInNav({ disabled: true })
    expect(screen.getByTestId('m3e-nav-item')).toHaveClass(navStyles.disabled)
  })

  it('does not apply styles.disabled when disabled is false', () => {
    renderInNav({ disabled: false })
    expect(screen.getByTestId('m3e-nav-item')).not.toHaveClass(navStyles.disabled)
  })

  it('merges disabled class with external className', () => {
    renderInNav({ disabled: true, className: 'extra' })
    const el = screen.getByTestId('m3e-nav-item')
    expect(el).toHaveClass(navStyles.disabled)
    expect(el).toHaveClass('extra')
  })

  it('forwards icon prop to M3eNavItem', () => {
    renderInNav({ icon: 'person' })
    expect(screen.getByTestId('m3e-nav-item')).toHaveAttribute('icon', 'person')
  })

  it('does not set icon when the icon prop is absent', () => {
    renderInNav()
    expect(screen.getByTestId('m3e-nav-item')).not.toHaveAttribute('icon')
  })
})
