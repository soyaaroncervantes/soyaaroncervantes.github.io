import { M3eNavItem } from '@m3e/react/nav-bar'
import type { ComponentProps, PropsWithChildren } from 'react'
import { useNavItemController } from '../../hooks/useNavItemController'
import { ThemeIcon } from '../icon/Icon'
import styles from './nav.module.css'

export type NavItemProps = PropsWithChildren &
  ComponentProps<typeof M3eNavItem> & {
    icon?: string
  }
export const NavItem = ({ children, className, ...props }: NavItemProps) => {
  const { m3eNavItemRef, isSelected, onChangeHandler } = useNavItemController(props)

  const resolvedClassName =
    [props.disabled && styles.disabled, className].filter(Boolean).join(' ') || undefined

  return (
    <M3eNavItem
      {...props}
      selected={isSelected}
      ref={m3eNavItemRef}
      onChange={onChangeHandler}
      className={resolvedClassName}
    >
      {props.icon && <ThemeIcon slot="icon" name={props.icon} />}
      {children}
    </M3eNavItem>
  )
}
