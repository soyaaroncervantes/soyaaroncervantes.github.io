import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/features/theme/components', () => ({
  Theme: {
    Text: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <span data-testid="theme-text" {...props}>
        {children}
      </span>
    ),
  },
}))

import { ProfileJobTitle } from '@/features/profile/components/JobTitle'
import { ProfileMother } from '@/test/mothers/profile.mother'
import { renderWithProfile } from '@/test/utils/render'

describe('ProfileJobTitle', () => {
  it('renders model.jobTitle when no children are provided', () => {
    // Arrange & Act
    renderWithProfile(<ProfileJobTitle />)

    // Assert
    expect(screen.getByText('Engineer')).toBeInTheDocument()
  })

  it('renders children instead of model.jobTitle when provided', () => {
    // Arrange & Act
    renderWithProfile(<ProfileJobTitle>Custom Title</ProfileJobTitle>)

    // Assert
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.queryByText('Engineer')).not.toBeInTheDocument()
  })

  it('renders the jobTitle from a custom model via renderWithProfile', () => {
    // Arrange
    const model = ProfileMother.withJobTitle('Staff Engineer')

    // Act
    renderWithProfile(<ProfileJobTitle />, { model })

    // Assert
    expect(screen.getByText('Staff Engineer')).toBeInTheDocument()
  })

  it('forwards className prop to Theme.Text', () => {
    // Arrange & Act
    renderWithProfile(<ProfileJobTitle className="subtitle" />)

    // Assert
    expect(screen.getByTestId('theme-text')).toHaveClass('subtitle')
  })
})
