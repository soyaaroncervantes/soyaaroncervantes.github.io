import type { PropsWithChildren } from 'react'
import { createStore, Provider } from '@/core/stores/app.store'
import { getPreferredColorScheme } from '@/features/theme/usePreferredColorScheme'

type Props = PropsWithChildren & {}

export const StoreProvider = ({ children }: Props) => {
  const theme = getPreferredColorScheme()
  return <Provider createStore={() => createStore({ theme })}>{children}</Provider>
}
