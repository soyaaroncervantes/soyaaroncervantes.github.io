import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/icon', () => ({
  M3eIcon: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-icon" {...props}>
      {children}
    </span>
  ),
}))

import { Icon, ThemeIcon } from '@/features/theme/components/icon/Icon'

describe('Theme.Icon (Facade)', () => {
  it('renders a material icon for non-sprite names', () => {
    render(<ThemeIcon name="person" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('name', 'person')
  })

  it('forwards props to the M3E icon', () => {
    render(<ThemeIcon name="person" aria-label="user icon" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('aria-label', 'user icon')
  })

  it('forwards className prop', () => {
    render(<ThemeIcon name="person" className="icon-sm" />)
    expect(screen.getByTestId('m3e-icon')).toHaveClass('icon-sm')
  })

  it('applies slot="icon" by default on material branch', () => {
    render(<ThemeIcon name="person" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('slot', 'icon')
  })

  it('allows overriding slot on material branch', () => {
    render(<ThemeIcon name="person" slot="leading" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('slot', 'leading')
  })

  it('renders svg sprite for known sprite names', () => {
    render(
      <ThemeIcon
        name="github"
        spriteHref="/icons.svg"
        data-testid="sprite-icon"
        aria-label="GitHub Icon"
      />
    )

    const svg = screen.getByTestId('sprite-icon')
    const useElement = svg.querySelector('use')

    expect(svg.tagName.toLowerCase()).toBe('svg')
    expect(svg).toHaveAttribute('aria-label', 'GitHub Icon')
    expect(svg).toHaveAttribute('slot', 'icon')
    expect(useElement).toHaveAttribute('href', '/icons.svg#github')
  })

  it('uses custom spriteHref and forwards color style', () => {
    render(
      <ThemeIcon
        name="linkedin"
        spriteHref="/custom-icons.svg"
        color="red"
        data-testid="sprite-custom"
      />
    )

    const svg = screen.getByTestId('sprite-custom')
    const useElement = svg.querySelector('use')

    expect(useElement).toHaveAttribute('href', '/custom-icons.svg#linkedin')
    expect(svg).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })

  it('exposes Theme.Icon.Svg same as Icon.Svg', () => {
    expect(ThemeIcon.Svg).toBe(Icon.Svg)
  })
})

describe('Icon (compound)', () => {
  it('renders M3E root with slot="icon" by default', () => {
    render(<Icon name="person" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('slot', 'icon')
  })

  it('renders Icon.Svg in isolation', () => {
    render(
      <Icon.Svg name="github" spriteHref="/icons.svg" data-testid="iso-svg" aria-label="Git" />
    )
    const svg = screen.getByTestId('iso-svg')
    expect(svg.querySelector('use')).toHaveAttribute('href', '/icons.svg#github')
    expect(svg).toHaveAttribute('slot', 'icon')
  })

  it('registers Svg on the compound', () => {
    expect(Icon.Svg).toBeDefined()
  })
})
