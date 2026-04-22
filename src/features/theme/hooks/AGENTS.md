# Agent Context — Theme Hooks

> **Global patterns reference:** See `src/AGENTS.md` for ViewController pattern definition.
> All hooks in this directory are ViewControllers.

This directory contains ViewController hooks for the theme feature — hooks that own non-trivial logic (refs, effects, context reads, event handlers) and keep components as pure UI.

---

## Hooks in This Directory

| Hook | Serves | Concern |
|---|---|---|
| `useNavItemController` | `NavItem` component | Navigation item selection logic |
| `useThemeController` | `ThemeProvider` | OS color scheme detection + theme store |

---

## `useNavItemController`

ViewController for the `NavItem` component. Handles all selection logic via the Nav context.

```ts
// src/features/theme/hooks/useNavItemController.ts
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

**What it owns:**
- `useNav()` context read — reads `item` and `onSelected`
- `m3eNavItemRef` — DOM ref passed to `M3eNavItem`
- `isSelected` — derived state: ref identity comparison against context `item`
- `onChangeHandler` — wired to M3E `change` event, calls `onSelected` on the context
- Initial selection `useEffect` — registers this item in context on mount if `selected` was set

**Why `onChange` is discarded:** The hook provides its own `onChangeHandler` wired to the Nav context. The caller's `onChange` would conflict with the context-driven selection flow.

**For full selection logic details:** See `src/features/theme/components/nav/AGENTS.md`.

---

## `useThemeController`

ViewController for `ThemeProvider`. Manages OS color scheme detection and drives the theme store.

```ts
// src/features/theme/hooks/useThemeController.ts
export const useThemeController = () => {
  const { theme, setScheme, setColor } = useThemeStore()

  const onColorSchemeChange = useEffectEvent((e: MediaQueryListEvent) => {
    const newTheme: ThemeType = e.matches ? 'dark' : 'light'
    const color = newTheme === 'dark' ? '#1565a8' : '#aaceff'
    setScheme(newTheme)
    setColor(color)
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', onColorSchemeChange)
    return () => mediaQuery.removeEventListener('change', onColorSchemeChange)
  }, [])

  return { theme, setScheme, setColor }
}
```

**What it owns:**
- `useThemeStore()` — reads current theme and exposes setters
- OS media query listener via `useEffect` — reacts to system color scheme changes
- `useEffectEvent` — stable event handler that reads the latest store setters without re-subscribing

**What the component receives:** `{ theme, setScheme, setColor }` — the component only reads `theme.scheme` and `theme.color` to pass to `M3eTheme`.

---

## Rules for Hooks in This Directory

- **Naming:** `useXxxController` — matches the component or system it serves
- **Input:** Accept the same `Props` type as the component (or a relevant subset)
- **Output:** Return only what the component needs — no internal implementation details
- **No JSX** — hooks never render, return elements, or import component files
- **Single responsibility** — one hook per component/concern
