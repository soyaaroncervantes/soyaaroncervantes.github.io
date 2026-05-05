import { Icon } from './Icon'
import { isSpriteIcon } from './registry'

export type ThemeIconProps = {
  name: string
}

export const ThemeIcon = ({ name }: ThemeIconProps) => {
  if (isSpriteIcon(name)) {
    return <Icon.Svg name={name} />
  }
  return <Icon name={name} />
}
