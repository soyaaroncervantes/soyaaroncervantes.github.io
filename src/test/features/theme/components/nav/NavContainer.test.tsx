import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NavContainer } from '@/features/theme/components/nav/NavContainer'
import styles from '@/features/theme/components/nav/nav.module.css'

describe('NavContainer', () => {
  it('renders children', () => {
    render(<NavContainer>Nav items</NavContainer>)
    expect(screen.getByText('Nav items')).toBeInTheDocument()
  })

  it('applies the base container CSS class', () => {
    const { container } = render(<NavContainer>items</NavContainer>)
    expect(container.firstChild).toHaveClass(styles.container)
  })

  it('merges an external className with the base class', () => {
    const { container } = render(
      <NavContainer className="page-nav">items</NavContainer>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass(styles.container)
    expect(el).toHaveClass('page-nav')
  })

  it('forwards additional HTML attributes', () => {
    render(<NavContainer data-testid="nav-container">items</NavContainer>)
    expect(screen.getByTestId('nav-container')).toBeInTheDocument()
  })

  it('renders as a div element', () => {
    const { container } = render(<NavContainer>items</NavContainer>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })
})
