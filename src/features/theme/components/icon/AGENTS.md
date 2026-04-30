# Agent Context — Icon Components

> **Global references:** `src/AGENTS.md`, `src/features/theme/components/AGENTS.md`

The icon feature exposes exactly one public icon API: `Theme.Icon`.

---

## Public API

Use:

```tsx
<Theme.Icon name="person" />
<Theme.Icon name="github" aria-label="GitHub" />
```

Do not use:

```tsx
<Icon.Svg ... />
<Icon.Material ... />
<Icon.Slot ... />
```

The renderer choice (Material vs sprite) is an implementation detail and must stay internal.

---

## Internal dispatch pattern

- `Icon.tsx` receives `name`.
- `registry.ts` decides whether the name is a sprite icon; ids must match `public/icons.svg` (see `__tests__/registry.test.ts`).
- If sprite: render `<svg><use href="...#id" /></svg>`.
- Otherwise: render `M3eMaterialIcon` (wraps `M3eIcon` with Lit `name` sync for React 19).

## M3E navigation (nav rail / nav bar)

- **`NavbarItems`** and **`NavItem`** (`icon` prop) use **`M3eMaterialIcon`** only — Material Symbols, no sprite registry. Consumers of the navbar should keep `model.icon` / `icon` as Material icon names.

---

## Rules

- Keep **`Theme.Icon`** as the only **public** icon API for pages, cards, and buttons.
- Never branch icon renderer in those consumers.
- Never reintroduce `Icon.Svg` as public API.
- When you add a symbol to `public/icons.svg`, append its id to `SPRITE_ICON_IDS` in `registry.ts`.
- Do not use `Theme.Icon` inside **`NavbarItems`** / nav item icon slots until we add explicit sprite support there.
