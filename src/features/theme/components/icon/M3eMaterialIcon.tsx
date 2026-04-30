import { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps } from 'react'
import { useLayoutEffect, useRef } from 'react'

/**
 * Material-only icon for M3E nav slots. Bypasses `Theme.Icon` sprite dispatch.
 *
 * `m3e-icon` paints from the Lit `name` property in shadow DOM; @lit/react can
 * leave it unset with React 19 — sync after mount/update.
 */
export type M3eMaterialIconProps = Omit<ComponentProps<typeof M3eIcon>, 'name'> & {
  name: string
}

export const M3eMaterialIcon = ({ name, ...props }: M3eMaterialIconProps) => {
  const ref = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    Object.assign(el, { name })
  }, [name])

  return <M3eIcon ref={ref} {...props} name={name} />
}
