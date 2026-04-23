import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/core/layouts/Layout'
import { userModel } from '@/features/profile/models/user.model'
import { Profile } from '@/features/profile/Provider'
import { Theme } from '@/features/theme/components'
import { Button } from '@/features/theme/components/button/Button'
import { Card } from '@/features/theme/components/card/Card'
import { Icon } from '@/features/theme/components/icon/Icon'
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
        <Nav.Rail className={styles.nav} color="primary">
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
          <Profile model={userModel}>
            <Card className={profileStyles.card} color="secondary">
              <Card.Header className={profileStyles.header}>
                <Profile.Photo className={profileStyles.img} />
              </Card.Header>
              <div className={profileStyles.container}>
                <Card.Content className={profileStyles.content}>
                  <Profile.Name variant="headline" size="large" />
                  <Profile.JobTitle />
                </Card.Content>
                <Card.Footer className={profileStyles.footer}>
                  <Button.Icon
                    size="small"
                    href="https://github.com/soyaaroncervantes"
                    target="_blank"
                  >
                    <Icon.Svg id="github" aria-label="GitHub" />
                  </Button.Icon>
                  <Button.Icon href="https://linkedin.com/in/soyaaroncervantes" target="_blank">
                    <Icon.Svg id="linkedin" aria-label="LinkedIn" />
                  </Button.Icon>
                </Card.Footer>
              </div>
            </Card>
            <div className={`${profileStyles.section} ${profileStyles.container}`}>
              <article className={profileStyles.article}>
                <Theme.Text variant="display" size="small">
                  About me
                </Theme.Text>
                <Theme.Text variant="label" className={profileStyles.description}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias perferendis ex
                  ea possimus in, accusantium ullam aliquid voluptatum praesentium itaque mollitia
                  quis ipsam consequatur minus. Asperiores dicta cupiditate recusandae debitis!
                </Theme.Text>
              </article>
              <article className={profileStyles.article}>
                <Theme.Text variant="display" size="small">
                  Knowledge
                </Theme.Text>
                <Theme.Text variant="label" className={profileStyles.description}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias perferendis ex
                  ea possimus in, accusantium ullam aliquid voluptatum praesentium itaque mollitia
                  quis ipsam consequatur minus. Asperiores dicta cupiditate recusandae debitis!
                </Theme.Text>
              </article>
            </div>
          </Profile>
        </section>
      </Layout.Content>
    </Layout.Screen>
  )
}
