import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

vi.mock('@m3e/react/icon', () => ({
  M3eIcon: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <span data-testid="m3e-icon" {...props}>
      {children}
    </span>
  ),
}))

import { ThemeIcon } from '@/features/theme/components/icon/ThemeIcon'

describe('ThemeIcon', () => {
  it('renders a material icon for non-sprite names', () => {
    render(<ThemeIcon name="person" />)
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('name', 'person')
    expect(screen.getByTestId('m3e-icon')).toHaveAttribute('slot', 'icon')
  })

  it('renders svg sprite for registered sprite ids', () => {
    render(<ThemeIcon name="github" />)
    const svg = screen.getByLabelText('github icon')
    const useEl = svg.querySelector('use')
    expect(useEl?.getAttribute('href')).toMatch(/icons\.svg#github$/)
  })

  it('renders svg sprite for linkedin id', () => {
    render(<ThemeIcon name="linkedin" />)
    expect(screen.getByLabelText('linkedin icon')).toBeInTheDocument()
    expect(
      screen.getByLabelText('linkedin icon').querySelector('use')?.getAttribute('href')
    ).toMatch(/icons\.svg#linkedin$/)
  })
})
