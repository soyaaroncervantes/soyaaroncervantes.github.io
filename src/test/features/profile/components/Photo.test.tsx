import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProfilePhoto } from '@/features/profile/components/Photo'
import { ProfileMother } from '@/test/mothers/profile.mother'
import { renderWithProfile } from '@/test/utils/render'

describe('ProfilePhoto', () => {
  it('renders an img with src from model.photo.href', () => {
    // Arrange
    const model = ProfileMother.valid()

    // Act
    renderWithProfile(<ProfilePhoto />, { model })

    // Assert
    expect(screen.getByRole('img')).toHaveAttribute('src', model.photo.href)
  })

  it('renders an img with alt from model.fullName', () => {
    // Arrange & Act
    renderWithProfile(<ProfilePhoto />)

    // Assert
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test User')
  })

  it('forwards additional HTML attributes', () => {
    // Arrange & Act
    renderWithProfile(<ProfilePhoto className="avatar" data-testid="profile-photo" />)

    // Assert
    expect(screen.getByTestId('profile-photo')).toHaveClass('avatar')
  })
})
