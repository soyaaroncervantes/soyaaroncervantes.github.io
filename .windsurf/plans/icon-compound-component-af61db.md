# Icon Compound Component Refactor

Create a compound component `Icon` with sub-component `Icon.Svg` as standalone exports (not under `Theme` namespace).

## Overview

- Create `src/features/theme/components/icon/` folder with `Icon.tsx` and `Svg.tsx`
- `Icon` becomes the root compound component (replaces `Theme.Icon`)
- `Icon.Svg` becomes the sub-component (replaces `Theme.Svg` and `Theme.Icon.Svg`)
- Export `Icon` compound from `icon/Icon.tsx` with type intersection (no barrel export)
- Remove `Icon` and `Svg` from `Theme` namespace in `components/index.ts`
- Usage: `import { Icon } from '@/features/theme/components/icon/Icon'` → `<Icon />` and `<Icon.Svg />`
- Add unit tests following `src/test/AGENTS.md` conventions
- Run `bun check` to verify TypeScript and imports

## Implementation Steps

1. **Create folder structure**
   - Create `src/features/theme/components/icon/` directory
   - Create `icon.module.css` (if base styles needed)

2. **Create Icon root component** (`icon/Icon.tsx`)
   - Wrap `M3eIcon` with `ComponentProps<typeof M3eIcon>` + `PropsWithChildren`
   - Merge base CSS class if needed
   - Register `Svg` sub-component as `Icon.Svg`

3. **Create Svg sub-component** (`icon/Svg.tsx`)
   - Move existing `Svg.tsx` logic into this file
   - Keep all props: `SVGAttributes<SVGSVGElement>` + `id`, `href`, `color`

4. **Update exports** (`components/index.ts`)
   - Remove `Icon` and `Svg` from `Theme` namespace
   - Do NOT export `Icon` from `components/index.ts`
   - `Icon` is imported directly from `icon/Icon.tsx` by consumers

5. **Create unit tests**
   - `src/test/features/theme/components/icon/Icon.test.tsx` — test root component rendering
   - `src/test/features/theme/components/icon/Svg.test.tsx` — test Svg sub-component rendering and props

6. **Verify**
   - Run `bun check` to ensure no TypeScript errors
   - Run `bun run test -- --run src/test/features/theme/components/icon/` to verify tests pass

## Code Examples

### Before (Current State)

**`components/index.ts`:**
```ts
import { ThemeCard } from './card/Card'
import { ThemeIcon } from './Icon'      // ← será movido
import { ThemeSvg } from './Svg'        // ← será movido
import { ThemeText } from './Text'

export const Theme = {
  Card: ThemeCard,
  Text: ThemeText,
  Icon: ThemeIcon,    // ← será removido
  Svg: ThemeSvg,      // ← será removido
}
```

**Usage:**
```tsx
import { Theme } from '@/features/theme/components'
<Theme.Icon />
<Theme.Svg id="github" />
```

### After (New State)

**`components/index.ts`:**
```ts
import { ThemeCard } from './card/Card'
import { ThemeText } from './Text'

export const Theme = {
  Card: ThemeCard,
  Text: ThemeText,
  // Icon y Svg ya no están aquí
}
```

**`components/icon/Icon.tsx`:** (NUEVO)
```ts
import { M3eIcon } from '@m3e/react/icon'
import type { ComponentProps, PropsWithChildren } from 'react'
import { ThemeIconSvg } from './Svg'

export type ThemeIconProps = PropsWithChildren & ComponentProps<typeof M3eIcon>

export const ThemeIcon = ({ children, ...props }: ThemeIconProps) => {
  return <M3eIcon {...props}>{children}</M3eIcon>
}

// Registrar sub-componentes como propiedades
export const Icon = ThemeIcon as typeof ThemeIcon & {
  Svg: typeof ThemeIconSvg
}

Icon.Svg = ThemeIconSvg
```

**`components/icon/Svg.tsx`:** (MOVIDO de `components/Svg.tsx`)
```ts
import type { SVGAttributes } from 'react'

type Props = SVGAttributes<SVGSVGElement> & {
  id: string
  href?: string
  color?: string
}

export const ThemeIconSvg = ({ id, href = '/icons.svg', color, ...props }: Props) => {
  return (
    <svg style={{ color }} {...props}>
      <use href={`${href}#${id}`} />
    </svg>
  )
}
```

**Usage:**
```tsx
import { Icon } from '@/features/theme/components/icon/Icon'
<Icon />
<Icon.Svg id="github" />
```

## Notes

- No Context needed — sub-components are independent, only namespace grouping
- Props remain unchanged — all M3E and SVG attributes forwarded via spread
- `Icon` is exported directly from `icon/Icon.tsx` (not via `components/index.ts`)
- Export pattern in `icon/Icon.tsx`: `Icon = ThemeIcon as typeof ThemeIcon & { Svg: typeof ThemeIconSvg }` with `Icon.Svg = ThemeIconSvg`
- Import path: `import { Icon } from '@/features/theme/components/icon/Icon'`
- Test structure mirrors source: `src/test/features/theme/components/icon/`
- Mock `@m3e/react/icon` in tests using the pattern from `src/test/AGENTS.md`
