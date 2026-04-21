import type { PropsWithChildren } from 'react'
import { I18nProvider } from '@/features/i18n/providers/I18nProvider'
import { QueryProvider } from './QueryProvider'
import { StoreProvider } from './StoreProvider'
import { ThemeProvider } from './ThemeProvider'

type Props = PropsWithChildren & {}
export const AppProvider = ({ children }: Props) => {
  return (
    <StoreProvider>
      <QueryProvider>
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </QueryProvider>
    </StoreProvider>
  )
}
