# Mejora del Compound Component Nav + AGENTS.md

Refactorizar el Nav compound component agregando `Nav.Group` y `Nav.Container`, actualizar `AGENTS.md` del nav, y crear un nuevo `AGENTS.md` en `src/features/theme/components` documentando los patrones comunes del codebase.

---

## Cambios a implementar

### 1. Crear `NavGroup.tsx`
**Archivo:** `src/features/theme/components/nav/NavGroup.tsx` (nuevo)

- Wrappea `M3eNavMenuItemGroup` (no un `div` — así está en `V1Page`)
- Tipo: `PropsWithChildren & ComponentProps<typeof M3eNavMenuItemGroup>`
- Clase base: `styles.group`
- Acepta `className` adicional: `[styles.group, className].filter(Boolean).join(' ')`

```tsx
export const NavGroup = ({ children, className, ...props }: Props) => (
  <M3eNavMenuItemGroup
    {...props}
    className={[styles.group, className].filter(Boolean).join(' ')}
  >
    {children}
  </M3eNavMenuItemGroup>
)
```

### 2. Crear `NavContainer.tsx`
**Archivo:** `src/features/theme/components/nav/NavContainer.tsx` (nuevo)

- Renderiza un `div` nativo (no un componente M3E)
- Tipo: `PropsWithChildren & HTMLAttributes<HTMLDivElement>`
- Clase base: `styles.container`
- Acepta `className` adicional

```tsx
export const NavContainer = ({ children, className, ...props }: Props) => (
  <div {...props} className={[styles.container, className].filter(Boolean).join(' ')}>
    {children}
  </div>
)
```

### 3. Mejorar `NavItem.tsx` — clase `disabled` condicional
**Archivo:** `src/features/theme/components/nav/NavItem.tsx`

- Agregar clase `styles.disabled` cuando `disabled === true`
- Combinar con `className` recibido via props:
  ```tsx
  className={[disabled && styles.disabled, className].filter(Boolean).join(' ')}
  ```

### 4. Actualizar exports en `Nav.tsx`

```tsx
Nav.Group = NavGroup
Nav.Container = NavContainer
```

### 5. `nav.module.css`
Las clases `.container`, `.group`, `.disabled` ya existen. Sin cambios.

### 6. Actualizar `V1Page`
**Archivo:** `src/core/routes/_rootLayout/v1/index.tsx`

- Reemplazar `<M3eNavMenuItemGroup className={styles.group}>` → `<Nav.Group>`
- Reemplazar `<div className={styles.container}>` → `<Nav.Container>`
- Eliminar import de `M3eNavMenuItemGroup`
- Las clases `.container`, `.group`, `.disabled` en `v1.module.css` quedan redundantes — eliminarlas

```tsx
<Nav.Rail className={styles.nav}>
  <Nav.Container>
    <Nav.Item disabled />
    <Nav.Group>
      <Nav.Item icon="person" selected />
      <Nav.Item icon="email" />
    </Nav.Group>
    <Nav.Group>
      <Nav.Item icon="share" />
      <Nav.Item icon="download" />
    </Nav.Group>
  </Nav.Container>
</Nav.Rail>
```

### 7. Actualizar `nav/AGENTS.md`
Agregar secciones para `Nav.Group`, `Nav.Container`, y la lógica condicional de `Nav.Item`.

### 8. Crear `src/features/theme/components/AGENTS.md`
Documentar los **patrones comunes** observados en el codebase:

- **Wrapper M3E** — cómo envolver un componente M3E con `ComponentProps<typeof M3eXxx>`
- **Wrapper nativo** — cómo envolver un elemento HTML con `HTMLAttributes<HTMLElement>`
- **Prop spreading** — `...props` para heredar todas las props del componente base
- **Clase base + override** — `[styles.base, className].filter(Boolean).join(' ')`
- **Clases condicionales** — `[condition && styles.cls, className].filter(Boolean).join(' ')`
- **Compound components** — definir sub-componentes como propiedades (`Nav.Rail`, `Card.Header`)
- **Tipos comunes** — `PropsWithChildren`, `ComponentProps`, `HTMLAttributes`

---

## Archivos afectados

| Archivo | Acción |
|---|---|
| `nav/NavGroup.tsx` | ➕ Nuevo |
| `nav/NavContainer.tsx` | ➕ Nuevo |
| `nav/NavItem.tsx` | ✏️ Clase disabled condicional |
| `nav/Nav.tsx` | ✏️ Exports Nav.Group, Nav.Container |
| `nav/nav.module.css` | ✅ Sin cambios |
| `nav/AGENTS.md` | ✏️ Actualizar con nuevos componentes |
| `components/AGENTS.md` | ➕ Nuevo — patrones comunes |
| `v1/index.tsx` | ✏️ Usar Nav.Group, Nav.Container |
| `v1/v1.module.css` | ✏️ Eliminar clases redundantes |
