import { render, renderHook, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Profile, useProfile } from '@/features/profile/Provider'
import { ProfileMother } from '@/test/mothers/profile.mother'

describe('Profile', () => {
  it('renders children', () => {
    // Arrange & Act
    render(<Profile model={ProfileMother.valid()}>Content</Profile>)

    // Assert
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('exposes Profile.Photo sub-component', () => {
    expect(Profile.Photo).toBeDefined()
  })

  it('exposes Profile.Name sub-component', () => {
    expect(Profile.Name).toBeDefined()
  })

  it('exposes Profile.JobTitle sub-component', () => {
    expect(Profile.JobTitle).toBeDefined()
  })
})

describe('useProfile', () => {
  it('throws when called outside a Profile component', () => {
    expect(() => renderHook(() => useProfile())).toThrow(
      'useProfile must be used within a Profile component'
    )
  })

  it('returns the model when called inside a Profile', () => {
    // Arrange
    const model = ProfileMother.valid()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Profile model={model}>{children}</Profile>
    )

    // Act
    const { result } = renderHook(() => useProfile(), { wrapper })

    // Assert
    expect(result.current.model).toBe(model)
  })
})
