import type { Agent } from 'superagent'
import { createSlice } from 'zustand-slices'
import { useStore } from '@/core/stores/app.store'
import { createApiClient } from './http-client'

export const apiClientsSlice = createSlice({
  name: 'apiClients',
  value: {
    clients: new Map<string, Agent>([] as [string, Agent][]),
  },
  actions: {
    createApiClient:
      (domain: string) =>
      ({ clients }) => {
        const client = createApiClient(domain)
        return {
          clients: new Map(clients).set(domain, client),
        }
      },
    removeApiClient:
      (domain: string) =>
      ({ clients }) => {
        const clientsUpdated = new Map(clients)
        clientsUpdated.delete(domain)
        return {
          clients: new Map(clientsUpdated),
        }
      },
    resetClients: () => () => {
      return {
        clients: new Map<string, Agent>([] as [string, Agent][]),
      }
    },
  },
})

export const useApiClients = () =>
  useStore((store) => ({
    getClient: (domain: string) => {
      const client = store.apiClients.clients.get(domain)

      if (!client) {
        throw new Error(
          `Client not found, ${domain}, please add it using "useApiClients().addClient('${domain}')"`
        )
      }

      return client
    },
    add: (domain: string) => store.createApiClient(domain),
    remove: (domain: string) => store.removeApiClient(domain),
    reset: () => store.resetClients(),
  }))
