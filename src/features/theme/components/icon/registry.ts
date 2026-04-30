/**
 * IDs of `<symbol id="…">` in `public/icons.svg`.
 * When you add a symbol, append its id here (keeps runtime independent of Vite codegen timing).
 */
export const SPRITE_ICON_IDS = ['github', 'linkedin'] as const

export type SpriteIconId = (typeof SPRITE_ICON_IDS)[number]

const spriteIconIdSet = new Set<string>(SPRITE_ICON_IDS)

export const isSpriteIcon = (name: string): name is SpriteIconId => {
  return spriteIconIdSet.has(name)
}
