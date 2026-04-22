import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { mockSetLocale, mockGetLocale } = vi.hoisted(() => ({
  mockSetLocale: vi.fn(),
  mockGetLocale: vi.fn().mockReturnValue('es'),
}))

vi.mock('@/paraglide/runtime.js', () => ({
  baseLocale: 'es',
  locales: ['es', 'en'],
  getLocale: mockGetLocale,
  setLocale: mockSetLocale,
}))

import { useI18nController } from '@/features/i18n/hooks/useI18nController'

describe('useI18nController', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { language: 'en' })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('returns the locale from getLocale()', () => {
    // Arrange & Act
    const { result } = renderHook(() => useI18nController())

    // Assert
    expect(result.current.locale).toBe('es')
  })

  it('returns the locales array', () => {
    // Arrange & Act
    const { result } = renderHook(() => useI18nController())

    // Assert
    expect(result.current.locales).toEqual(['es', 'en'])
  })

  it('returns baseLocale', () => {
    // Arrange & Act
    const { result } = renderHook(() => useI18nController())

    // Assert
    expect(result.current.baseLocale).toBe('es')
  })

  it('returns browserLocale matching navigator.language when it is a valid locale', () => {
    // Arrange — navigator.language = 'en' (set in beforeEach)

    // Act
    const { result } = renderHook(() => useI18nController())

    // Assert
    expect(result.current.browserLocale).toBe('en')
  })

  it('falls back to baseLocale when navigator.language is not a supported locale', () => {
    // Arrange
    vi.stubGlobal('navigator', { language: 'fr' })

    // Act
    const { result } = renderHook(() => useI18nController())

    // Assert
    expect(result.current.browserLocale).toBe('es')
  })

  it('calls paraglide setLocale with the new locale', () => {
    // Arrange
    const { result } = renderHook(() => useI18nController())

    // Act
    act(() => {
      result.current.setLocale('en')
    })

    // Assert
    expect(mockSetLocale).toHaveBeenCalledWith('en')
  })

  it('updates the locale state after setLocale is called', () => {
    // Arrange
    const { result } = renderHook(() => useI18nController())

    // Act
    act(() => {
      result.current.setLocale('en')
    })

    // Assert
    expect(result.current.locale).toBe('en')
  })

  it('returns a stable setLocale reference across re-renders', () => {
    // Arrange
    const { result, rerender } = renderHook(() => useI18nController())
    const firstSetLocale = result.current.setLocale

    // Act
    rerender()

    // Assert
    expect(result.current.setLocale).toBe(firstSetLocale)
  })
})
