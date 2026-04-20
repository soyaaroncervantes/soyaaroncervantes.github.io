import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/core/layouts/Layout'
import { Theme } from '@/features/theme/components'
import { Card } from '@/features/theme/components/card/Card'
import { Nav } from '@/features/theme/components/nav/Nav'
import profileStyles from './profile.module.css'
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
        <section className={styles.profile}>
          <Card className={profileStyles.card}>
            <img
              slot="header"
              className={profileStyles.img}
              alt="Profile"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
            />
            <div className={profileStyles.container}>
              <Card.Content className={profileStyles.content}>
                <Theme.Text variant="headline" size="large">
                  Aarón Cervantes
                </Theme.Text>
                <Theme.Text variant="title">Senior Frontend Engineer</Theme.Text>
              </Card.Content>
              <Card.Footer className={profileStyles.footer}>
                <Theme.Text variant="title" size="small">
                  Linkedin
                </Theme.Text>
                <Theme.Text variant="title" size="small">
                  Github
                </Theme.Text>
              </Card.Footer>
            </div>
          </Card>
        </section>
      </Layout.Content>
    </Layout.Screen>
  )
}
