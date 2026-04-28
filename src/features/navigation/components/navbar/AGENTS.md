# Navbar Compound Component

Compound component (Variant A — With Context) that abstracts `Nav` from the theme with typed data.

---

## What it is

`Navbar` is a compound component that:
1. Receives a `NavbarMap` (navigation map)
2. Calculates the active route using TanStack Router
3. Prefetches all routes on mount
4. Renders navigation using theme components (`Nav`)

---

## Context

**`NavbarContextType`:**
```ts
type NavbarContextType = {
  navigation: Array<[groupId: string, itemsSet: Nullable<Set<NavItemModel>>]>
  activeItem: NavItemModel | null
}
```

**Difference from `NavContext` (from theme):**
- **NavContext** (from `Nav`): Handles item selection (which item the user clicked)
- **NavbarContext** (from `Navbar`): Handles navigation (which route is active according to the router)

---

## Sub-components

### `Navbar.Root`

**Props:**
```ts
type NavbarProps = ThemeNavProps & {
  navigation: NavbarMap
}
```

**Responsibilities:**
1. Calls `useNavbarController(navigation)` → `{ navigationEntries, activeItem }`
2. Provides `NavbarContext` with transformed data
3. Wraps `Nav` (reuses `ThemeNavProps`: `id`, `isOpen`)

### `Navbar.Layout`

**Props:**
```ts
type Props = PropsWithChildren & {
  className?: string
  color?: string
}
```

**Responsibilities:**
- Wrapper for `Nav.Rail` + `Nav.Container`
- Allows style overrides per page (v1 vs v2)
- Purely presentational — doesn't access context

### `Navbar.Items`

**Props:**
```ts
type NavbarItemsProps = {
  overrides?: Map<string, ReactNode>
}
```

**Responsibilities:**
1. Reads `NavbarContext` to get `navigation` and `activeItem`
2. Iterates `navigation` (array of entries)
3. For each `groupId`:
   - If override exists → renders the override
   - If `itemsSet === null` → renders spacer (`<Nav.Item disabled />`)
   - If `itemsSet !== null` → renders group with items
4. Each element has unique `key` — React reconciles correctly

**Validations:**
- Empty `navigation` → returns `null`
- Falsy override → returns `null`
- Empty Set → returns `null`

---

## Selective Override

**Without customization:**
```tsx
<Navbar.Items />
```

**With customization:**
```tsx
<Navbar.Items 
  overrides={new Map([
    ['actions', (
      <Nav.Group className="custom">
        <Nav.Item icon="share" />
      </Nav.Group>
    )],
  ])}
/>
```

**How it works:**
- `Navbar.Items` iterates `navigation`
- For each `groupId`, checks if it exists in `overrides`
- If it exists, renders the override; otherwise, renders the default
- **One element per key** — no duplicates

---

## Usage Example

```tsx
import { Navbar } from '@/features/navigation'
import { navigation } from './navigation'

function Page() {
  return (
    <Navbar id="nav" navigation={navigation}>
      <Navbar.Layout className={styles.nav} color="primary">
        <Navbar.Items />
      </Navbar.Layout>
    </Navbar>
  )
}
```
