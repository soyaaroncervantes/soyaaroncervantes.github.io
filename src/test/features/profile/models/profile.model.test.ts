import { describe, expect, it } from 'vitest'
import { ProfileModel } from '@/features/profile/models/profile.model'

describe('ProfileModel', () => {
  describe('fullName', () => {
    it('returns the concatenation of first and last name', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Aarón Cervantes',
        jobTitle: 'Engineer',
        photoUrl: 'https://example.com/photo.jpg',
      })

      // Assert
      expect(model.fullName).toBe('Aarón Cervantes')
    })
  })

  describe('name', () => {
    it('returns the first name only', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Aarón Cervantes',
        jobTitle: 'Engineer',
        photoUrl: 'https://example.com/photo.jpg',
      })

      // Assert
      expect(model.name).toBe('Aarón')
    })
  })

  describe('lastName', () => {
    it('returns the last name only', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Aarón Cervantes',
        jobTitle: 'Engineer',
        photoUrl: 'https://example.com/photo.jpg',
      })

      // Assert
      expect(model.lastName).toBe('Cervantes')
    })
  })

  describe('jobTitle', () => {
    it('returns the job title string', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Test User',
        jobTitle: 'Senior Frontend Engineer',
        photoUrl: 'https://example.com/photo.jpg',
      })

      // Assert
      expect(model.jobTitle).toBe('Senior Frontend Engineer')
    })
  })

  describe('username', () => {
    it('returns the username when provided in the DTO', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Test User',
        jobTitle: 'Engineer',
        photoUrl: 'https://example.com/photo.jpg',
        username: '@testuser',
      })

      // Assert
      expect(model.username).toBe('@testuser')
    })

    it('returns null when username is not in the DTO', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Test User',
        jobTitle: 'Engineer',
        photoUrl: 'https://example.com/photo.jpg',
      })

      // Assert
      expect(model.username).toBeNull()
    })
  })

  describe('photo', () => {
    it('returns a URL instance, not a string', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Test User',
        jobTitle: 'Engineer',
        photoUrl: 'https://example.com/photo.jpg',
      })

      // Assert
      expect(model.photo).toBeInstanceOf(URL)
    })

    it('photo.href matches the original photoUrl', () => {
      // Arrange
      const photoUrl = 'https://example.com/photo.jpg'

      // Act
      const model = new ProfileModel({
        fullName: 'Test User',
        jobTitle: 'Engineer',
        photoUrl,
      })

      // Assert
      expect(model.photo.href).toBe(photoUrl)
    })
  })

  describe('edge case: multi-word fullName', () => {
    it('uses the first word as name and the second word as lastName', () => {
      // Arrange & Act
      const model = new ProfileModel({
        fullName: 'Aarón de la Cruz',
        jobTitle: 'Engineer',
        photoUrl: 'https://example.com/photo.jpg',
      })

      // Assert
      expect(model.name).toBe('Aarón')
      expect(model.lastName).toBe('de')
      expect(model.fullName).toBe('Aarón de')
    })
  })
})
