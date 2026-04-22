import { describe, expect, it } from 'vitest'
import { Layout } from '@/core/layouts/Layout'

describe('Layout', () => {
  it('exposes Layout.Base sub-component', () => {
    expect(Layout.Base).toBeDefined()
  })

  it('exposes Layout.Screen sub-component', () => {
    expect(Layout.Screen).toBeDefined()
  })

  it('exposes Layout.Content sub-component', () => {
    expect(Layout.Content).toBeDefined()
  })
})
