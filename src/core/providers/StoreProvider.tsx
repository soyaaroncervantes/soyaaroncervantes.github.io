import type { PropsWithChildren } from 'react'
import { type AppInitStoreProps, createStore, Provider } from '@/core/stores/app.store'
import { getPreferredColorScheme } from '@/features/theme/usePreferredColorScheme'

type Props = PropsWithChildren & {}

export const StoreProvider = ({ children }: Props) => {
  const scheme = getPreferredColorScheme()
  const color = scheme === 'dark' ? '#aaceff' : '#1565a8'
  const storeInit: AppInitStoreProps = {
    scheme,
    color,
  }
  return <Provider createStore={() => createStore(storeInit)}>{children}</Provider>
}
