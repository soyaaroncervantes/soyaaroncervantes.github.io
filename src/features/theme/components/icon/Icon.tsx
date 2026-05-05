import type { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps, SVGAttributes } from 'react'
import { M3eMaterialIcon } from './M3eMaterialIcon'
import { isSpriteIcon } from './registry'

/** M3E / library icon only (compound root). */
export type ThemeIconM3eProps = Omit<ComponentProps<typeof M3eIcon>, 'name'> & {
  name: string
  slot?: string
}

export const ThemeIconM3e = ({ name, slot = 'icon', ...props }: ThemeIconM3eProps) => (
  <M3eMaterialIcon name={name} slot={slot} {...props} />
)

export type ThemeIconSvgProps = SVGAttributes<SVGSVGElement> & {
  /** Sprite symbol id (fragment in `spriteHref#name`). */
  name: string
  spriteHref?: string
  color?: string
  slot?: string
}

export const ThemeIconSvg = ({
  name,
  spriteHref = `${import.meta.env.BASE_URL}icons.svg`,
  color,
  slot = 'icon',
  style,
  ...rest
}: ThemeIconSvgProps) => {
  const href = `${spriteHref}#${name}`
  const mergedStyle = color !== undefined && color !== '' ? { ...style, color } : style
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: aria-label / title via props
    <svg slot={slot} width="1em" height="1em" fill="currentColor" {...rest} style={mergedStyle}>
      {/* href: SVG2; xlinkHref helps older WebKit with external sprites in shadow trees */}
      <use href={href} xlinkHref={href} />
    </svg>
  )
}

export const Icon = ThemeIconM3e as typeof ThemeIconM3e & { Svg: typeof ThemeIconSvg }
Icon.Svg = ThemeIconSvg

export type ThemeIconProps = Omit<ComponentProps<typeof M3eIcon>, 'name'> & {
  name: string
  spriteHref?: string
  color?: string
  slot?: string
}

function ThemeIconImpl({
  name,
  spriteHref = `${import.meta.env.BASE_URL}icons.svg`,
  color,
  slot: slotProp,
  ...props
}: ThemeIconProps) {
  const slot = slotProp ?? 'icon'
  if (isSpriteIcon(name)) {
    return <ThemeIconSvg name={name} spriteHref={spriteHref} color={color} slot={slot} {...props} />
  }
  return <ThemeIconM3e name={name} slot={slot} {...props} />
}

export const ThemeIcon = Object.assign(ThemeIconImpl, {
  Svg: Icon.Svg,
}) as typeof ThemeIconImpl & { Svg: typeof ThemeIconSvg }
