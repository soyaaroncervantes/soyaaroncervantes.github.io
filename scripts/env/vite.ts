import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { SyncMachine } from "./machine"
import type { SyncResult } from "./states"

const DTS_HEADER = `/// <reference types="vite/client" />`
const BIOME_IGNORE = `// biome-ignore lint/correctness/noUnusedVariables: Vite type augmentation`

export function syncViteEnv(exampleContent: string, dtsPath: string): SyncResult {
  const machine = new SyncMachine()
  machine.to("reading")

  const viteKeys: string[] = []

  for (const line of exampleContent.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIndex = trimmed.indexOf("=")
    if (eqIndex <= 0) continue
    const key = trimmed.slice(0, eqIndex).trim()
    if (key.startsWith("VITE_")) viteKeys.push(key)
  }

  const fields = viteKeys.map((k) => `  readonly ${k}: string`).join("\n")
  const dtsContent = `${DTS_HEADER}

interface ImportMetaEnv {
${fields}
}

${BIOME_IGNORE}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
`

  const existing = existsSync(dtsPath) ? readFileSync(dtsPath, "utf-8") : ""

  if (existing === dtsContent) {
    machine.to("up-to-date")
    return machine.result
  }

  writeFileSync(dtsPath, dtsContent, "utf-8")
  machine.to("updated", { added: viteKeys })
  return machine.result
}
