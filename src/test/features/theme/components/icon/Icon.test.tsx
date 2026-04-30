import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/icon', () => ({
  M3eIcon: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-icon" {...props}>
      {children}
    </span>
  ),
}))

import { ThemeIcon } from '@/features/theme/components/icon/Icon'

describe('ThemeIcon', () => {
  it('renders a material icon for non-sprite names', () => {
    render(<ThemeIcon name="person" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('name', 'person')
    expect(screen.getByTestId('m3e-icon')).toHaveTextContent('person')
  })

  it('forwards props to the M3E icon', () => {
    render(<ThemeIcon name="person" aria-label="user icon" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('aria-label', 'user icon')
  })

  it('forwards className prop', () => {
    render(<ThemeIcon name="person" className="icon-sm" />)
    expect(screen.getByTestId('m3e-icon')).toHaveClass('icon-sm')
  })

  it('renders svg sprite for known sprite names', () => {
    render(<ThemeIcon name="github" data-testid="sprite-icon" aria-label="GitHub Icon" />)

    const svg = screen.getByTestId('sprite-icon')
    const useElement = svg.querySelector('use')

    expect(svg.tagName.toLowerCase()).toBe('svg')
    expect(svg).toHaveAttribute('aria-label', 'GitHub Icon')
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
})
