import { render, renderHook, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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
