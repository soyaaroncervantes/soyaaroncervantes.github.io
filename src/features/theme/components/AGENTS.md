# Agent Context — Theme Components

> **Global patterns reference:** See `src/AGENTS.md` for DTO, Model, ViewController, and Compound component pattern definitions.

This document provides component-level conventions for `src/features/theme/components/`.

---

## Component Types

Components in this directory are one of three types:

1. **Simple M3E wrapper** — thin wrapper around a single `@m3e/react/*` component (e.g., `Text.tsx`)
2. **Compound without Context** — root component + independent sub-components grouped under a namespace (e.g., `Card`, `Button`)
3. **Compound with Context** — root component + context-aware sub-components that share state (e.g., `Nav`)

---

## Patterns

### 1. Wrapping an M3E Component

Use `ComponentProps<typeof M3eXxx>` to inherit all props from the M3E component, then spread with `...props`.

```tsx
import { M3eButton } from '@m3e/react/button'
import type { ComponentProps, PropsWithChildren } from 'react'

type Props = PropsWithChildren & ComponentProps<typeof M3eButton>

export const ThemeButton = ({ children, ...props }: Props) => {
  return <M3eButton {...props}>{children}</M3eButton>
}
```

**Key rules:**
- Always spread `...props` onto the M3E component so all native props are forwarded
- Explicitly extract only the props you need to handle (`children`, `className`, `disabled`, etc.)
- Do not re-declare props already covered by `ComponentProps<typeof M3eXxx>`

---

### 2. Wrapping a Native HTML Element

Use `HTMLAttributes<HTMLElement>` to inherit all standard HTML props.

```tsx
import type { HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const NavContainer = ({ children, ...props }: Props) => {
  return <div {...props}>{children}</div>
}
```

**Key rules:**
- Use the specific element type: `HTMLDivElement`, `HTMLSpanElement`, `HTMLButtonElement`, etc.
- Spread `...props` so all HTML attributes (including `id`, `aria-*`, `data-*`) are forwarded

---

### 3. Base Class + className Override

When a component has a base CSS class and should also accept external class overrides:

```tsx
import styles from './component.module.css'

export const NavRail = ({ children, className, ...props }: Props) => (
  <M3eNavRail
    {...props}
    className={[styles.nav, styles.rail, className].filter(Boolean).join(' ')}
  >
    {children}
  </M3eNavRail>
)
```

**Rules:**
- Base classes come **first** — they define default layout and structure
- `className` from props comes **last** — page-level overrides win via CSS cascade
- Use `filter(Boolean)` to safely remove `undefined` and `false` values

---

### 4. Conditional Classes Based on Props

When a prop should toggle a CSS class automatically (UI concern — stays in the component, not the hook):

```tsx
const resolvedClassName = [disabled && styles.disabled, className].filter(Boolean).join(' ') || undefined
```

**Rules:**
- Use boolean short-circuit: `condition && styles.class`
- Chain multiple conditions in the same array: `[condition1 && styles.a, condition2 && styles.b, className]`
- Assign `|| undefined` at the end to avoid passing an empty string to `className`
- This logic lives in the **component**, not in a ViewController hook — it directly determines visual output

---

### 5. Type Registration Pattern (for Compounds)

When creating a compound component, register sub-components as properties using TypeScript's `as` operator with intersection types.

```tsx
// Root component
export const ThemeCard = ({ children, ...props }: ThemeCardProps) => (
  <M3eCard {...props}>{children}</M3eCard>
)

// Type registration: cast root to itself + object with sub-component types
export const Card = ThemeCard as typeof ThemeCard & {
  Content: typeof ThemeCardContent
  Footer: typeof ThemeCardFooter
  Header: typeof ThemeCardHeader
  Actions: typeof ThemeCardActions
}

// Register sub-components as properties
Card.Content = ThemeCardContent
Card.Footer = ThemeCardFooter
Card.Header = ThemeCardHeader
Card.Actions = ThemeCardActions
```

**Key rules:**
- Root component is always `ThemeXxx` (internal naming)
- Exported compound is `Xxx` (public API)
- Type registration uses `as typeof ThemeXxx & { Sub: typeof ThemeSub }`
- Each sub-component is registered as a property: `Xxx.Sub = ThemeSub`
- TypeScript now knows `<Xxx.Sub>` is valid and has the correct props

**Why this pattern:**
- Provides IDE autocomplete for `Xxx.Sub`
- Enforces type safety — invalid sub-component names are caught at compile time
- Allows importing only the root: `import { Card } from './card/Card'` — all subs are accessed via dot notation

---

### 6. Compound Components — Two Variants

#### Variant A: Without Context (e.g., `Card`, `Button`, `Icon`)

Sub-components are **independent wrappers** with no shared state. Use when sub-components only project content or wrap elements without needing to communicate.

```tsx
// Card.tsx
export const ThemeCard = ({ children, ...props }: ThemeCardProps) => (
  <M3eCard {...props}>{children}</M3eCard>
)

export const Card = ThemeCard as typeof ThemeCard & {
  Content: typeof ThemeCardContent
  Footer: typeof ThemeCardFooter
  Header: typeof ThemeCardHeader
  Actions: typeof ThemeCardActions
}

Card.Content = ThemeCardContent
Card.Footer = ThemeCardFooter
Card.Header = ThemeCardHeader
Card.Actions = ThemeCardActions
```

**Usage:**
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Content here</Card.Content>
  <Card.Footer>Footer</Card.Footer>
  <Card.Actions>Actions</Card.Actions>
</Card>
```

**When to use:**
- Sub-components are slot wrappers or simple element wrappers
- No shared state between sub-components
- No need for context or hooks in sub-components

---

#### Variant B: With Context (e.g., `Nav`)

Sub-components are **context-aware** and share state managed by the root component. Use when sub-components need to communicate or track shared state (e.g., selection, open/closed state).

```tsx
// Nav.tsx
const NavContext = createContext<Nullable<NavContextInternalType>>(null)

export const Nav = ({ children, id, isOpen }: Props) => {
  const [item, setNavItem] = useState<Nullable<M3eNavItemElement>>(null)
  const onSelected = useCallback((element: M3eNavItemElement) => {
    setNavItem(element)
  }, [])

  return (
    <NavContext.Provider value={{ isOpen, id, item, onSelected }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = (): NavContextInternalType => {
  const context = use(NavContext)
  if (!context) throw new Error('useNav must be used within a Nav component')
  return context
}

export const Nav = Nav as typeof Nav & {
  Rail: typeof NavRail
  Item: typeof NavItem
  Toggle: typeof NavRailToggle
  Group: typeof NavGroup
  Container: typeof NavContainer
}

Nav.Rail = NavRail
Nav.Item = NavItem
Nav.Toggle = NavRailToggle
Nav.Group = NavGroup
Nav.Container = NavContainer
```

**Usage:**
```tsx
<Nav id="nav">
  <Nav.Rail>
    <Nav.Container>
      <Nav.Item disabled />
      <Nav.Group>
        <Nav.Item icon="person" selected />
        <Nav.Item icon="email" />
      </Nav.Group>
    </Nav.Container>
  </Nav.Rail>
</Nav>
```

**When to use:**
- Sub-components need to share state (selection, visibility, etc.)
- Sub-components need to communicate with each other
- Root component manages complex logic via Context

**Rules:**
- Define `ContextType` (public) and `ContextInternalType` (internal with handlers)
- Create `useXxx()` hook that throws if called outside root
- Sub-components call `useXxx()` internally — never receive state via props
- Keep public context type stable; extend internally with handlers

---

### 7. Extending Props (Adding Custom Props)

When a component needs custom props beyond what M3E or HTML provides, add them explicitly:

```tsx
type Props = PropsWithChildren &
  ComponentProps<typeof M3eNavItem> & {
    icon?: string  // custom prop not in M3eNavItem
  }

export const NavItem = ({ children, icon, ...props }: Props) => (
  <M3eNavItem {...props}>
    {icon && <span slot="icon">{icon}</span>}
    {children}
  </M3eNavItem>
)
```

**Rules:**
- Destructure custom props explicitly so they are not forwarded via `...props`
- Use `&` to intersect types — never re-declare props already in `ComponentProps`

---

### 8. CSS Module Usage

Each component directory may have a `*.module.css` file with base classes.

```
nav/
  nav.module.css   ← base classes: .nav, .group, .container, .disabled
  NavRail.tsx      ← uses styles.nav, styles.rail
  NavGroup.tsx     ← uses styles.group
  NavContainer.tsx ← uses styles.container
  NavItem.tsx      ← uses styles.disabled conditionally
```

**Rules:**
- Base classes define structural defaults (flexbox, sizing, spacing)
- Pages extend or override base classes via their own `*.module.css` (e.g., `v1.module.css`)
- CSS custom properties (`--variable`) cross Shadow DOM boundaries — use them for M3E theming

---

### 9. ViewController Hook (MVVM-inspired)

When a component has non-trivial logic (refs, effects, event handlers, context interaction), extract it to a **ViewController hook**. The component becomes pure UI.

**Structure:**
```
features/theme/
  hooks/
    useXxxController.ts   ← ViewController hook (logic layer)
  components/
    xxx/
      Xxx.tsx             ← UI component (presentation layer)
```

**ViewController hook** owns:
- Context reads (`useNav()`, etc.)
- DOM refs (`useRef`)
- Derived state (computed from context or refs)
- Event handlers (`useCallback`)
- Lifecycle effects (`useEffect`)

**Component** owns:
- Conditional CSS classes (`resolvedClassName`) — these directly condition visual output
- Slot rendering (`icon`, `children`)
- JSX / markup

**Example — hook:**
```ts
// src/features/theme/hooks/useNavItemController.ts
import type { M3eNavItem, M3eNavItemElement } from '@m3e/react/nav-bar'
import type { ComponentProps } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useNav } from '../components/nav/Nav'

type Props = ComponentProps<typeof M3eNavItem> & { icon?: string }

export const useNavItemController = ({ selected, onChange: _onChange }: Props) => {
  const { onSelected, item } = useNav()
  const handlersRef = useRef({ onSelected, item })
  const m3eNavItemRef = useRef<M3eNavItemElement>(null)
  const initializedRef = useRef(selected)

  const onChangeHandler = useCallback(() => {
    if (!m3eNavItemRef.current) return
    handlersRef.current.onSelected(m3eNavItemRef.current)
  }, [])

  useEffect(() => {
    if (!initializedRef.current || !m3eNavItemRef.current) return
    handlersRef.current.onSelected(m3eNavItemRef.current)
  }, [])

  const isSelected = item === m3eNavItemRef.current

  return { m3eNavItemRef, isSelected, onChangeHandler }
}
```

**Example — component (UI only):**
```tsx
// src/features/theme/components/nav/NavItem.tsx
export const NavItem = ({ children, className, ...props }: Props) => {
  const { m3eNavItemRef, isSelected, onChangeHandler } = useNavItemController(props)

  const resolvedClassName = [props.disabled && styles.disabled, className].filter(Boolean).join(' ') || undefined

  return (
    <M3eNavItem {...props} selected={isSelected} ref={m3eNavItemRef} onChange={onChangeHandler} className={resolvedClassName}>
      {props.icon && <span slot="icon">{props.icon}</span>}
      {children}
    </M3eNavItem>
  )
}
```

**Rules:**
- Hook name: `use[ComponentName]Controller` — e.g., `useNavItemController`
- Hook file: `src/features/theme/hooks/use[ComponentName]Controller.ts`
- The hook accepts the same `Props` type as the component (or a subset)
- Props that only affect logic (e.g., `selected`, `onChange`) are consumed by the hook
- Props that only affect appearance (e.g., `className`, `disabled`, `icon`) stay in the component
- If a prop affects both logic AND appearance (like `disabled`), pass it via `...props` and read it in the component from `props.disabled`
- `onChange` from external callers is discarded in the hook (`onChange: _onChange`) when the hook provides its own internal handler — document why

**When to apply this pattern:**
- Component uses `useRef`, `useCallback`, or `useEffect`
- Component reads from a context hook
- Component derives computed state (e.g., `isSelected`)
- Component is likely to need a skeleton, loading state, or variants in the future

**When NOT to apply:**
- Component is purely presentational (no hooks other than styling)
- Logic is a single line — extracting it would add noise without value

---

## Quick Reference

| Scenario | Pattern |
|---|---|
| Wrapping M3E component | `ComponentProps<typeof M3eXxx>` + `...props` spread |
| Wrapping native HTML element | `HTMLAttributes<HTMLDivElement>` + `...props` spread |
| Always include children | `PropsWithChildren` |
| Base class + override | `[styles.base, className].filter(Boolean).join(' ')` |
| Conditional class from prop | `[condition && styles.cls, className].filter(Boolean).join(' ') \|\| undefined` |
| Compound sub-component | Register as `Parent.Sub = SubComponent` |
| Custom prop not in base type | Add explicitly to type intersection with `&` |
| Non-trivial logic in component | Extract to `useXxxController` hook in `hooks/` |
