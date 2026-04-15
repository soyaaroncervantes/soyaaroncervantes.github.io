import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BaseLayout } from '@/core/layouts/BaseLayout'

export const Route = createFileRoute('/_rootLayout')({
  component: RootPage,
})

function RootPage() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
