import type { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps } from 'react'
import { M3eMaterialIcon } from './M3eMaterialIcon'
import { isSpriteIcon } from './registry'

export type ThemeIconProps = Omit<ComponentProps<typeof M3eIcon>, 'name'> & {
  name: string
  spriteHref?: string
  color?: string
}

export const ThemeIcon = ({
  name,
  spriteHref = `${import.meta.env.BASE_URL}icons.svg`,
  color,
  ...props
}: ThemeIconProps) => {
  if (isSpriteIcon(name)) {
    const href = `${spriteHref}#${name}`
    return (
      // biome-ignore lint/a11y/noSvgWithoutTitle: aria-label is forwarded via props
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        style={{ color, display: 'block' }}
        {...props}
      >
        {/* href: SVG2; xlinkHref helps older WebKit with external sprites in shadow trees */}
        <use href={href} xlinkHref={href} />
      </svg>
    )
  }

  return <M3eMaterialIcon {...props} name={name} />
}
