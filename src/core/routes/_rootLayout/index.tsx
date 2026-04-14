import { createFileRoute } from '@tanstack/react-router'
import { Theme } from '@/features/theme/components'

export const Route = createFileRoute('/_rootLayout/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <Theme.Text variant="display" size="large">
        Project Template
      </Theme.Text>
      <Theme.Card>
        <Theme.Text variant="label" size="large" style={{ margin: '1rem' }}>
          To update layout styles, check the <code>src/core/layouts</code> folder.
        </Theme.Text>
      </Theme.Card>
    </div>
  )
}
