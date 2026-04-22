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

import { ProfileName } from '@/features/profile/components/Name'
import { ProfileMother } from '@/test/mothers/profile.mother'
import { renderWithProfile } from '@/test/utils/render'

describe('ProfileName', () => {
  it('renders model.fullName when no children are provided', () => {
    // Arrange & Act
    renderWithProfile(<ProfileName />)

    // Assert
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('renders children instead of model.fullName when provided', () => {
    // Arrange & Act
    renderWithProfile(<ProfileName>Custom Name</ProfileName>)

    // Assert
    expect(screen.getByText('Custom Name')).toBeInTheDocument()
    expect(screen.queryByText('Test User')).not.toBeInTheDocument()
  })

  it('renders the fullName from a custom model via renderWithProfile', () => {
    // Arrange
    const model = ProfileMother.withFullName('Jane Doe')

    // Act
    renderWithProfile(<ProfileName />, { model })

    // Assert
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('forwards className prop to Theme.Text', () => {
    // Arrange & Act
    renderWithProfile(<ProfileName className="hero-name" />)

    // Assert
    expect(screen.getByTestId('theme-text')).toHaveClass('hero-name')
  })
})
