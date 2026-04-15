import { Theme } from '@/features/theme/components'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/v2/')({
  component: V2Page,
})

function V2Page() {
  const navigate = useNavigate()

  return (
    <div>
      <Theme.Button onClick={() => navigate({ to: '/v1' })}>
        Go to V1
      </Theme.Button>
    </div>
  )
}
