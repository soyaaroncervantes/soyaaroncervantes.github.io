/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_PORT: string
  readonly VITE_API_URL: string
}

// biome-ignore lint/correctness/noUnusedVariables: Vite type augmentation
interface ImportMeta {
  readonly env: ImportMetaEnv
}
