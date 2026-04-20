import type { ProfileDto } from '../dtos/profile.dto'

export class ProfileModel {
  readonly #firstName: string
  readonly #lastName: string
  readonly #jobTitle: string
  readonly #username: string

  constructor({ fullName, jobTitle, username }: ProfileDto) {
    const [firstName, lastName] = fullName.split(' ')
    this.#firstName = firstName
    this.#lastName = lastName
    this.#jobTitle = jobTitle
    this.#username = username
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

  get username() {
    return this.#username
  }
}
