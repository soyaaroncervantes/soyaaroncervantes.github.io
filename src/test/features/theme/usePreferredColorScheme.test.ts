import { afterEach, describe, expect, it, vi } from 'vitest'
import { getPreferredColorScheme } from '@/features/theme/usePreferredColorScheme'

describe('getPreferredColorScheme', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns "dark" when the OS prefers dark color scheme', () => {
    // Arrange
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))

    // Act
    const result = getPreferredColorScheme()

    // Assert
    expect(result).toBe('dark')
  })

  it('returns "light" when the OS does not prefer dark color scheme', () => {
    // Arrange
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))

    // Act
    const result = getPreferredColorScheme()

    // Assert
    expect(result).toBe('light')
  })

  it('queries the correct media feature', () => {
    // Arrange
    const mockMatchMedia = vi.fn().mockReturnValue({ matches: false })
    vi.stubGlobal('matchMedia', mockMatchMedia)

    // Act
    getPreferredColorScheme()

    // Assert
    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
  })
})
