import { M3eNavMenuItemGroup } from '@m3e/react/nav-menu'
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/core/layouts/Layout'
import { Nav } from '@/features/theme/components/nav/Nav'
import styles from './v1.module.css'

export const Route = createFileRoute('/_rootLayout/v1/')({
  component: V1Page,
})

function V1Page() {
  return (
    <Layout.Screen>
      <Nav id="nav">
        <Nav.Rail className={styles.nav}>
          <div className={styles.container}>
            <Nav.Item disabled className={styles.disabled} />
            <M3eNavMenuItemGroup className={styles.group}>
              <Nav.Item icon="person" />
              <Nav.Item icon="email" />
            </M3eNavMenuItemGroup>
            <M3eNavMenuItemGroup className={styles.group}>
              <Nav.Item icon="share" />
              <Nav.Item icon="download" />
            </M3eNavMenuItemGroup>
          </div>
        </Nav.Rail>
      </Nav>
      <Layout.Content>
        <section></section>
      </Layout.Content>
    </Layout.Screen>
  )
}
