import type { SyncPayload, SyncResult, SyncStatus } from "./states"

const TRANSITIONS = new Map<SyncStatus, Set<SyncStatus>>([
  ["idle", new Set<SyncStatus>(["reading"])],
  ["reading", new Set<SyncStatus>(["created", "updated", "up-to-date", "error"])],
  ["created", new Set<SyncStatus>()],
  ["updated", new Set<SyncStatus>()],
  ["up-to-date", new Set<SyncStatus>()],
  ["error", new Set<SyncStatus>()],
])

export class SyncMachine {
  #current: SyncStatus = "idle"
  #result: SyncResult | null = null

  to(next: SyncStatus, payload?: SyncPayload): void {
    const allowed = TRANSITIONS.get(this.#current)

    if (!allowed) {
      this.#result = {
        status: "error",
        message: `FSM internal error: state "${this.#current}" is not registered in TRANSITIONS`,
      }
      this.#current = "error"
      return
    }

    if (!allowed.has(next)) {
      this.#result = {
        status: "error",
        message: `Invalid transition: "${this.#current}" → "${next}" is not allowed`,
      }
      this.#current = "error"
      return
    }

    this.#current = next
    this.#result = this.buildResult(next, payload)
  }

  get result(): SyncResult {
    if (!this.#result) {
      return {
        status: "error",
        message: `FSM has not reached a terminal state (current: "${this.#current}")`,
      }
    }
    return this.#result
  }

  private buildResult(status: SyncStatus, payload?: SyncPayload): SyncResult {
    if (status === "updated") {
      return { status: "updated", added: payload?.added ?? [] }
    }
    if (status === "error") {
      return { status: "error", message: payload?.message ?? "Unknown error" }
    }
    if (status === "created") return { status: "created" }
    if (status === "up-to-date") return { status: "up-to-date" }
    return { status: "error", message: `Unexpected terminal status: "${status}"` }
  }
}
