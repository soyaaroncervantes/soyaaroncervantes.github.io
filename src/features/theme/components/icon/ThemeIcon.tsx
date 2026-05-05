import { Icon } from './Icon'
import { isSpriteIcon } from './registry'

export type ThemeIconProps = {
  name: string
  className?: string
}

export const ThemeIcon = ({ name, className }: ThemeIconProps) => {
  if (isSpriteIcon(name)) {
    return <Icon.Svg name={name} className={className} />
  }
  return <Icon name={name} />
}
