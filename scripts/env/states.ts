export type SyncStatus = "idle" | "reading" | "created" | "updated" | "up-to-date" | "error"

export type SyncPayload = {
  added?: string[]
  message?: string
}

export type SyncResult =
  | { status: "created" }
  | { status: "updated"; added: string[] }
  | { status: "up-to-date" }
  | { status: "error"; message: string }
