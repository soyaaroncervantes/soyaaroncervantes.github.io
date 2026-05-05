import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IconSvg } from '@/features/theme/components/icon/IconSvg'

describe('IconSvg', () => {
  it('builds use href from spriteHref and name', () => {
    render(<IconSvg name="github" spriteHref="/icons.svg" data-testid="sprite" />)
    const svg = screen.getByTestId('sprite')
    expect(svg.querySelector('use')).toHaveAttribute('href', '/icons.svg#github')
    expect(svg.querySelector('use')).toHaveAttribute('xlink:href', '/icons.svg#github')
  })

  it('sets aria-label from icon name', () => {
    render(<IconSvg name="linkedin" spriteHref="/custom.svg" />)
    expect(screen.getByLabelText('linkedin icon')).toBeInTheDocument()
  })

  it('defaults fill to currentColor', () => {
    render(<IconSvg name="x" spriteHref="/icons.svg" data-testid="sprite" />)
    expect(screen.getByTestId('sprite')).toHaveAttribute('fill', 'currentColor')
  })

  it('forwards extra svg attributes', () => {
    render(<IconSvg name="github" spriteHref="/i.svg" className="size-4" data-testid="sprite" />)
    expect(screen.getByTestId('sprite')).toHaveClass('size-4')
  })
})
