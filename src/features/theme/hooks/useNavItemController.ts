import type { M3eNavItem, M3eNavItemElement } from '@m3e/react/nav-bar'
import type { ComponentProps } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useNav } from '../components/nav/Nav'

type Props = ComponentProps<typeof M3eNavItem> & {
  icon?: string
}

export const useNavItemController = ({ selected, onChange: _onChange }: Props) => {
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
