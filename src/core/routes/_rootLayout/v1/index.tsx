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
          <Nav.Container className={styles.container}>
            <Nav.Item disabled />
            <Nav.Group>
              <Nav.Item icon="person" selected />
              <Nav.Item icon="email" />
            </Nav.Group>
            <Nav.Group>
              <Nav.Item icon="share" />
              <Nav.Item icon="download" />
            </Nav.Group>
          </Nav.Container>
        </Nav.Rail>
      </Nav>
      <Layout.Content className={styles.content}>
        <section></section>
      </Layout.Content>
    </Layout.Screen>
  )
}
