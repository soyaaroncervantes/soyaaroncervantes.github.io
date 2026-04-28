import { useRouter, useRouterState } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import type { NavItemModel } from '../models/NavItemModel'
import type { NavbarMap } from '../types'

type UseNavbarControllerReturn = {
  navigationEntries: Array<[groupId: string, itemsSet: Set<NavItemModel> | null]>
  activeItem: NavItemModel | null
}

export const useNavbarController = (navigation: NavbarMap): UseNavbarControllerReturn => {
  const router = useRouter()
  const { location } = useRouterState()

  // 1. Transforma el Map en entradas (una sola vez)
  const navigationEntries = useMemo(() => Array.from(navigation.entries()), [navigation])

  // 2. Prefetch todas las rutas al montar
  useEffect(() => {
    for (const set of navigation.values()) {
      if (set === null) continue // Spacer, no hay ruta
      for (const model of set) {
        router.preloadRoute({ to: model.to })
      }
    }
  }, [router, navigation])

  // 3. Fuente de verdad: ruta actual del router
  const activeItem = useMemo(() => {
    const allItems = [...navigation.values()].flatMap((set) => (set === null ? [] : [...set]))

    return allItems.find((model) => model.to === location.pathname) ?? null
  }, [navigation, location.pathname])

  return { navigationEntries, activeItem }
}
