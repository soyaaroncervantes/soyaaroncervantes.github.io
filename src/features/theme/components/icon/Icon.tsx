import { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps } from 'react'
import { isSpriteIcon } from './registry'

export type ThemeIconProps = Omit<ComponentProps<typeof M3eIcon>, 'name'> & {
  name: string
  spriteHref?: string
  color?: string
}

export const ThemeIcon = ({ name, spriteHref = '/icons.svg', color, ...props }: ThemeIconProps) => {
  if (isSpriteIcon(name)) {
    return (
      // biome-ignore lint/a11y/noSvgWithoutTitle: aria-label is forwarded via props
      <svg style={{ color }} {...props}>
        <use href={`${spriteHref}#${name}`} />
      </svg>
    )
  }

  return <M3eIcon {...props} name={name}>{name}</M3eIcon>
}
