import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/')({
  beforeLoad: () => {
    throw redirect({ to: '/v2' })
  },
})
