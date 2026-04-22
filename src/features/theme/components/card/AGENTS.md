# Agent Context — Card Component

> **Global patterns reference:** See `src/AGENTS.md` for Compound component (Variant B — Without Context) pattern definition.
> This component is a canonical example of a compound without shared state.

The `Card` component is a **compound without Context** — sub-components group content under a single namespace using M3E shadow DOM `slot` attributes, with no shared state needed.

---

## File Structure

```
components/card/
  Card.tsx         — root compound + type registration
  CardContent.tsx  — wrapper: <div slot="content">
  CardFooter.tsx   — wrapper: <div slot="footer">
  CardHeader.tsx   — wrapper: M3eHeading (no slot attr)
  CardActions.tsx  — wrapper: <div slot="actions">
  card.module.css  — base class: .base
```

---

## Compound Component API

Sub-components registered as properties of `Card`:

```tsx
Card.Content = ThemeCardContent
Card.Footer  = ThemeCardFooter
Card.Header  = ThemeCardHeader
Card.Actions = ThemeCardActions
```

**Usage:**
```tsx
<Theme.Card>
  <Theme.Card.Header variant="title">Profile</Theme.Card.Header>
  <Theme.Card.Content>
    <Profile model={userModel}>
      <Profile.Photo />
      <Profile.Name />
    </Profile>
  </Theme.Card.Content>
  <Theme.Card.Footer>...</Theme.Card.Footer>
  <Theme.Card.Actions>...</Theme.Card.Actions>
</Theme.Card>
```

---

## Why No Context

Sub-components don't share state — they only project content into M3E shadow DOM slots. There is no selection, model, or computed state that needs to be shared across sub-components.

This is Compound Variant B: the root wraps an M3E component and sub-components are slot wrappers.

---

## Sub-Component Details

### `Card` / `ThemeCard` (`Card.tsx`)

Root component. Wraps `M3eCard`, merges base CSS class.

```tsx
export const ThemeCard = ({ children, ...props }: ThemeCardProps) => (
  <M3eCard {...props} className={[cardStyles.base, props.className].filter(Boolean).join(' ')}>
    {children}
  </M3eCard>
)
```

- `ThemeCardProps` extends `ComponentProps<typeof M3eCard>` — all M3E card props are forwarded
- `color?: string` is an additional custom prop
- `card.module.css` `.base` sets structural defaults

---

### `CardContent` (`CardContent.tsx`)

Projects children into the M3E `content` slot.

```tsx
export const ThemeCardContent = ({ children, ...props }: ThemeCardContentProps) => (
  <div {...props} slot="content">{children}</div>
)
```

- `slot="content"` targets M3E Card's content area
- Props: `PropsWithChildren & HTMLAttributes<HTMLDivElement>`

---

### `CardFooter` (`CardFooter.tsx`)

Projects children into the M3E `footer` slot.

```tsx
export const ThemeCardFooter = ({ children, ...props }: ThemeCardFooterProps) => (
  <div {...props} slot="footer">{children}</div>
)
```

- `slot="footer"` targets M3E Card's footer area

---

### `CardHeader` (`CardHeader.tsx`)

Renders a heading inside the card using `M3eHeading`.

```tsx
export const ThemeCardHeader = ({ children, ...props }: ThemeCardHeaderProps) => (
  <M3eHeading {...props}>{children}</M3eHeading>
)
```

- Props: `PropsWithChildren & ComponentProps<typeof M3eHeading>`
- No `slot` attribute — M3eHeading handles its own placement

---

### `CardActions` (`CardActions.tsx`)

Projects children into the M3E `actions` slot.

```tsx
export const ThemeCardActions = ({ children, ...props }: ThemeCardActionsProps) => (
  <div {...props} slot="actions">{children}</div>
)
```

- `slot="actions"` targets M3E Card's actions area

---

## How to Add a New Card Sub-Component

1. Create `CardXxx.tsx` in this directory
2. Wrap a native `div` (or M3E element if needed) with the correct M3E `slot` value
3. Use `PropsWithChildren & HTMLAttributes<HTMLDivElement>` as props type
4. Register on `Card` in `Card.tsx`:

```tsx
export const Card = ThemeCard as typeof ThemeCard & {
  // ... existing
  Xxx: typeof ThemeCardXxx
}
Card.Xxx = ThemeCardXxx
```

5. Export from `components/index.ts` if needed via the `Theme` namespace

---

## Shadow DOM Slots

M3E components use Shadow DOM. Content is projected via `slot` attributes.

| Sub-component | `slot` value | M3E area |
|---|---|---|
| `Card.Content` | `content` | Main body area |
| `Card.Footer` | `footer` | Bottom area |
| `Card.Actions` | `actions` | Action buttons area |
| `Card.Header` | *(none — M3eHeading)* | Heading inside card |

CSS custom properties (`--variable`) cross Shadow DOM; regular properties do not.
