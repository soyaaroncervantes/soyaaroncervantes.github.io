import type { PropsWithChildren } from 'react'
import { Theme } from '../theme/components'
import type { ThemeTextProps } from '../theme/components/Text'

type Props = PropsWithChildren & ThemeTextProps & {}
export const ProfileJobTitle = ({ children, ...props }: Props) => {
  return (
    <Theme.Text variant="headline" size="large" {...props}>
      {children ?? 'Senior Frontend Engineer'}
    </Theme.Text>
  )
}
