# Agent Context - Global Patterns

Single source of truth for cross-feature architecture patterns.
Read this before working on any feature in this repository.

---

## DTO (Data Transfer Object)

**What it is:** A plain TypeScript `type` that mirrors the shape of external data — API responses, JSON files, form input, etc.

**Rules:**
- Always `type`, never `class`
- Field names must match the external source exactly
- Optional fields use `?`
- No transformation logic — DTOs are passive data shapes

**Example:**
```ts
// src/features/profile/dtos/profile.dto.ts
export type ProfileDto = {
  fullName: string
  jobTitle: string
  photoUrl: string
  username?: string
}
```

---

## Model

**What it is:** A `class` with private fields (`#field`) and typed public getters that encapsulates domain logic.

**Why:** Transforms raw DTO data into typed domain objects (e.g. `string` → `URL`), enforces invariants, and keeps components free of transformation logic.

**Rules:**
- Constructor receives a DTO — the only allowed input
- All fields are `readonly #field` (private, immutable)
- Public API is only getters — no setters
- Never accept raw primitives directly in components — always build through a Model
- Use `Nullable<T>` from `@/shared/base.types` for intentionally absent values

**Example:**
```ts
// src/features/profile/models/profile.model.ts
import type { Nullable } from '@/shared/base.types'
import type { ProfileDto } from '../dtos/profile.dto'

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

  get fullName() { return `${this.#firstName} ${this.#lastName}` }
  get jobTitle() { return this.#jobTitle }
  get username(): Nullable<string> { return this.#username }
  get photo(): URL { return this.#photo }
}
```

---

## ViewController (Hook)

**What it is:** A React hook named `useXxxController` that owns all non-trivial component logic.

**Why:** Separates UI (JSX, CSS) from behavior (refs, effects, event handlers, context reads), making both independently testable and readable.

**What it owns:**
- `useRef`, `useCallback`, `useEffect`, `useEffectEvent`
- Context reads (e.g. `useNav()`, `useThemeStore()`)
- Derived state and event handlers
- DOM interaction

**What stays in the component:**
- Conditional CSS class logic
- Slot rendering
- JSX structure

**When to use:** The component uses refs, effects, reads context, or derives computed state from props/context.

**When NOT to use:** Purely presentational component with no hooks beyond styling.

**Naming:** `useXxxController` — matches the component name (e.g. `useNavItemController` for `NavItem`).

**Examples:**
```ts
// ViewController for a UI component
export const useNavItemController = ({ selected }: Props) => {
  const { onSelected, item } = useNav()
  const m3eNavItemRef = useRef<M3eNavItemElement>(null)
  // ...
  return { m3eNavItemRef, isSelected, onChangeHandler }
}

// ViewController for a system concern
export const useThemeController = () => {
  const { theme, setScheme, setColor } = useThemeStore()
  // OS color scheme listener via useEffect + useEffectEvent
  return { theme, setScheme, setColor }
}
```

---

## Compound & Composition Component

**What it is:** A root component that groups related sub-components under a single import, with sub-components registered as properties of the root.

**Why:** Avoids prop drilling, groups related UI semantically, and provides a clean consumer API.

Two variants — choose based on whether sub-components need shared state:

---

### Variant A — With Context

Use when sub-components need to read shared state (model, selection, etc.).

**Structure:**
1. Define `ContextType` and create `createContext<Nullable<ContextType>>(null)`
2. Root component provides value via `Context.Provider`
3. `useXxx()` hook reads context — throws if used outside root
4. Sub-components call `useXxx()` internally — they never receive state by props
5. Register sub-components as `Root.Sub = SubComponent`

**Example:**
```tsx
// src/features/profile/Provider.tsx
const ProfileContext = createContext<Nullable<ProfileContextType>>(null)

export const Profile = ({ children, model }: Props) => (
  <ProfileContext.Provider value={{ model }}>
    {children}
  </ProfileContext.Provider>
)

export const useProfile = (): ProfileContextType => {
  const context = use(ProfileContext)
  if (!context) throw new Error('useProfile must be used within a Profile component')
  return context
}

Profile.Photo = ProfilePhoto   // reads model.photo.href via useProfile()
Profile.Name = ProfileName     // reads model.fullName via useProfile()
Profile.JobTitle = ProfileJobTitle
```

**Other examples:** `Nav` (tracks selected item via context)

---

### Variant B — Without Context

Use when sub-components are independent wrappers that only need namespace grouping — no shared state required.

**Structure:**
1. Root wraps an M3E component, merges base CSS class
2. Sub-components are plain wrappers with M3E `slot` attributes
3. Register sub-components as `Root.Sub = SubComponent`

**Example:**
```tsx
// src/features/theme/components/card/Card.tsx
export const Card = ThemeCard as typeof ThemeCard & {
  Content: typeof ThemeCardContent
  Footer: typeof ThemeCardFooter
  Header: typeof ThemeCardHeader
  Actions: typeof ThemeCardActions
}

Card.Content = ThemeCardContent  // renders <div slot="content">
Card.Footer = ThemeCardFooter    // renders <div slot="footer">
```

**Other examples:** Any future M3E wrapper component with slot-based projection.

**Rule — compound sub-components (incl. `Icon`):**
- Compound sub-components must represent semantically distinct UI pieces (`Card.Header`, `Nav.Group`, etc.).
- For **icons**, sub-components under `Icon` are named by **delivery format** (`Icon.Svg`, future format-specific subs). Do **not** use opaque public names such as `Icon.Slot` or `Icon.Material` for those roles — see [`src/features/theme/components/icon/AGENTS.md`](src/features/theme/components/icon/AGENTS.md).
- **`Theme.Icon`** is the **Facade**: callers use it for a single stable API; it dispatches internally. **Maintenance:** when this rule or the set of documented formats changes, update matching tables or examples in the same PR.

---
