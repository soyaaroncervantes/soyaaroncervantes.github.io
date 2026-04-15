import { createFileRoute } from '@tanstack/react-router'
import { Theme } from '@/features/theme/components'
import { Nav } from '@/features/theme/components/nav/Nav'

export const Route = createFileRoute('/_rootLayout/v1/')({
  component: V1Page,
})

function V1Page() {
  return (
    <div>
      <Nav id="nav">
        <Nav.Rail>
          <Nav.Item>
            <Theme.Icon slot="icon" name="home" />
            Home
          </Nav.Item>
          <Nav.Item>
            <Theme.Icon slot="icon" name="settings" />
            Settings
          </Nav.Item>
          <Nav.Item>
            <Theme.Icon slot="icon" name="person" />
            Profile
          </Nav.Item>
        </Nav.Rail>
      </Nav>
    </div>
  )
}
