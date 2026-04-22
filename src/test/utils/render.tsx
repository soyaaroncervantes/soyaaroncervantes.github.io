import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import type { ProfileModel } from '@/features/profile/models/profile.model'
import { Profile } from '@/features/profile/Provider'
import { ProfileMother } from '../mothers/profile.mother'

type Options = {
  model?: ProfileModel
}

export function renderWithProfile(
  ui: ReactElement,
  { model = ProfileMother.valid() }: Options = {}
) {
  return render(<Profile model={model}>{ui}</Profile>)
}
