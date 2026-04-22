import type { PropsWithChildren } from 'react'
import { Theme } from '@/features/theme/components'
import type { ThemeTextProps } from '@/features/theme/components/Text'
import { useProfile } from '../Provider'

type Props = PropsWithChildren & ThemeTextProps & {}
export const ProfileJobTitle = ({ children, ...props }: Props) => {
  const { model } = useProfile()

  return (
    <Theme.Text variant="title" {...props}>
      {children ?? model.jobTitle}
    </Theme.Text>
  )
}
