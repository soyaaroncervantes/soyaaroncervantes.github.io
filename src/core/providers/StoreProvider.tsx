import type { PropsWithChildren } from 'react'
import { createStore, Provider, type AppInitStoreProps } from '@/core/stores/app.store'
import { getPreferredColorScheme } from '@/features/theme/usePreferredColorScheme'

type Props = PropsWithChildren & {}

export const StoreProvider = ({ children }: Props) => {
  const scheme = getPreferredColorScheme()

  const storeInit: AppInitStoreProps = {
    scheme,
    color: "#0b467e"
  }
  return <Provider createStore={() => createStore(storeInit)}>{children}</Provider>
}
