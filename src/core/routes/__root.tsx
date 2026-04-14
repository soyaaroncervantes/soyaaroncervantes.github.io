import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppProvider } from '../providers/AppProvider'

export const Route = createRootRoute({
  component: () => (
    <AppProvider>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </AppProvider>
  ),
})
