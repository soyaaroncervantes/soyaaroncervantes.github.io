import type { PropsWithChildren } from 'react'
import { createContext, use } from 'react'
import type { Nullable } from '@/shared/base.types'
import { ProfileJobTitle } from './components/JobTitle'
import { ProfileName } from './components/Name'
import { ProfilePhoto } from './components/Photo'
import type { ProfileModel } from './models/profile.model'

export type ProfileContextType = {
  model: ProfileModel
}

const ProfileContext = createContext<Nullable<ProfileContextType>>(null)

type Props = PropsWithChildren & {
  model: ProfileModel
}

export const Profile = ({ children, model }: Props) => (
  <ProfileContext.Provider value={{ model }}>{children}</ProfileContext.Provider>
)

export const useProfile = (): ProfileContextType => {
  const context = use(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a Profile component')
  }
  return context
}

Profile.Photo = ProfilePhoto
Profile.Name = ProfileName
Profile.JobTitle = ProfileJobTitle
