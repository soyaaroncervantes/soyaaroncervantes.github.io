import type { Nullable } from '@/shared/base.types'
import type { ProfileDto } from '../dtos/profile.dto'

export class ProfileModel {
  readonly #firstName: string
  readonly #lastName: string
  readonly #jobTitle: string
  readonly #username: Nullable<string> = null
  readonly #photo: URL

  constructor({ fullName, jobTitle, username, photoUrl }: ProfileDto) {
    const [firstName, lastName] = fullName.split(' ')
    this.#firstName = firstName
    this.#lastName = lastName
    this.#jobTitle = jobTitle
    this.#username = username ?? null
    this.#photo = new URL(photoUrl)
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`
  }

  get name() {
    return this.#firstName
  }

  get lastName() {
    return this.#lastName
  }

  get jobTitle() {
    return this.#jobTitle
  }

  get username(): Nullable<string> {
    return this.#username
  }

  get photo(): URL {
    return this.#photo
  }
}
