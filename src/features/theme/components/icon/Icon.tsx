import { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { isSpriteIcon } from './registry'

export type ThemeIconProps = Omit<ComponentProps<typeof M3eIcon>, 'name'> & {
  name: string
  spriteHref?: string
  color?: string
}

export const ThemeIcon = ({ name, spriteHref = '/icons.svg', color, ...props }: ThemeIconProps) => {
  const materialRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = materialRef.current
    if (!el) return
    // `m3e-icon` paints from the Lit `name` property inside its shadow tree, not from light-DOM children.
    // With React 19, @lit/react can leave `name` unset on the element; sync after mount/updates.
    Object.assign(el, { name })
  }, [name])

  if (isSpriteIcon(name)) {
    return (
      // biome-ignore lint/a11y/noSvgWithoutTitle: aria-label is forwarded via props
      <svg style={{ color }} {...props}>
        <use href={`${spriteHref}#${name}`} />
      </svg>
    )
  }

  return <M3eIcon ref={materialRef} {...props} name={name} />
}
