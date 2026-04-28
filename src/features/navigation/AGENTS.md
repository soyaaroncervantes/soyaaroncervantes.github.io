# Navigation Feature

Domain abstraction for navigation, separated from the design system (`theme`).

---

## Purpose

The `navigation` feature provides components and logic to handle application navigation in a type-safe manner, integrated with TanStack Router.

**Separation of concerns:**
- `theme`: Visual components (Nav, NavItem, NavGroup) — how it looks
- `navigation`: Navigation logic (Navbar, NavItemModel) — what to navigate and when

---

## Applied Patterns

1. **DTO → Model:** `NavItemDto` (data shape) → `NavItemModel` (domain logic)
2. **ViewController (Hook):** `useNavbarController` handles navigation logic and prefetch
3. **Compound Component (Variant A — With Context):** `Navbar` with sub-components and shared context

---

## Structure

```
src/features/navigation/
  dtos/
    NavItemDto.ts              — raw data shape for an item
  models/
    NavItemModel.ts            — Model class for a nav item
  components/
    navbar/
      Navbar.tsx               — Root + NavbarContext + compound registration
      NavbarLayout.tsx         — wrapper for NavRail + NavContainer
      NavbarItems.tsx          — iterates NavbarContext.navigation → Groups + Items
      NavbarContext.tsx        — shared context
      AGENTS.md                — compound component documentation
  hooks/
    useNavbarController.ts     — ViewController: active route + prefetch
    AGENTS.md                  — hook controller documentation
  types.ts                     — NavbarMap type
  index.ts                     — public exports
```

---

## Selective Override Pattern

The selective override pattern allows customizing specific navigation elements without duplicating logic.

**How it works:**
- `Navbar.Items` accepts an `overrides?: Map<string, ReactNode>` prop
- For each `groupId`, checks if it exists in `overrides`
- If it exists, renders the override; otherwise, renders the default
- No duplicate keys — React reconciles correctly

**Example:**
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

---

## Type-Safety

**`NavRoute` type alias:**
```ts
type NavRoute = ValidateNavigateOptions<RegisteredRouter>['to']
```

Ensures all routes in `NavItemModel.to` are registered routes in TanStack Router. TypeScript error if the route doesn't exist.

---

## Important

- `navigation` (NavbarMap) must be a **stable constant** (same reference across renders)
- Export as `export const navigation: NavbarMap = new Map([...])`
- Don't create a new Map on each render — breaks `useMemo` and causes unnecessary re-prefetch
