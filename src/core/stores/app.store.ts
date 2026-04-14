import { create, type StoreApi } from 'zustand'
import { withSlices } from 'zustand-slices'
import { createContext } from 'zustand-utils'
import { apiClientsSlice } from '@/core/clients/api.stores'
import { createThemeSlice, type ThemeSliceInitProps } from '@/features/theme/theme.stores'
import { createDevtools } from './devtools.store'

export type AppInitStoreProps = ThemeSliceInitProps

const storeConfig = withSlices(createThemeSlice(), apiClientsSlice)
export type AppStore = ReturnType<typeof storeConfig>

const devtools = createDevtools('App')
export const createStore = (initProps?: AppInitStoreProps) => {
  const config = withSlices(createThemeSlice(initProps), apiClientsSlice)
  return create<AppStore>()(devtools(config))
}

type AppStoreApi = StoreApi<AppStore>

export const { Provider, useStore } = createContext<AppStoreApi>()
