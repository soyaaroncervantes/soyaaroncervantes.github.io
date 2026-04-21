import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { Nullable } from '@/shared/base.types'
import { type I18nType, useI18nController } from '../hooks/useI18nController'

type I18nContextValue = PropsWithChildren & I18nType & {}

const I18nContext = createContext<Nullable<I18nContextValue>>(null)

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const controller = useI18nController()

  return <I18nContext.Provider value={controller}>{children}</I18nContext.Provider>
}

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
