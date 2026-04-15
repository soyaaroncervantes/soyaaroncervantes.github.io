import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { syncDotenv } from "./env/dotenv"
import { syncViteEnv } from "./env/vite"

const root = process.cwd()
const examplePath = resolve(root, ".env.example")
const envPath = resolve(root, ".env")
const dtsPath = resolve(root, "src/vite-env.d.ts")

let exampleContent: string
try {
  exampleContent = readFileSync(examplePath, "utf-8")
} catch {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.error("❌  .env.example not found")
  process.exit(1)
}

// --- Sync .env ---

const envResult = syncDotenv(exampleContent, envPath)

if (envResult.status === "created") {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.log("✅  .env created from .env.example")
} else if (envResult.status === "updated") {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.log(`✅  Added ${envResult.added.length} variable(s) to .env: ${envResult.added.join(", ")}`)
} else if (envResult.status === "error") {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.error(`❌  .env sync failed: ${envResult.message}`)
  process.exit(1)
} else {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.log("✅  .env is already up to date")
}

// --- Sync src/vite-env.d.ts ---

const dtsResult = syncViteEnv(exampleContent, dtsPath)

if (dtsResult.status === "updated") {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.log("✅  vite-env.d.ts updated")
} else if (dtsResult.status === "error") {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.error(`❌  vite-env.d.ts sync failed: ${dtsResult.message}`)
  process.exit(1)
} else {
  // biome-ignore lint/suspicious/noConsole: CLI script
  console.log("✅  vite-env.d.ts is already up to date")
}
