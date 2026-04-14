import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BaseLayout } from '@/core/layouts/BaseLayout'
import layoutStyles from '@/core/layouts/layout.module.css'

export const Route = createFileRoute('/_rootLayout')({
  component: RootPage,
})

function RootPage() {
  return (
    <BaseLayout className={`${layoutStyles.layout} ${layoutStyles.root}`}>
      <Outlet />
    </BaseLayout>
  )
}
