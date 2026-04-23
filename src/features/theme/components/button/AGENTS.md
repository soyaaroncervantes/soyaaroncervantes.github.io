# Agent Context — Button Compound Component

The `Button` compound component groups button-related sub-components under a single import.

---

## Structure

```
button/
  Button.tsx           — Compound root (M3E wrapper for M3eButton)
  ButtonIcon.tsx       — M3E wrapper for M3eIconButton
  ButtonGroup.tsx      — Native wrapper for m3e-button-group
  ButtonSplit.tsx      — M3E wrapper for M3eSplitButton
  AGENTS.md            — This file
```

---

## Pattern

**Compound without Context** (Variant B from `src/AGENTS.md`):
- Sub-components are independent wrappers
- No shared state via Context
- Sub-components registered as properties of the root component
- Similar to `Theme.Card`

---

## Usage

```tsx
import { Button } from '@/features/theme/components/button/Button'
import { Theme } from '@/features/theme/components'

// Basic button
<Button>Click me</Button>

// Button with icon
<Button.Icon href="https://example.com">
  <Theme.Svg id="github" aria-label="GitHub" />
</Button.Icon>

// Button group
<Button.Group>
  <Button>Save</Button>
  <Button>Cancel</Button>
</Button.Group>

// Split button
<Button.Split>
  <Button>Action</Button>
  <Button>More options</Button>
</Button.Split>
```

---

## Sub-Components

### `Button` (root)
- M3E wrapper for `M3eButton`
- Accepts all `M3eButton` props via `ComponentProps<typeof M3eButton>`
- Supports children for composition

### `Button.Icon`
- M3E wrapper for `M3eIconButton`
- Accepts all `M3eIconButton` props
- Supports children (e.g., `Theme.Svg`, `Theme.Icon`)

### `Button.Group`
- Native element wrapper for `<m3e-button-group>`
- Accepts standard HTML attributes
- Supports children (typically `Button` or `Button.Icon` components)

### `Button.Split`
- M3E wrapper for `M3eSplitButton`
- Accepts all `M3eSplitButton` props
- Supports children for composition

---

## Props

All sub-components forward props to their underlying M3E or native elements:

- `Button`: `PropsWithChildren & ComponentProps<typeof M3eButton>`
- `Button.Icon`: `PropsWithChildren & ComponentProps<typeof M3eIconButton>`
- `Button.Group`: `PropsWithChildren & HTMLAttributes<HTMLDivElement>`
- `Button.Split`: `PropsWithChildren & ComponentProps<typeof M3eSplitButton>`

---

## Notes

- `Button` is **not** exported in the `Theme` namespace — import directly from `@/features/theme/components/button/Button`
- Sub-components are internal to the compound — only accessible as properties of `Button`
- No Context is used — sub-components are independent
- Similar architecture to `Theme.Card` compound
