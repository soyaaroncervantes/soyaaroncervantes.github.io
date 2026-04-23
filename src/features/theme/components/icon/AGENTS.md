# Agent Context — Icon Component

> **Global patterns reference:** See `src/AGENTS.md` and `components/AGENTS.md` for component pattern definitions.

The `icon` directory contains M3E icon wrapper components.

---

## Structure

```
src/features/theme/components/icon/
  AGENTS.md         — This file
  Icon.tsx          — M3E icon wrapper (if needed)
```

---

## Pattern

Icon components follow the **M3E wrapper pattern** (see `components/AGENTS.md` §1):

```tsx
import { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps, PropsWithChildren } from 'react'

type Props = PropsWithChildren & ComponentProps<typeof M3eIcon>

export const Icon = ({ children, ...props }: Props) => {
  return <M3eIcon {...props}>{children}</M3eIcon>
}
```

**Key rules:**
- Always spread `...props` to forward all M3E props
- Use `ComponentProps<typeof M3eXxx>` to inherit the full M3E type signature
- Do not add custom logic — keep it a thin wrapper

---

## Export

Icon components are exported from `components/index.ts` under the `Theme` namespace:

```ts
export { Icon as ThemeIcon } from './icon/Icon'
```

Usage:
```tsx
import { Theme } from '@/features/theme/components'

<Theme.Icon name="person" />
```

---

## References

- `components/AGENTS.md` — M3E wrapper pattern (§1)
- `AGENTS.md` (parent) — Theme feature overview
