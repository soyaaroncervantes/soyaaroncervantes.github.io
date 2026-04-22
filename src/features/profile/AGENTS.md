# Agent Context — Profile Feature

> **Global patterns reference:** See `src/AGENTS.md` for DTO, Model, and Compound component (Variant A — With Context) pattern definitions.

The `profile` feature provides the user's profile data and the UI components to display it across all portfolio pages.

---

## Feature Structure

```
src/features/profile/
  dtos/
    profile.dto.ts        — ProfileDto type
  models/
    profile.model.ts      — ProfileModel class
    user.model.ts         — Concrete userModel instance (Aarón Cervantes)
  components/
    Name.tsx              — Profile.Name sub-component
    JobTitle.tsx          — Profile.JobTitle sub-component
    Photo.tsx             — Profile.Photo sub-component
  Provider.tsx            — Root compound + ProfileContext + useProfile()
```

---

## DTO: `ProfileDto`

```ts
// src/features/profile/dtos/profile.dto.ts
export type ProfileDto = {
  fullName: string
  jobTitle: string
  photoUrl: string
  username?: string  // optional — Nullable<string> in the model
}
```

- `fullName` is a single string split into `firstName` + `lastName` by the model constructor
- `photoUrl` is a plain `string` in the DTO — transformed to `URL` in the model
- `username` is optional — if absent, the model stores `null`

---

## Model: `ProfileModel`

```ts
// src/features/profile/models/profile.model.ts
export class ProfileModel {
  readonly #firstName: string
  readonly #lastName: string
  readonly #jobTitle: string
  readonly #username: Nullable<string>
  readonly #photo: URL

  constructor({ fullName, jobTitle, username, photoUrl }: ProfileDto) {
    const [firstName, lastName] = fullName.split(' ')
    this.#firstName = firstName
    this.#lastName = lastName
    this.#jobTitle = jobTitle
    this.#username = username ?? null
    this.#photo = new URL(photoUrl)
  }

  get fullName()               // "Aarón Cervantes"
  get name()                   // "Aarón" (first name only)
  get lastName()               // "Cervantes"
  get jobTitle()               // "Senior Frontend Engineer"
  get username(): Nullable<string>  // "@soyaaroncervantes" | null
  get photo(): URL             // URL object — use .href for <img src>
}
```

**Why `#photo` is `URL` and not `string`:**
The `URL` object validates the URL at construction time and makes the intent explicit. Sub-components use `model.photo.href` when they need the string value.

---

## Concrete Instance: `userModel`

```ts
// src/features/profile/models/user.model.ts
export const userModel = new ProfileModel({
  fullName: 'Aarón Cervantes',
  jobTitle: 'Senior Frontend Engineer',
  username: '@soyaaroncervantes',
  photoUrl: 'https://...',
})
```

- This is the single source of truth for the user's profile data in the application
- Imported and passed to `<Profile model={userModel}>` in page components
- **Never hardcode profile values in components** — always use `userModel`

---

## Compound Component: `Profile`

Root compound with Context (Variant A). Sub-components access the model via `useProfile()`.

```tsx
// src/features/profile/Provider.tsx
export type ProfileContextType = { model: ProfileModel }

const ProfileContext = createContext<Nullable<ProfileContextType>>(null)

export const Profile = ({ children, model }: Props) => (
  <ProfileContext.Provider value={{ model }}>{children}</ProfileContext.Provider>
)

export const useProfile = (): ProfileContextType => {
  const context = use(ProfileContext)
  if (!context) throw new Error('useProfile must be used within a Profile component')
  return context
}

Profile.Photo    = ProfilePhoto    // renders <img src={model.photo.href} alt={model.fullName} />
Profile.Name     = ProfileName     // renders model.fullName via Theme.Text
Profile.JobTitle = ProfileJobTitle // renders model.jobTitle via Theme.Text
```

**Sub-components never receive the model by props** — they call `useProfile()` internally.

---

## Data Flow

```
ProfileDto
  └─ ProfileModel constructor
       └─ userModel instance (user.model.ts)
            └─ <Profile model={userModel}>   ← passes model into context
                 ├─ <Profile.Photo />        ← reads model.photo.href via useProfile()
                 ├─ <Profile.Name />         ← reads model.fullName via useProfile()
                 └─ <Profile.JobTitle />     ← reads model.jobTitle via useProfile()
```

---

## Usage Example

```tsx
import { Profile } from '@/features/profile/Provider'
import { userModel } from '@/features/profile/models/user.model'

<Profile model={userModel}>
  <Profile.Photo />
  <Profile.Name />
  <Profile.JobTitle />
</Profile>
```
