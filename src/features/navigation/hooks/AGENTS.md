# useNavbarController Hook

ViewController that handles navigation logic and prefetch.

---

## What it is

Hook that encapsulates navigation logic for the `Navbar` component:
1. Transforms `NavbarMap` into an array of entries
2. Calculates the active route based on `location.pathname`
3. Prefetches all routes on mount

---

## Responsibilities

### 1. Map Transformation

```ts
const navigationEntries = useMemo(
  () => Array.from(navigation.entries()),
  [navigation]
)
```

**Why:**
- `Navbar.Items` only needs to iterate, not manipulate the Map
- Transformation happens once (memoized)
- If `navigation` is stable (same reference), it doesn't re-execute

### 2. Active Route Calculation

```ts
const activeItem = useMemo(() => {
  const allItems = [...navigation.values()]
    .flatMap(set => set === null ? [] : [...set])
  
  return allItems.find(
    (model): model is RouteNavItemModel =>
      model instanceof RouteNavItemModel && model.to === location.pathname
  ) ?? null
}, [navigation, location.pathname])
```

**Why:**
- Source of truth: `location.pathname` (from router)
- Compares only `RouteNavItemModel.to` to find the active item
- Returns `null` if no match

### 3. Route Prefetch

```ts
useEffect(() => {
  for (const set of navigation.values()) {
    if (set === null) continue  // Spacer, no route
    for (const model of set) {
      if (!(model instanceof RouteNavItemModel)) continue
      router.preloadRoute({ to: model.to })
    }
  }
}, [router, navigation])
```

**Why:**
- Improves perceived performance
- Prefetch on mount (not on hover) because `NavItem` is a web component
- Only executes if `navigation` changes reference

---

## Returns

```ts
type UseNavbarControllerReturn = {
  navigationEntries: Array<[groupId: string, itemsSet: Set<NavItemModel> | null]>
  activeItem: NavItemModel | null
}
```

- `navigationEntries`: Array ready to iterate in `Navbar.Items`
- `activeItem`: Active item according to current route (or `null`)

---

## Integration

Used by `Navbar.Root` to provide data to context:

```tsx
export const Navbar = ({ navigation, ...props }: NavbarProps) => {
  const { navigationEntries, activeItem } = useNavbarController(navigation)
  
  const navbarContextValue: NavbarContextType = { 
    navigation: navigationEntries,
    activeItem 
  }
  
  return (
    <Nav {...props}>
      <NavbarContext.Provider value={navbarContextValue}>
        {children}
      </NavbarContext.Provider>
    </Nav>
  )
}
```

---

## Important

**`navigation` must be stable:**
- If `navigation` changes reference on each render, `useMemo` and `useEffect` execute unnecessarily
- Export as constant: `export const navigation: NavbarMap = new Map([...])`
- Don't create a new Map on each render
