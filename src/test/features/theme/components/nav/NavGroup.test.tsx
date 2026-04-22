import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/nav-menu', () => ({
  M3eNavMenuItemGroup: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-group" className={className} {...props}>
      {children}
    </div>
  ),
}))

import { NavGroup } from '@/features/theme/components/nav/NavGroup'
import styles from '@/features/theme/components/nav/nav.module.css'

describe('NavGroup', () => {
  it('renders children', () => {
    render(<NavGroup>Nav group items</NavGroup>)
    expect(screen.getByText('Nav group items')).toBeInTheDocument()
  })

  it('applies the base group CSS class', () => {
    render(<NavGroup>items</NavGroup>)
    expect(screen.getByTestId('m3e-nav-group')).toHaveClass(styles.group)
  })

  it('merges the base class with an external className', () => {
    render(<NavGroup className="page-group">items</NavGroup>)
    const el = screen.getByTestId('m3e-nav-group')
    expect(el).toHaveClass(styles.group)
    expect(el).toHaveClass('page-group')
  })

  it('forwards additional props', () => {
    render(<NavGroup aria-label="main group">items</NavGroup>)
    expect(screen.getByTestId('m3e-nav-group')).toHaveAttribute('aria-label', 'main group')
  })
})
