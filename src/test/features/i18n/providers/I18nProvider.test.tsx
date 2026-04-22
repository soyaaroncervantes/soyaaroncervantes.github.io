import { render, renderHook, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/paraglide/runtime.js', () => ({
  baseLocale: 'es',
  locales: ['es', 'en'],
  getLocale: vi.fn().mockReturnValue('es'),
  setLocale: vi.fn(),
}))

import { I18nProvider, useI18n } from '@/features/i18n/providers/I18nProvider'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
)

describe('I18nProvider', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { language: 'en' })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('renders children', () => {
    // Arrange & Act
    render(<I18nProvider>Content</I18nProvider>)

    // Assert
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

describe('useI18n', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { language: 'en' })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('throws when called outside an I18nProvider', () => {
    expect(() => renderHook(() => useI18n())).toThrow('useI18n must be used within an I18nProvider')
  })

  it('returns locale from the controller', () => {
    // Arrange & Act
    const { result } = renderHook(() => useI18n(), { wrapper })

    // Assert
    expect(result.current.locale).toBe('es')
  })

  it('returns the locales array', () => {
    // Arrange & Act
    const { result } = renderHook(() => useI18n(), { wrapper })

    // Assert
    expect(result.current.locales).toEqual(['es', 'en'])
  })

  it('returns baseLocale', () => {
    // Arrange & Act
    const { result } = renderHook(() => useI18n(), { wrapper })

    // Assert
    expect(result.current.baseLocale).toBe('es')
  })

  it('returns browserLocale matching navigator.language', () => {
    // Arrange — navigator.language = 'en' (set in beforeEach)

    // Act
    const { result } = renderHook(() => useI18n(), { wrapper })

    // Assert
    expect(result.current.browserLocale).toBe('en')
  })

  it('returns a callable setLocale function', () => {
    // Arrange & Act
    const { result } = renderHook(() => useI18n(), { wrapper })

    // Assert
    expect(result.current.setLocale).toBeTypeOf('function')
  })
})
