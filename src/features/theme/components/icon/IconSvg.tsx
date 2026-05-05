import type { SVGAttributes } from 'react'

export type ThemeIconSvgProps = SVGAttributes<SVGSVGElement> & {
  /** Sprite symbol id (fragment in `spriteHref#name`). */
  name: string
  spriteHref?: string
  color?: string
}

export const IconSvg = ({
  name,
  spriteHref = `${import.meta.env.BASE_URL}icons.svg`,
  color = 'currentColor',
  ...rest
}: ThemeIconSvgProps) => {
  const href = `${spriteHref}#${name}`
  return (
    <svg width="1em" height="1em" fill={color} aria-label={`${name} icon`} {...rest}>
      <use href={href} xlinkHref={href} />
    </svg>
  )
}
