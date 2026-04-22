import { render, renderHook, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/nav-bar', () => ({
  M3eNavItem: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-item" {...props}>
      {children}
    </div>
  ),
}))

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

import { Nav, useNav } from '@/features/theme/components/nav/Nav'

describe('Nav', () => {
  it('renders children', () => {
    render(<Nav>Nav content</Nav>)
    expect(screen.getByText('Nav content')).toBeInTheDocument()
  })

  it('exposes Nav.Rail sub-component', () => {
    expect(Nav.Rail).toBeDefined()
  })

  it('exposes Nav.Item sub-component', () => {
    expect(Nav.Item).toBeDefined()
  })

  it('exposes Nav.Toggle sub-component', () => {
    expect(Nav.Toggle).toBeDefined()
  })

  it('exposes Nav.Group sub-component', () => {
    expect(Nav.Group).toBeDefined()
  })

  it('exposes Nav.Container sub-component', () => {
    expect(Nav.Container).toBeDefined()
  })
})

describe('useNav', () => {
  it('throws when called outside a Nav component', () => {
    // Arrange & Act & Assert
    expect(() => renderHook(() => useNav())).toThrow('useNav must be used within a Nav component')
  })

  it('returns context values when called inside a Nav', () => {
    // Arrange
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Nav id="main-nav">{children}</Nav>
    )

    // Act
    const { result } = renderHook(() => useNav(), { wrapper })

    // Assert
    expect(result.current.id).toBe('main-nav')
    expect(result.current.item).toBeNull()
  })
})
