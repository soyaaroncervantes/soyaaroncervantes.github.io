import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { shouldRedirect } from '@/paraglide/runtime.js'
import { AppProvider } from '../providers/AppProvider'

export const Route = createRootRoute({
  beforeLoad: async () => {
    const decision = await shouldRedirect({ url: window.location.href })
    if (decision.redirectUrl) {
      throw redirect({ href: decision.redirectUrl.href })
    }
  },
  component: () => (
    <AppProvider>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </AppProvider>
  ),
})
