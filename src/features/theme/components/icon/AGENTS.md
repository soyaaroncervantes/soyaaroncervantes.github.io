# Agent Context — Icon Components

> **Global references:** `src/AGENTS.md`, `src/features/theme/components/AGENTS.md`, `src/features/theme/AGENTS.md`

Icons are delivered in **two ways**: M3E / Material Symbols (biblioteca) and **SVG sprite** (`<use>`). The **compound** `Icon` groups format-specific pieces; **`Theme.Icon`** is the **Facade** most callers should use.

---

## `Theme.Icon` — Facade (primera opción)

**Qué patrón:** [Facade](https://refactoring.guru/design-patterns/facade) (GoF, estructural): una interfaz simple sobre un subsistema con varias partes (M3E, sprite, registry, defaults, sync Lit).

**Por qué:** el consumidor pasa un `name` y no bifurca JSX por formato; la fachada despacha según [`registry.ts`](./registry.ts) y puede evolucionar (nuevos formatos, cambios internos) sin tocar cada pantalla.

| Rol | En este código |
|-----|-----------------|
| **Cliente** | Páginas, navbar, UI que solo pasa `name` (y props comunes). |
| **Subsistema** | `<Icon />` (M3E), `<Icon.Svg />`, `isSpriteIcon`, `spriteHref` / `BASE_URL`, `slot`, `M3eMaterialIcon` / Lit. |
| **Facade** | `Theme.Icon` (`ThemeIcon` en `Icon.tsx`). |

**Distinción:** el **compound** `Icon` + `Icon.Svg` agrupa subs por **formato de entrega**; el **rol Facade** es solo de `Theme.Icon`, que compone esas piezas internamente.

**API:** `Theme.Icon` aplica **`slot="icon"` por defecto** al nodo proyectado en slots M3E; se puede sobreescribir con `slot={…}`.

**Alias DX:** `Theme.Icon.Svg` apunta al mismo componente que `Icon.Svg` (uso avanzado sin importar `Icon`).

---

## Compound `Icon` — edge cases e import directo

El barrel `Theme` **solo** expone `Theme.Icon` (fachada). El compound se importa así:

```ts
import { Icon } from '@/features/theme/components/icon/Icon'
```

| Sub | Formato | Uso típico |
|-----|---------|------------|
| `<Icon />` | M3E (biblioteca) | Forzar icono Material sin pasar por la fachada; tests; migraciones. |
| `<Icon.Svg />` | SVG sprite (`<use>`) | Forzar sprite explícito (p. ej. `name` + `spriteHref`); prototipos. |
| *Futuro* (`Icon.Woff2`, etc.) | Otro formato | Misma convención: **nombre del sub = formato**. |

**Mantenimiento de tablas:** si cambia el contrato de la fachada, nuevas ramas o formatos, **actualizar en el mismo PR** esta tabla y la tabla Facade de arriba.

---

## Cuándo usar qué

| Situación | Preferencia |
|-----------|-------------|
| Cualquier UI que «tenga un icono» por **nombre** semántico | **`<Theme.Icon name={…} />`**. |
| Forzar formato, pruebas aisladas, o control fino del SVG | **`<Icon />`**, **`<Icon.Svg />`**, o futuros subs. |

---

## Registry y sprite

- `registry.ts` + `SPRITE_ICON_IDS` deciden si `name` es sprite; ids deben existir en `public/icons.svg`.
- Al añadir un `<symbol>` en `public/icons.svg`, añadir su id a `SPRITE_ICON_IDS` (ver tests en `__tests__/registry.test.ts`).

---

## Navegación (nav rail / nav bar)

- **`NavbarItems`** y similares usan **`Theme.Icon`** con despacho unificado (sprite o M3E según `name`).
- Los modelos pueden seguir usando nombres Material; si un `name` está en el registry, se renderiza sprite.

---

## Nombres públicos (subs del compound)

- **Sí:** subs nombrados por **formato de entrega** (`Icon.Svg`, futuros por extensión).
- **No** como API principal del compound: `Icon.Slot` (jerga M3E), `Icon.Material` (marca/implementación en lugar de formato). Ver también el bullet en `AGENTS.md` raíz del workspace sobre nombres por formato.

---

## Archivos

- `Icon.tsx` — `ThemeIcon` (Facade), `Icon` (compound), `ThemeIconM3e`, `ThemeIconSvg`.
- `M3eMaterialIcon.tsx` — sync del atributo Lit `name` con React 19.
- `registry.ts` — ids de sprite.
