import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Nav } from '@/features/theme/components/nav/Nav'
import { useNavItemController } from '@/features/theme/hooks/useNavItemController'

vi.mock('@m3e/react/nav-bar', () => ({
  M3eNavItem: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-nav-item" {...props}>
      {children}
    </div>
  ),
}))

const wrapper = ({ children }: { children: React.ReactNode }) => <Nav>{children}</Nav>

describe('useNavItemController', () => {
  it('returns isSelected as false initially when selected prop is false', () => {
    // Arrange & Act
    const { result } = renderHook(() => useNavItemController({ selected: false }), { wrapper })

    // Assert — ref is null in jsdom (no real DOM nav item), so item !== ref
    expect(result.current.isSelected).toBe(false)
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
