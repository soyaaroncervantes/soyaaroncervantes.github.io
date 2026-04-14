import type { PropsWithChildren } from 'react'
import { QueryProvider } from './QueryProvider'
import { StoreProvider } from './StoreProvider'
import { ThemeProvider } from './ThemeProvider'

type Props = PropsWithChildren & {}
export const AppProvider = ({ children }: Props) => {
  return (
    <StoreProvider>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </StoreProvider>
  )
}
