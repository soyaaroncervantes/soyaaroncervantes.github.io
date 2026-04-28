import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useNavbarController } from '../../hooks/useNavbarController'
import { NavItemModel } from '../../models/NavItemModel'
import type { NavbarMap } from '../../types'

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({
    preloadRoute: vi.fn(),
  }),
  useRouterState: () => ({
    location: {
      pathname: '/v1',
    },
  }),
}))

describe('useNavbarController', () => {
  let mockNavigation: NavbarMap

  beforeEach(() => {
    mockNavigation = new Map([
      ['spacer-top', null],
      ['main', new Set([
        new NavItemModel({ id: 'nav-person', icon: 'person', to: '/v1' }),
        new NavItemModel({ id: 'nav-v2', icon: 'email', to: '/v2' }),
      ])],
    ])
  })

  it('transforms Map into entries', () => {
    const { result } = renderHook(() => useNavbarController(mockNavigation))
    
    expect(result.current.navigationEntries).toBeInstanceOf(Array)
    expect(result.current.navigationEntries).toHaveLength(2)
    expect(result.current.navigationEntries[0][0]).toBe('spacer-top')
    expect(result.current.navigationEntries[1][0]).toBe('main')
  })

  it('calculates activeItem based on current route', () => {
    const { result } = renderHook(() => useNavbarController(mockNavigation))
    
    expect(result.current.activeItem).not.toBeNull()
    expect(result.current.activeItem?.to).toBe('/v1')
    expect(result.current.activeItem?.id).toBe('nav-person')
  })

  it('returns null if there is no active route', () => {
    // Mock unregistered route
    vi.mocked(useRouterState).mockReturnValue({
      location: { pathname: '/not-found' },
    } as any)
    
    const { result } = renderHook(() => useNavbarController(mockNavigation))
    expect(result.current.activeItem).toBeNull()
  })

  it('handles spacers correctly (null)', () => {
    const { result } = renderHook(() => useNavbarController(mockNavigation))
    
    const spacerEntry = result.current.navigationEntries.find(([id]) => id === 'spacer-top')
    expect(spacerEntry).toBeDefined()
    expect(spacerEntry?.[1]).toBeNull()
  })

  it('handles empty Sets', () => {
    const emptyNavigation: NavbarMap = new Map([
      ['empty-group', new Set()],
    ])
    
    const { result } = renderHook(() => useNavbarController(emptyNavigation))
    
    expect(result.current.navigationEntries).toHaveLength(1)
    expect(result.current.navigationEntries[0][1]?.size).toBe(0)
  })
})
