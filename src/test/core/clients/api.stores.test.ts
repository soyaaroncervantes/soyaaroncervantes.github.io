import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

const { mockCreateApiClient, mockUseStore } = vi.hoisted(() => ({
  mockCreateApiClient: vi.fn().mockReturnValue({ use: vi.fn() }),
  mockUseStore: vi.fn(),
}))

vi.mock('@/core/clients/http-client', () => ({
  createApiClient: mockCreateApiClient,
}))

vi.mock('@/core/stores/app.store', () => ({
  useStore: mockUseStore,
}))

import type { Agent } from 'superagent'
import { apiClientsSlice, useApiClients } from '@/core/clients/api.stores'

const { actions } = apiClientsSlice

const emptyState = {
  clients: new Map<string, Agent>(),
}

describe('apiClientsSlice actions', () => {
  describe('createApiClient', () => {
    it('adds a new client to the map', () => {
      // Arrange
      const domain = 'https://api.example.com'

      // Act
      const nextState = actions.createApiClient(domain)(emptyState)

      // Assert
      expect(nextState.clients.has(domain)).toBe(true)
    })

    it('does not mutate the original map', () => {
      // Arrange
      const domain = 'https://api.example.com'
      const originalMap = emptyState.clients

      // Act
      const nextState = actions.createApiClient(domain)(emptyState)

      // Assert
      expect(nextState.clients).not.toBe(originalMap)
    })

    it('preserves existing clients when adding a new one', () => {
      // Arrange
      const existing = 'https://existing.example.com'
      const newDomain = 'https://new.example.com'
      const stateWithClient = {
        clients: new Map<string, Agent>([[existing, {} as Agent]]),
      }

      // Act
      const nextState = actions.createApiClient(newDomain)(stateWithClient)

      // Assert
      expect(nextState.clients.has(existing)).toBe(true)
      expect(nextState.clients.has(newDomain)).toBe(true)
    })
  })

  describe('removeApiClient', () => {
    it('removes an existing client from the map', () => {
      // Arrange
      const domain = 'https://api.example.com'
      const stateWithClient = {
        clients: new Map<string, Agent>([[domain, {} as Agent]]),
      }

      // Act
      const nextState = actions.removeApiClient(domain)(stateWithClient)

      // Assert
      expect(nextState.clients.has(domain)).toBe(false)
    })

    it('does not mutate the original map', () => {
      // Arrange
      const domain = 'https://api.example.com'
      const stateWithClient = {
        clients: new Map<string, Agent>([[domain, {} as Agent]]),
      }
      const originalMap = stateWithClient.clients

      // Act
      const nextState = actions.removeApiClient(domain)(stateWithClient)

      // Assert
      expect(nextState.clients).not.toBe(originalMap)
    })

    it('leaves the map unchanged when the domain does not exist', () => {
      // Arrange
      const existing = 'https://existing.example.com'
      const stateWithClient = {
        clients: new Map<string, Agent>([[existing, {} as Agent]]),
      }

      // Act
      const nextState = actions.removeApiClient('https://unknown.example.com')(stateWithClient)

      // Assert
      expect(nextState.clients.size).toBe(1)
      expect(nextState.clients.has(existing)).toBe(true)
    })
  })

  describe('resetClients', () => {
    it('returns an empty map', () => {
      // Act
      const nextState = actions.resetClients()()

      // Assert
      expect(nextState.clients.size).toBe(0)
    })

    it('always returns a new map instance', () => {
      // Act
      const nextState1 = actions.resetClients()()
      const nextState2 = actions.resetClients()()

      // Assert
      expect(nextState1.clients).not.toBe(nextState2.clients)
    })
  })
})

describe('useApiClients', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('getClient returns the registered client for a known domain', () => {
    // Arrange
    const domain = 'https://api.example.com'
    const fakeClient = { use: vi.fn() } as unknown as Agent
    const fakeStore = {
      apiClients: { clients: new Map([[domain, fakeClient]]) },
      createApiClient: vi.fn(),
      removeApiClient: vi.fn(),
      resetClients: vi.fn(),
    }
    mockUseStore.mockImplementation((selector: (s: typeof fakeStore) => unknown) =>
      selector(fakeStore)
    )

    // Act
    const { result } = renderHook(() => useApiClients())

    // Assert
    expect(result.current.getClient(domain)).toBe(fakeClient)
  })

  it('getClient throws when domain is not registered', () => {
    // Arrange
    const domain = 'https://unknown.example.com'
    const fakeStore = {
      apiClients: { clients: new Map() },
      createApiClient: vi.fn(),
      removeApiClient: vi.fn(),
      resetClients: vi.fn(),
    }
    mockUseStore.mockImplementation((selector: (s: typeof fakeStore) => unknown) =>
      selector(fakeStore)
    )

    // Act
    const { result } = renderHook(() => useApiClients())

    // Assert
    expect(() => result.current.getClient(domain)).toThrow(domain)
  })

  it('add calls store.createApiClient with the domain', () => {
    // Arrange
    const domain = 'https://api.example.com'
    const mockCreateStore = vi.fn()
    const fakeStore = {
      apiClients: { clients: new Map() },
      createApiClient: mockCreateStore,
      removeApiClient: vi.fn(),
      resetClients: vi.fn(),
    }
    mockUseStore.mockImplementation((selector: (s: typeof fakeStore) => unknown) =>
      selector(fakeStore)
    )

    // Act
    const { result } = renderHook(() => useApiClients())
    result.current.add(domain)

    // Assert
    expect(mockCreateStore).toHaveBeenCalledWith(domain)
  })

  it('remove calls store.removeApiClient with the domain', () => {
    // Arrange
    const domain = 'https://api.example.com'
    const mockRemoveStore = vi.fn()
    const fakeStore = {
      apiClients: { clients: new Map() },
      createApiClient: vi.fn(),
      removeApiClient: mockRemoveStore,
      resetClients: vi.fn(),
    }
    mockUseStore.mockImplementation((selector: (s: typeof fakeStore) => unknown) =>
      selector(fakeStore)
    )

    // Act
    const { result } = renderHook(() => useApiClients())
    result.current.remove(domain)

    // Assert
    expect(mockRemoveStore).toHaveBeenCalledWith(domain)
  })

  it('reset calls store.resetClients', () => {
    // Arrange
    const mockResetStore = vi.fn()
    const fakeStore = {
      apiClients: { clients: new Map() },
      createApiClient: vi.fn(),
      removeApiClient: vi.fn(),
      resetClients: mockResetStore,
    }
    mockUseStore.mockImplementation((selector: (s: typeof fakeStore) => unknown) =>
      selector(fakeStore)
    )

    // Act
    const { result } = renderHook(() => useApiClients())
    result.current.reset()

    // Assert
    expect(mockResetStore).toHaveBeenCalled()
  })
})
