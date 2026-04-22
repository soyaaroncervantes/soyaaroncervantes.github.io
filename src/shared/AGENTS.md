# Agent Context — Shared

The `shared` directory contains global utility types used across all features.

---

## `Nullable<T>`

```ts
// src/shared/base.types.ts
export type Nullable<T> = T | null
```

**Use `Nullable<T>` when** a value is intentionally absent — e.g. a database null, an optional model field that has no meaningful default.

```ts
// ✅ Correct
readonly #username: Nullable<string>   // username may not exist

// ✅ Correct
get username(): Nullable<string> { return this.#username }
```

**Use `T | undefined` only for:**
- Optional function parameters: `function foo(bar?: string)`
- Missing object keys: `{ key?: string }`

**Do not use `null` and `undefined` interchangeably** — `Nullable<T>` signals intentional absence; `undefined` signals the absence of a declaration.

---

## Where Shared Types Live

All global utility types are defined in `src/shared/base.types.ts`.

- Do not create additional files in `shared/` unless there is a clear cross-feature type that does not belong to any single feature
- Feature-specific types (DTOs, context types, model types) belong in their respective feature directory

---

## Import

```ts
import type { Nullable } from '@/shared/base.types'
```
