import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

vi.mock('@m3e/react/icon', () => ({
  M3eIcon: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-icon" {...props}>
      {children}
    </span>
  ),
}))

import { Icon } from '@/features/theme/components/icon/Icon'
import { IconSvg } from '@/features/theme/components/icon/IconSvg'

describe('Icon', () => {
  it('renders M3E icon with slot="icon" by default', () => {
    render(<Icon name="person" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('slot', 'icon')
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('name', 'person')
  })

  it('forwards props to M3eIcon', () => {
    render(<Icon name="person" aria-label="user icon" className="icon-sm" />)
    const el = screen.getByTestId('m3e-icon')
    expect(el).toHaveAttribute('aria-label', 'user icon')
    expect(el).toHaveClass('icon-sm')
  })
})

describe('Icon.Svg', () => {
  it('is IconSvg on the compound', () => {
    expect(Icon.Svg).toBe(IconSvg)
  })

  it('renders sprite markup via compound', () => {
    render(<Icon.Svg name="github" spriteHref="/icons.svg" data-testid="iso-svg" />)
    const svg = screen.getByTestId('iso-svg')
    expect(svg.querySelector('use')).toHaveAttribute('href', '/icons.svg#github')
  })
})
