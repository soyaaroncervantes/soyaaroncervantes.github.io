import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockSetScheme = vi.fn()
const mockSetColor = vi.fn()
const mockTheme = 'light'

vi.mock('@/features/theme/theme.stores', () => ({
  useThemeStore: () => ({
    theme: mockTheme,
    setScheme: mockSetScheme,
    setColor: mockSetColor,
  }),
}))

import { useThemeController } from '@/features/theme/hooks/useThemeController'

describe('useThemeController', () => {
  let mockMediaQuery: {
    matches: boolean
    addEventListener: ReturnType<typeof vi.fn>
    removeEventListener: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue(mockMediaQuery),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('returns theme, setScheme, and setColor from the store', () => {
    // Arrange & Act
    const { result } = renderHook(() => useThemeController())

    // Assert
    expect(result.current.theme).toBe('light')
    expect(result.current.setScheme).toBe(mockSetScheme)
    expect(result.current.setColor).toBe(mockSetColor)
  })

  it('registers a change listener on the prefers-color-scheme media query', () => {
    // Arrange & Act
    renderHook(() => useThemeController())

    // Assert
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('removes the change listener on unmount', () => {
    // Arrange
    const { unmount } = renderHook(() => useThemeController())

    // Act
    unmount()

    // Assert
    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
