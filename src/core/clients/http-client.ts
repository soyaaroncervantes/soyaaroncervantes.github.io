import sa, { type Agent } from 'superagent'
import saPreffix from 'superagent-prefix'
import type { Nullable } from '@/shared/base.types'

export const httpClient = (): Agent =>
  sa.agent().type('application/json').accept('application/json')

/**
 * Creates a client with a domain prefix
 * @param domain The domain to prefix
 * @returns Agent
 *
 * @example
 * ```ts
 * const client = createClient('https://api.example.com');
 * ```
 */
export const createApiClient = (domain: Nullable<string> = null): Agent => {
  const client = httpClient()

  if (!domain) {
    return client
  }

  const prefix = saPreffix(domain)
  client.use(prefix)
  return client
}
