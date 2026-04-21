import type { PropsWithChildren } from 'react'
import { Theme } from '@/features/theme/components'
import type { ThemeTextProps } from '@/features/theme/components/Text'
import { useProfile } from '../Provider'

type Props = PropsWithChildren & ThemeTextProps & {}
export const ProfileName = ({ children, ...props }: Props) => {
  const { model } = useProfile()

  return (
    <Theme.Text variant="headline" size="large" {...props}>
      {children ?? model.fullName}
    </Theme.Text>
  )
}
