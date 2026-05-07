import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Layout } from '@/core/layouts/Layout'

describe('Screen + Content scroll shell', () => {
  it('nests Content inside Screen under Base like _rootLayout routes', () => {
    render(
      <Layout.Base>
        <Layout.Screen data-testid="screen-shell">
          <Layout.Content>main body</Layout.Content>
        </Layout.Screen>
      </Layout.Base>
    )

    expect(screen.getByTestId('screen-shell')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('main body')
  })
})
