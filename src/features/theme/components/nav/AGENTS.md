# Nav Component Architecture

## Overview

The `Nav` component implements a **context-based compound component** for managing navigation state and item selection using M3E (`@m3e/react/nav-bar`, `@m3e/react/nav-rail`, `@m3e/react/nav-menu`) components.

## File Structure

```
features/theme/
  hooks/
    useNavItemController.ts  — ViewController hook: selection logic for NavItem
  components/nav/
    Nav.tsx           — root compound component + context + useNav hook
    NavRail.tsx       — wrapper for M3eNavRail
    NavRailToggle.tsx — wrapper for M3eNavRailToggle
    NavItem.tsx       — UI-only wrapper for M3eNavItem (styling concerns only)
    NavGroup.tsx      — wrapper for M3eNavMenuItemGroup
    NavContainer.tsx  — wrapper for native div (layout container)
    nav.module.css    — base CSS classes for all sub-components
```

## Compound Component API

All sub-components are registered as properties of `Nav`:

```tsx
Nav.Rail = NavRail
Nav.Item = NavItem
Nav.Toggle = NavRailToggle
Nav.Group = NavGroup
Nav.Container = NavContainer
```

**Usage:**
```tsx
<Nav id="nav">
  <Nav.Rail className={styles.nav}>
    <Nav.Container className={styles.container}>
      <Nav.Item disabled />
      <Nav.Group>
        <Nav.Item icon="person" selected />
        <Nav.Item icon="email" />
      </Nav.Group>
    </Nav.Container>
  </Nav.Rail>
</Nav>
```

Only `Nav` needs to be imported — all sub-components are accessed via dot notation.

---

## Context Architecture

### `NavContextType` (public)

Exposes the public navigation state consumed by external components via `useNav()`:

```typescript
export type NavContextType = {
  isOpen?: boolean                    // Nav rail open/closed state
  id?: string                         // Nav container ID (forwarded to M3eNavRail)
  item?: Nullable<M3eNavItemElement>  // Currently selected nav item element
}
```

### `NavContextInternalType` (internal)

Extends the public type with internal handlers — not exported:

```typescript
type NavContextInternalType = NavContextType & {
  onSelected: (element: M3eNavItemElement) => void
}
```

`onSelected` is only used by `NavItem`. Keeping it off the public type prevents external consumers from misusing it.

### `NavContext`

Created with `null` default — forces `useNav()` to throw if used outside `Nav`:

```tsx
const NavContext = createContext<Nullable<NavContextInternalType>>(null)
```

### `useNav()` hook

The only way to access the Nav context. Throws a descriptive error if called outside a `Nav`:

```tsx
export const useNav = (): NavContextInternalType => {
  const context = use(NavContext)
  if (!context) {
    throw new Error('useNav must be used within a Nav component')
  }
  return context
}
```

Used internally by `NavRail` (reads `id`) and `NavItem` (reads `item`, calls `onSelected`).

---

## Sub-Component Details

### `Nav` (`Nav.tsx`)

Root component. Manages selection state and provides context.

```tsx
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
```

- `id` is passed to context and forwarded by `NavRail` to `M3eNavRail`
- `onSelected` is memoized with `useCallback` — stable reference, no re-renders
- `item` state holds the currently selected `M3eNavItemElement` DOM reference

---

### `NavRail` (`NavRail.tsx`)

Wraps `M3eNavRail`. Reads `id` from context and applies base CSS classes.

```tsx
export const NavRail = ({ children, className, ...props }: Props) => {
  const { id } = useNav()
  return (
    <M3eNavRail
      {...props}
      id={id}
      className={[styles.nav, styles.rail, className].filter(Boolean).join(' ')}
    >
      {children}
    </M3eNavRail>
  )
}
```

- Always applies `styles.nav` (CSS custom properties for M3E theming) and `styles.rail`
- `className` from props is appended — enables page-level CSS overrides
- `id` from context links the rail to its toggle (`NavRailToggle`)

> Note: `nav.module.css` does not define `.rail`. It is referenced but not declared — verify if it should be added.

---

### `NavRailToggle` (`NavRailToggle.tsx`)

Thin wrapper around `M3eNavRailToggle`. Does not use `useNav()`.

```tsx
type Props = PropsWithChildren &
  ComponentProps<typeof M3eNavRailToggle> & {
    id: string  // required — links toggle to rail via matching id
  }

export const NavRailToggle = ({ children, id, ...props }: Props) => {
  return <M3eNavRailToggle {...props}>{children}</M3eNavRailToggle>
}
```

> Note: `id` is destructured but not forwarded to `M3eNavRailToggle`. Verify if this is intentional or a bug.

---

### `NavItem` (`NavItem.tsx`)

UI-only component. Delegates all selection logic to `useNavItemController`. Retains styling concerns (`resolvedClassName`) as they are UI-layer responsibilities.

```tsx
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

**What stays in `NavItem` (UI concerns):**
- `resolvedClassName` — combines `styles.disabled` and `className`; directly conditions the rendered output
- `props.icon` — renders `Theme.Icon` into the M3E slot
- `children` — pass-through to M3E

**What lives in `useNavItemController` (logic concerns):**
- Context interaction (`useNav`)
- DOM ref management (`m3eNavItemRef`)
- Selection state (`isSelected`)
- Event handler (`onChangeHandler`)
- Initial selection effect (`useEffect` on mount)

---

### `useNavItemController` (`src/features/theme/hooks/useNavItemController.ts`)

ViewController hook for `NavItem`. Follows the MVVM-inspired pattern where the hook owns all lifecycle and interaction logic, keeping the component as pure UI.

```ts
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

**Selection logic:**

1. **Ref identity:** `isSelected = item === m3eNavItemRef.current` — determined by comparing context `item` against this item's DOM ref.

2. **User click:** M3E emits `change` → `onChangeHandler` → `onSelected(element)` → context `item` updates → all `NavItem`s re-evaluate `isSelected`.

3. **Initial selection:** `initializedRef` captures the initial `selected` value. `useEffect` on mount fires once: if `selected` was truthy, calls `onSelected` to register this item in context.

4. **Handler stability:** `handlersRef` caches `onSelected` and `item` to avoid stale closures without re-creating `onChangeHandler`.

5. **`onChange` from props is discarded** (`onChange: _onChange`) — the hook provides its own `onChangeHandler` wired to the context. The caller's `onChange` would conflict with the context-driven selection flow.

---

### `NavGroup` (`NavGroup.tsx`)

Wraps `M3eNavMenuItemGroup` with the base class `.group`.

```tsx
type Props = PropsWithChildren & ComponentProps<typeof M3eNavMenuItemGroup>

export const NavGroup = ({ children, className, ...props }: Props) => (
  <M3eNavMenuItemGroup {...props} className={[styles.group, className].filter(Boolean).join(' ')}>
    {children}
  </M3eNavMenuItemGroup>
)
```

- Base class `.group`: `display: flex; flex-direction: column`
- Replaces direct use of `M3eNavMenuItemGroup` in pages
- Does not consume `useNav()` — purely presentational

---

### `NavContainer` (`NavContainer.tsx`)

Wraps a native `div`. Layout container for items inside `NavRail`.

```tsx
type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const NavContainer = ({ children, className, ...props }: Props) => (
  <div {...props} className={[styles.container, className].filter(Boolean).join(' ')}>
    {children}
  </div>
)
```

- Base class `.container`: `display: flex; flex-direction: column; height: 100dvh`
- Does not consume `useNav()` — purely presentational
- Uses `HTMLAttributes<HTMLDivElement>` (not `ComponentProps`) since it wraps a native element

---

## CSS: `nav.module.css`

Base classes applied by sub-components. Pages can extend via their own CSS module.

```css
.nav {
  --m3e-nav-bar-container-color: var(--md-sys-color-surface-container);
  --m3e-nav-rail-bottom-space: 0rem;
  --m3e-nav-rail-top-space: 0rem;
  background-color: var(--m3e-nav-bar-container-color);
}

.group {
  display: flex;
  flex-direction: column;
}

.disabled {
  flex-grow: 0;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100dvh;
}
```

### Shadow DOM and CSS Custom Properties

M3E components use Shadow DOM. Regular CSS properties do not cross Shadow DOM boundaries — only CSS custom properties (`--variable`) do.

| CSS Feature | Crosses Shadow DOM? |
|---|---|
| `background-color`, `width`, etc. | ❌ No |
| `--m3e-*` custom properties | ✅ Yes |

`.nav` sets both:
- `--m3e-nav-bar-container-color` — inherited into Shadow DOM for M3E internal use
- `background-color` — applied on the host element itself (outside Shadow DOM)

### Page-level Overrides

Pages pass a `className` to override or extend base styles:

```css
/* v1.module.css */
.nav {
  --m3e-nav-bar-container-color: var(--md-sys-color-inverse-primary);
  --m3e-nav-rail-compact-width: 4rem;
}

.container {
  justify-content: space-between;
}
```

```tsx
<Nav.Rail className={styles.nav}>
  <Nav.Container className={styles.container}>
```

Cascade order:
1. M3E defaults (fallbacks inside `var(--var, default)`)
2. `nav.module.css` base values
3. Page-level overrides (e.g., `v1.module.css`)

---

## CSS Class Merge Pattern

All sub-components follow the same pattern:

```tsx
[styles.baseClass, className].filter(Boolean).join(' ')
```

- Base class always comes first
- `className` from props appended last — wins via CSS cascade
- `filter(Boolean)` removes `undefined` / `false` safely
- For conditional classes: `[condition && styles.cls, className].filter(Boolean).join(' ') || undefined`

---

## SOLID Principles Applied

- **Single Responsibility** — each sub-component has one role (layout, grouping, selection, wrapping)
- **Open/Closed** — `NavContextType` public API is stable; extend internally via `NavContextInternalType`
- **Dependency Inversion** — `NavItem` depends on `useNav()` abstraction, not on `Nav` directly

---

## References

- **M3E Nav Rail:** https://matraic.github.io/m3e/#/components/nav-rail.html
- **M3E Nav Bar:** https://matraic.github.io/m3e/#/components/nav-bar.html
- **Material Design 3 Navigation:** https://m3.material.io/components/navigation-rail/guidelines
- **Shadow DOM CSS:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scoping
