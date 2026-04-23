import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeButtonGroup } from '@/features/theme/components/button/ButtonGroup'

describe('ButtonGroup', () => {
  it('renders children', () => {
    // Arrange & Act
    render(
      <ThemeButtonGroup>
        <button type="button">Save</button>
        <button type="button">Cancel</button>
      </ThemeButtonGroup>
    )

    // Assert
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('forwards props to the native element', () => {
    // Arrange & Act
    render(
      <ThemeButtonGroup data-testid="button-group" className="custom-group">
        <button type="button">Action</button>
      </ThemeButtonGroup>
    )

    // Assert
    const group = screen.getByTestId('button-group')
    expect(group).toHaveClass('custom-group')
  })

  it('forwards aria attributes', () => {
    // Arrange & Act
    render(
      <ThemeButtonGroup aria-label="Actions" role="group">
        <button type="button">Save</button>
      </ThemeButtonGroup>
    )

    // Assert
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('aria-label', 'Actions')
  })
})
