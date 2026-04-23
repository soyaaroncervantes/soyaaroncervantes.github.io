import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/icon-button', () => ({
  M3eIconButton: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <button data-testid="m3e-icon-button" {...props}>
      {children}
    </button>
  ),
}))

import { ThemeButtonIcon } from '@/features/theme/components/button/ButtonIcon'

describe('ButtonIcon', () => {
  it('renders children', () => {
    // Arrange & Act
    render(<ThemeButtonIcon>Icon</ThemeButtonIcon>)

    // Assert
    expect(screen.getByText('Icon')).toBeInTheDocument()
  })

  it('forwards props to the M3E icon button', () => {
    // Arrange & Act
    render(
      <ThemeButtonIcon aria-label="favorite" href="https://example.com">
        Icon
      </ThemeButtonIcon>
    )

    // Assert
    const button = screen.getByTestId('m3e-icon-button')
    expect(button).toHaveAttribute('aria-label', 'favorite')
    expect(button).toHaveAttribute('href', 'https://example.com')
  })

  it('forwards className prop', () => {
    // Arrange & Act
    render(<ThemeButtonIcon className="custom-class">Icon</ThemeButtonIcon>)

    // Assert
    expect(screen.getByTestId('m3e-icon-button')).toHaveClass('custom-class')
  })

  it('forwards data-testid and other standard attributes', () => {
    // Arrange & Act
    render(
      <ThemeButtonIcon data-testid="custom-icon-button" title="My Button">
        Icon
      </ThemeButtonIcon>
    )

    // Assert
    const button = screen.getByTestId('custom-icon-button')
    expect(button).toHaveAttribute('title', 'My Button')
  })
})
