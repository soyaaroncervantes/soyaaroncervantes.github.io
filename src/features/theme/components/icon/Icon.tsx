import { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps } from 'react'
import { IconSvg } from './IconSvg'

/** M3E / library icon only (compound root). */
export type IconLibraryProps = ComponentProps<typeof M3eIcon> & {}

const IconLibrary = ({ name, ...props }: IconLibraryProps) => (
  <M3eIcon {...props} name={name} slot="icon" />
)

export const Icon = IconLibrary as typeof IconLibrary & {
  Svg: typeof IconSvg
}

Icon.Svg = IconSvg
