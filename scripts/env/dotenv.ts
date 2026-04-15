import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs"
import { SyncMachine } from "./machine"
import type { SyncResult } from "./states"

function parseKeys(content: string): Set<string> {
  const keys = new Set<string>()
  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIndex = trimmed.indexOf("=")
    if (eqIndex > 0) keys.add(trimmed.slice(0, eqIndex).trim())
  }
  return keys
}

export function syncDotenv(exampleContent: string, envPath: string): SyncResult {
  const machine = new SyncMachine()
  machine.to("reading")

  if (!existsSync(envPath)) {
    writeFileSync(envPath, exampleContent, "utf-8")
    machine.to("created")
    return machine.result
  }

  const envContent = readFileSync(envPath, "utf-8")
  const existingKeys = parseKeys(envContent)
  const added: string[] = []
  let toAppend = ""

  for (const line of exampleContent.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIndex = trimmed.indexOf("=")
    if (eqIndex <= 0) continue
    const key = trimmed.slice(0, eqIndex).trim()
    if (!existingKeys.has(key)) {
      toAppend += `\n${line}`
      added.push(key)
    }
  }

  if (!toAppend) {
    machine.to("up-to-date")
    return machine.result
  }

  appendFileSync(envPath, toAppend, "utf-8")
  machine.to("updated", { added })
  return machine.result
}
