import { type SpriteIconId, SpriteIconIdList } from './icon-names.generated'

const spriteIconIdSet = new Set<string>(SpriteIconIdList)

export const isSpriteIcon = (name: string): name is SpriteIconId => {
  return spriteIconIdSet.has(name)
}
