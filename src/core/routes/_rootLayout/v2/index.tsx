import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/features/theme/components/button/Button'

export const Route = createFileRoute('/_rootLayout/v2/')({
  component: V2Page,
})

function V2Page() {
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={() => navigate({ to: '/v1' })}>Go to V1</Button>
    </div>
  )
}
