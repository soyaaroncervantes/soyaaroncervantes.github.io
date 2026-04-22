import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeCardContent } from '@/features/theme/components/card/CardContent'

describe('ThemeCardContent', () => {
  it('renders children', () => {
    // Arrange & Act
    render(<ThemeCardContent>Card body</ThemeCardContent>)

    // Assert
    expect(screen.getByText('Card body')).toBeInTheDocument()
  })

  it('has slot="content" attribute', () => {
    // Arrange & Act
    const { container } = render(<ThemeCardContent>body</ThemeCardContent>)

    // Assert
    expect(container.firstChild).toHaveAttribute('slot', 'content')
  })

  it('forwards className prop', () => {
    // Arrange & Act
    const { container } = render(<ThemeCardContent className="custom-class">body</ThemeCardContent>)

    // Assert
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('forwards additional HTML attributes', () => {
    // Arrange & Act
    render(<ThemeCardContent data-testid="card-content">body</ThemeCardContent>)

    // Assert
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })
})
