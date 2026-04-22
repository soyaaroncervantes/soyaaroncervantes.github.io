# Agent Context — Theme Components

> **Global patterns reference:** See `src/AGENTS.md` for DTO, Model, ViewController, and Compound component pattern definitions.

This document provides component-level conventions for `src/features/theme/components/`.

---

## Component Types

Components in this directory are one of three types:

1. **M3E wrappers** — thin wrappers around `@m3e/react/*` components
2. **Native element wrappers** — wrappers around native HTML elements (`div`, etc.)
3. **Compound components** — sub-components grouped under a single namespace (e.g., `Nav`, `Card`)

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

### 5. Compound Components

Group related sub-components under a single namespace using property assignment.

```tsx
// Nav.tsx
import { NavContainer } from './NavContainer'
import { NavGroup } from './NavGroup'
import { NavItem } from './NavItem'
import { NavRail } from './NavRail'

export const Nav = ({ children, ...props }: Props) => (
  <NavContext.Provider value={...}>{children}</NavContext.Provider>
)

Nav.Rail = NavRail
Nav.Item = NavItem
Nav.Group = NavGroup
Nav.Container = NavContainer
```

**Usage at call site:**
```tsx
<Nav>
  <Nav.Rail>
    <Nav.Container>
      <Nav.Item disabled />
      <Nav.Group>
        <Nav.Item icon="person" selected />
      </Nav.Group>
    </Nav.Container>
  </Nav.Rail>
</Nav>
```

**Rules:**
- The root component manages shared state via React Context
- Sub-components are registered as properties of the root component
- Sub-components access shared state via a context hook (e.g., `useNav()`) — never via direct prop drilling
- Keep the public context type stable; internal handlers go in a separate unexported type

---

### 6. Extending Props (Adding Custom Props)

When a component needs custom props beyond what M3E or HTML provides, add them explicitly:

```tsx
type Props = PropsWithChildren &
  ComponentProps<typeof M3eNavItem> & {
    icon?: string  // custom prop not in M3eNavItem
  }

export const NavItem = ({ children, icon, ...props }: Props) => (
  <M3eNavItem {...props}>
    {icon && <Theme.Icon slot="icon" name={icon} />}
    {children}
  </M3eNavItem>
)
```

**Rules:**
- Destructure custom props explicitly so they are not forwarded via `...props`
- Use `&` to intersect types — never re-declare props already in `ComponentProps`

---

### 7. CSS Module Usage

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

### 8. ViewController Hook (MVVM-inspired)

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
      {props.icon && <Theme.Icon slot="icon" name={props.icon} />}
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
