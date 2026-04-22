import type { SVGAttributes } from 'react'

type Props = SVGAttributes<SVGSVGElement> & {
  id: string
  href?: string
  color?: string
}

export const ThemeSvg = ({ id, href = '/icons.svg', color, ...props }: Props) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: aria-label is passed via props
    <svg style={{ color }} {...props}>
      <use href={`${href}#${id}`} />
    </svg>
  )
}
