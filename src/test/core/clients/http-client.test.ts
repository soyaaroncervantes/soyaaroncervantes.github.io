import { describe, expect, it } from 'vitest'
import { createApiClient, httpClient } from '@/core/clients/http-client'

describe('httpClient', () => {
  it('returns a defined agent', () => {
    // Arrange & Act
    const agent = httpClient()

    // Assert
    expect(agent).toBeDefined()
  })

  it('returns an agent with a use method', () => {
    // Arrange & Act
    const agent = httpClient()

    // Assert
    expect(agent.use).toBeTypeOf('function')
  })
})

describe('createApiClient', () => {
  it('returns a defined agent when called with no arguments', () => {
    // Arrange & Act
    const agent = createApiClient()

    // Assert
    expect(agent).toBeDefined()
  })

  it('returns a defined agent when called with null', () => {
    // Arrange & Act
    const agent = createApiClient(null)

    // Assert
    expect(agent).toBeDefined()
  })

  it('returns a defined agent when called with a domain', () => {
    // Arrange & Act
    const agent = createApiClient('https://api.example.com')

    // Assert
    expect(agent).toBeDefined()
  })

  it('returns an agent with a use method when called with a domain', () => {
    // Arrange & Act
    const agent = createApiClient('https://api.example.com')

    // Assert
    expect(agent.use).toBeTypeOf('function')
  })

  it('returns different agent instances for different calls', () => {
    // Arrange & Act
    const agent1 = createApiClient('https://api1.example.com')
    const agent2 = createApiClient('https://api2.example.com')

    // Assert
    expect(agent1).not.toBe(agent2)
  })
})
