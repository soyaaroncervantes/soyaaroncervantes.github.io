import type { HTMLAttributes } from 'react'
import { useProfile } from '../Provider'

type Props = HTMLAttributes<HTMLImageElement>

export const ProfilePhoto = ({ ...props }: Props) => {
  const { model } = useProfile()

  return <img src={model.photo.href} alt={model.fullName} {...props} />
}
