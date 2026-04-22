# NavItem ViewController Hook

Extraer la lógica de selección de `NavItem` a `useNavItemController`, dejando el componente como UI pura que maneja solo el styling condicional.

---

## Responsabilidades por capa

- **Hook `useNavItemController`** — lógica de selección: refs, handlers, useEffect, contexto
- **`NavItem` (View)** — UI pura: styling condicional (`resolvedClassName`, `disabled`), renderizado

---

## `useNavItemController` (`src/features/theme/hooks/useNavItemController.ts`)

Acepta todas las props de `NavItem` (spread de `Props`), retorna solo lo que el componente necesita:

```ts
type Props = ComponentProps<typeof M3eNavItem> & { icon?: string }

export const useNavItemController = ({ selected, onChange, ...props }: Props) => {
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

---

## `NavItem.tsx` (View)

Recibe props completas, pasa todo al hook, maneja `className` y `disabled` aquí (UI concerns):

```tsx
export const NavItem = ({ children, className, ...props }: Props) => {
  const { m3eNavItemRef, isSelected, onChangeHandler } = useNavItemController(props)

  const resolvedClassName = [props.disabled && styles.disabled, className].filter(Boolean).join(' ') || undefined

  return (
    <M3eNavItem {...props} selected={isSelected} ref={m3eNavItemRef} onChange={onChangeHandler} className={resolvedClassName}>
      {props.icon && <Theme.Icon slot="icon" name={props.icon} />}
      {children}
    </M3eNavItem>
  )
}
```

---

## Archivos afectados

| Archivo | Acción |
|---|---|
| `src/features/theme/hooks/useNavItemController.ts` | ➕ Nuevo |
| `src/features/theme/components/nav/NavItem.tsx` | ✏️ Consume el hook, retiene styling condicional |
| `src/features/theme/components/nav/AGENTS.md` | ✏️ Documentar el hook |
