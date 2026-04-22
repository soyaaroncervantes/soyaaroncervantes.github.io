import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/nav-rail', () => ({
  M3eNavRail: ({ children, className, id, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-rail" className={className} id={id} {...props}>
      {children}
    </div>
  ),
  M3eNavRailToggle: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <button data-testid="m3e-nav-rail-toggle" {...props}>
      {children}
    </button>
  ),
}))

import { Nav } from '@/features/theme/components/nav/Nav'
import { NavRail } from '@/features/theme/components/nav/NavRail'
import navStyles from '@/features/theme/components/nav/nav.module.css'

const renderInNav = (id?: string, className?: string) =>
  render(
    <Nav id={id}>
      <NavRail className={className}>rail content</NavRail>
    </Nav>
  )

describe('NavRail', () => {
  it('renders children', () => {
    renderInNav()
    expect(screen.getByText('rail content')).toBeInTheDocument()
  })

  it('applies the base CSS class', () => {
    renderInNav()
    expect(screen.getByTestId('m3e-nav-rail')).toHaveClass(navStyles.base)
  })

  it('merges the base class with an external className', () => {
    renderInNav(undefined, 'page-rail')
    const el = screen.getByTestId('m3e-nav-rail')
    expect(el).toHaveClass(navStyles.base)
    expect(el).toHaveClass('page-rail')
  })

  it('forwards the id from Nav context to the M3E rail', () => {
    renderInNav('my-nav')
    expect(screen.getByTestId('m3e-nav-rail')).toHaveAttribute('id', 'my-nav')
  })
})
