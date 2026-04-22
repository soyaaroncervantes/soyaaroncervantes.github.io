import type { ProfileDto } from '@/features/profile/dtos/profile.dto'
import { ProfileModel } from '@/features/profile/models/profile.model'

const base: ProfileDto = {
  fullName: 'Test User',
  jobTitle: 'Engineer',
  photoUrl: 'https://example.com/photo.jpg',
}

// biome-ignore lint/complexity/noStaticOnlyClass: Object Mother pattern — intentional per src/test/AGENTS.md
export class ProfileMother {
  static valid(): ProfileModel {
    return new ProfileModel(base)
  }

  static withoutUsername(): ProfileModel {
    return new ProfileModel({ ...base, username: undefined })
  }

  static withUsername(username: string): ProfileModel {
    return new ProfileModel({ ...base, username })
  }

  static withFullName(fullName: string): ProfileModel {
    return new ProfileModel({ ...base, fullName })
  }

  static withJobTitle(jobTitle: string): ProfileModel {
    return new ProfileModel({ ...base, jobTitle })
  }
}
