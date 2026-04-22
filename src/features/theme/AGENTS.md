# Agent Context — Theme Feature

> **Global patterns reference:** See `src/AGENTS.md` for ViewController and Compound component pattern definitions.

The `theme` feature is the application's design system — a set of React components that wrap `@m3e/react` (Material Design 3) and expose them under a unified `Theme` namespace.

---

## Feature Structure

```
src/features/theme/
  components/
    index.ts          — Theme namespace export (Theme.Card, Theme.Text, etc.)
    Button.tsx        — M3E wrapper
    Icon.tsx          — M3E wrapper
    Text.tsx          — M3E wrapper
    card/             — Compound without Context (see card/AGENTS.md)
    nav/              — Compound with Context (see nav/AGENTS.md)
    AGENTS.md         — Component-level conventions and patterns
  hooks/
    useNavItemController.ts  — ViewController for NavItem
    useThemeController.ts    — ViewController for ThemeProvider
    AGENTS.md                — Hook conventions
  theme.stores.ts     — Zustand store for theme scheme and color
```

---

## The `Theme` Namespace

All components are exported from `components/index.ts` under a single `Theme` object:

```ts
import { Theme } from '@/features/theme/components'

<Theme.Card>...</Theme.Card>
<Theme.Card.Header>...</Theme.Card.Header>
<Theme.Card.Content>...</Theme.Card.Content>
<Theme.Text variant="body">Hello</Theme.Text>
<Theme.Icon name="person" />
<Theme.Button>Click</Theme.Button>
```

**Current exports:**
- `Theme.Card` — compound without Context (`Card`, `Card.Header`, `Card.Content`, `Card.Footer`, `Card.Actions`)
- `Theme.Text` — M3E heading wrapper
- `Theme.Icon` — M3E icon wrapper
- `Theme.Button` — M3E button wrapper
- `Theme.Nav` — compound with Context (`Nav.Rail`, `Nav.Item`, `Nav.Group`, `Nav.Container`, `Nav.Toggle`)

---

## How to Add a New Component

Choose the correct pattern based on the component's needs:

| Situation | Pattern | Reference |
|---|---|---|
| Wrapping an M3E element (no sub-components) | M3E wrapper | `components/AGENTS.md` §1 |
| Wrapping a native HTML element | Native wrapper | `components/AGENTS.md` §2 |
| Group of sub-components that share state | Compound with Context | `src/AGENTS.md` Variant A, `nav/AGENTS.md` |
| Group of sub-components using M3E slots | Compound without Context | `src/AGENTS.md` Variant B, `card/AGENTS.md` |
| Non-trivial logic in a component | Extract to ViewController hook | `hooks/AGENTS.md` |

**Steps for a new component:**

1. Create the file in `components/` (or a subdirectory for compounds)
2. Follow the appropriate pattern from the table above
3. Export from `components/index.ts` under the `Theme` namespace
4. If the component has non-trivial logic, create a `useXxxController` hook in `hooks/`

---

## CSS Modules Convention

- Each component (or component directory) has a `*.module.css` file with base classes
- Base classes define structural defaults (layout, spacing)
- Pages pass `className` to extend or override — base class wins by source order, override wins by cascade
- CSS custom properties (`--m3e-*`, `--md-sys-*`) cross Shadow DOM boundaries — use them for M3E theming

---

## Theme Store

The active color scheme (light/dark) and accent color are managed in `theme.stores.ts` via Zustand.

- `useThemeController` (in `hooks/`) listens to the OS media query and drives the store
- `ThemeProvider` (in `src/core/providers/`) reads the store and applies values to `M3eTheme`
- Components do not read the theme store directly — they rely on CSS custom properties set by `M3eTheme`

---

## References

- `components/AGENTS.md` — detailed component patterns (M3E wrapper, native wrapper, CSS merge, ViewController)
- `components/nav/AGENTS.md` — Nav compound with Context architecture
- `components/card/AGENTS.md` — Card compound without Context architecture
- `hooks/AGENTS.md` — ViewController hook conventions and examples
