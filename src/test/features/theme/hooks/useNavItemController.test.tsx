import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Nav } from '@/features/theme/components/nav/Nav'
import { useNavItemController } from '@/features/theme/hooks/useNavItemController'

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
  M3eNavItem: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-item" {...props}>
      {children}
    </div>
  ),
}))

const wrapper = ({ children }: { children: React.ReactNode }) => <Nav>{children}</Nav>

describe('useNavItemController', () => {
  it('returns isSelected as true initially when no item has been explicitly selected', () => {
    // Arrange & Act
    const { result } = renderHook(() => useNavItemController({ selected: false }), { wrapper })

    // Assert — both item (Nav state) and m3eNavItemRef.current start as null,
    // so null === null evaluates to true. A real selection would set item to a DOM element.
    expect(result.current.isSelected).toBe(true)
  })

  it('returns a stable onChangeHandler callback', () => {
    // Arrange
    const { result, rerender } = renderHook(() => useNavItemController({ selected: false }), {
      wrapper,
    })
    const firstHandler = result.current.onChangeHandler

    // Act
    rerender()

    // Assert — useCallback should keep the same reference
    expect(result.current.onChangeHandler).toBe(firstHandler)
  })

  it('returns a m3eNavItemRef object', () => {
    // Arrange & Act
    const { result } = renderHook(() => useNavItemController({ selected: false }), { wrapper })

    // Assert
    expect(result.current.m3eNavItemRef).toBeDefined()
    expect(result.current.m3eNavItemRef).toHaveProperty('current')
  })
})

describe('useNavItemController — outside Nav', () => {
  it('throws when called outside a Nav component', () => {
    expect(() => renderHook(() => useNavItemController({ selected: false }))).toThrow(
      'useNav must be used within a Nav component'
    )
  })
})
