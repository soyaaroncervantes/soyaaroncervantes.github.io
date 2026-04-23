import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@m3e/react/split-button', () => ({
  M3eSplitButton: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <div data-testid="m3e-split-button" {...props}>
      {children}
    </div>
  ),
}))

import { ThemeButtonSplit } from '@/features/theme/components/button/ButtonSplit'

describe('ButtonSplit', () => {
  it('renders children', () => {
    // Arrange & Act
    render(
      <ThemeButtonSplit>
        <button type="button">Action</button>
      </ThemeButtonSplit>
    )

    // Assert
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('forwards props to the M3E split button', () => {
    // Arrange & Act
    render(
      <ThemeButtonSplit aria-label="menu" data-testid="split-btn">
        <button type="button">Options</button>
      </ThemeButtonSplit>
    )

    // Assert
    const splitBtn = screen.getByTestId('split-btn')
    expect(splitBtn).toHaveAttribute('aria-label', 'menu')
  })

  it('forwards className prop', () => {
    // Arrange & Act
    render(
      <ThemeButtonSplit className="custom-split">
        <button type="button">Action</button>
      </ThemeButtonSplit>
    )

    // Assert
    expect(screen.getByTestId('m3e-split-button')).toHaveClass('custom-split')
  })
})
