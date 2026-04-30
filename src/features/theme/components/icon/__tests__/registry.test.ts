import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { SPRITE_ICON_IDS } from '../registry'

describe('sprite icon registry', () => {
  it('lists every <symbol id> from public/icons.svg', () => {
    const svgPath = resolve(import.meta.dirname, '../../../../../..', 'public/icons.svg')
    const svg = readFileSync(svgPath, 'utf8')
    const idsInFile = [...svg.matchAll(/<symbol[^>]*\bid="([^"]+)"/g)].map((m) => m[1])

    expect(idsInFile.toSorted()).toEqual([...SPRITE_ICON_IDS].toSorted())
  })
})
