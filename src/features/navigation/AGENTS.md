# Navigation Feature

Domain abstraction for navigation, separated from the design system (`theme`).

---

## Purpose

The `navigation` feature provides components and logic to handle application navigation in a type-safe manner, integrated with TanStack Router.

**Separation of concerns:**
- `theme`: visual components (`Nav`, `NavItem`, `NavGroup`) — how it looks
- `navigation`: action models + navbar orchestration — what to do on activation

---

## Applied Patterns

1. **DTO → Polymorphic Model:** DTOs map to concrete model subclasses (`RouteNavItemModel`, `ExternalLinkNavItemModel`, `MailtoNavItemModel`, `DownloadNavItemModel`, `ShareNavItemModel`)
2. **ViewController (Hook):** `useNavbarController` handles navigation logic and prefetch
3. **Template Method + Polymorphism:** `AnchorNavItemModel` centralizes URL/scheme validation, while subclasses define allowed schemes + attrs
4. **Compound Component (Variant A — With Context):** `Navbar` with sub-components and shared context

---

## Structure

```
src/features/navigation/
  dtos/
    NavItemDto.ts              — base item DTO + NavRoute alias
    RouteNavItemDto.ts
    ExternalLinkNavItemDto.ts
    MailtoNavItemDto.ts
    DownloadNavItemDto.ts
    ShareNavItemDto.ts
  models/
    NavItemModel.ts            — abstract base contract + parseUrl helper
    RouteNavItemModel.ts
    AnchorNavItemModel.ts
    ExternalLinkNavItemModel.ts
    MailtoNavItemModel.ts
    DownloadNavItemModel.ts
    ShareNavItemModel.ts
    AGENTS.md                  — model hierarchy and extension rules
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

Ensures all routes used by `RouteNavItemModel.to` are registered routes in TanStack Router.

`useNavbarController` only preloads/matches instances of `RouteNavItemModel` via `instanceof`.

---

## Important

- `navigation` (NavbarMap) must be a **stable constant** (same reference across renders)
- Export as `export const navigation: NavbarMap = new Map([...])`
- Don't create a new Map on each render — breaks `useMemo` and causes unnecessary re-prefetch
