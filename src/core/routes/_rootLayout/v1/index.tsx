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
            <nav className={styles['nav--group']}>
              <Nav.Item icon="person" selected>
                Sobre mí
              </Nav.Item>
              <Nav.Item icon="email">Contacto</Nav.Item>
            </nav>
            <nav className={styles['nav--group']}>
              <Nav.Item icon="share">Compartir</Nav.Item>
              <Nav.Item icon="download">CV</Nav.Item>
            </nav>
          </div>
        </Nav.Rail>
      </Nav>
      <Layout.Content>
        <section></section>
      </Layout.Content>
    </Layout.Screen>
  )
}
