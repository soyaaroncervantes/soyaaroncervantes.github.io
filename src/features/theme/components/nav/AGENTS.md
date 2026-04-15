# Nav Component Architecture

## Overview

The `Nav` component implements a **context-based, handler-driven architecture** for managing navigation state and item selection in M3E (`m3e-nav-bar` and `m3e-nav-rail`) components.

## Architecture Pattern

### Public API: `useNav()`

Exposes the **public navigation state**:

```typescript
export type NavContextType = {
    isOpen: boolean;           // Nav rail open/closed state
    id: Nullable<string>;      // Nav container ID
    item: Nullable<M3eNavItemElement>; // Currently selected item
}
```

**Usage:**
```tsx
const { isOpen, id, item } = useNav();
```

### Internal API: `useNavItemHandlers()`

Exposes **internal handlers** for `NavItem` components only (not part of public type):

```typescript
export const useNavItemHandlers = () => ({
    onChangeHandler: (e: Event, onChange?: (e: Event) => void) => void;
    onSelected: (element: M3eNavItemElement) => void;
    useNavItemRef: () => React.RefObject<M3eNavItemElement | null>;
})
```

**Design Rationale:**
- Follows **Open/Closed Principle** — public API is closed to internal changes
- Handlers are "private" conceptually, only exposed via `useNavItemHandlers()`
- Ref is centralized in `Nav` context, not duplicated in each `NavItem`

## Implementation Details

### Ref Management

The `m3eNavItemRef` is created and managed in `Nav`:

```tsx
const m3eNavItemRef = useRef<M3eNavItemElement>(null);
const useNavItemRef = () => m3eNavItemRef;
```

**Benefits:**
- Single source of truth for the DOM element
- Avoids ambiguity between `e.target` (event target) and actual element
- Enables safe access to `element.selected` property

### Handler Caching in NavItem

`NavItem` caches handlers via `useRef` to avoid stale closures:

```tsx
const {onChangeHandler, onSelected, useNavItemRef} = useNavItemHandlers();
const handlersRef = useRef({onChangeHandler, onSelected, useNavItemRef});

useEffect(() => {
    if (!selected || !m3eNavItemRef.current) return;
    handlersRef.current.onSelected(m3eNavItemRef.current);
}, [selected, m3eNavItemRef])
```

### Event Flow

1. **User clicks NavItem** → M3E emits `change` event
2. `onChangeHandler` fires → checks `m3eNavItemRef.current.selected`
3. If selected → calls `onNavItemHandler(element)` → updates context state
4. Context state updates → `item` is set to the selected element

5. **Programmatic selection** (via `selected` prop) → `useEffect` detects change
6. Calls `handlersRef.current.onSelected(element)` → same flow as above

## M3E Component Integration

### M3E Nav Bar / Nav Rail

Reference: https://matraic.github.io/m3e/#/components/nav-rail.html

**Key Features:**
- Single-select only
- `selected` attribute on `m3e-nav-item` indicates active item
- Emits `input` (cancellable) and `change` events on selection
- Supports `selected-icon` slot for alternate icon when selected

**Selection Handling:**
```html
<m3e-nav-bar>
  <m3e-nav-item selected>
    <m3e-icon slot="icon" name="news"></m3e-icon>
    News
  </m3e-nav-item>
</m3e-nav-bar>
```

### React Binding

M3E provides React bindings via `@m3e/react/nav-bar`:

```typescript
import { M3eNavItem, type M3eNavItemElement } from "@m3e/react/nav-bar"

// Props map directly to element properties
// Event handlers receive native DOM events
// Refs forward to underlying <m3e-nav-item> instance
```

**Events exposed:**
- `onInput` — cancellable, fires before selection change
- `onChange` — fires after selection change (our primary handler)
- `onClick` — standard click event

## SOLID Principles Applied

### Open/Closed Principle
- `NavContextType` (public) is closed to internal implementation changes
- Open to extension via `useNav()` hook
- Internal handlers hidden behind `useNavItemHandlers()`

### Single Responsibility
- `useNav()` — manages and exposes public state
- `useNavItemHandlers()` — manages internal handler logic
- `NavItem` — consumes and applies handlers to M3E component

### Dependency Inversion
- `NavItem` depends on abstractions (`useNavItemHandlers`), not concrete implementations
- Handlers are injected via context, not created locally

## Future Extensions

### Potential Enhancements

1. **Multi-select support** — extend `NavContextType` with `items: M3eNavItemElement[]`
2. **Event cancellation** — expose `onInput` handler to allow `preventDefault()`
3. **Keyboard navigation** — integrate with M3E's keyboard support
4. **Nested navigation** — support hierarchical nav structures
5. **Accessibility** — enhance ARIA attributes and focus management

### Adding New Handlers

To add a new handler (e.g., `onItemHover`):

1. Add to `NavContextInternalType`
2. Define in `Nav` component with `useEffectEvent`
3. Expose via `useNavItemHandlers()`
4. Keep `NavContextType` unchanged (public API stability)

## Testing

### Unit Test Patterns

```typescript
// Test public API
const { item, isOpen } = useNav();
expect(item).toBe(selectedElement);

// Test internal handlers
const { onSelected } = useNavItemHandlers();
onSelected(mockElement);
expect(context.item).toBe(mockElement);

// Test NavItem integration
render(<NavItem selected={true} onChange={mockHandler} />);
expect(mockHandler).toHaveBeenCalled();
```

## References

- **M3E Documentation:** https://matraic.github.io/m3e/
- **M3E Nav Rail:** https://matraic.github.io/m3e/#/components/nav-rail.html
- **M3E Nav Bar:** https://matraic.github.io/m3e/#/components/nav-bar.html
- **Material Design 3 Navigation:** https://m3.material.io/components/navigation-rail/guidelines
