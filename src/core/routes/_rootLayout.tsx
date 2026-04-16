import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '@/core/layouts/Layout'

export const Route = createFileRoute('/_rootLayout')({
  component: RootPage,
})

function RootPage() {
  return (
    <Layout.Base>
      <Outlet />
    </Layout.Base>
  )
}
