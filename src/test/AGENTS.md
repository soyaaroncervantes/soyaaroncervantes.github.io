# Agent Context — Testing

> **Global patterns reference:** See `src/AGENTS.md` for DTO, Model, ViewController, and Compound component pattern definitions.

This document defines testing conventions, patterns, and architecture for the project.

---

## Stack

| Tool | Role |
|---|---|
| [Vitest](https://vitest.dev) | Test runner |
| [Testing Library](https://testing-library.com/docs/react-testing-library/intro) | Component/DOM assertions |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | Custom DOM matchers (`toBeInTheDocument`, etc.) |
| `jsdom` | DOM environment for Vitest |

Already configured in `vitest.config.ts` + `src/test/setup.ts`. No extra setup needed.

---

## Testing Pyramid for This Project

```
         /\
        /  \
       / E2E \     ← OUT OF SCOPE (static GitHub Pages, no backend, no auth)
      /--------\
     /  Integr. \  ← Future (when pages have real content)
    /------------\
   /  Component   \ ← Next priority after unit
  /----------------\
 /      Unit        \ ← START HERE
/--------------------\
```

**Why E2E is out of scope:** The portfolio deploys as a static site on GitHub Pages. There is no backend, no authentication, and no multi-step user flows that would justify the overhead of Playwright or Cypress. Unit and component tests cover all meaningful behavior.

---

## File Structure Convention

Tests live **co-located** with their source file. Shared helpers live in `src/test/`.

```
src/
  features/
    profile/
      models/
        profile.model.ts
        profile.model.test.ts      ← unit test (co-located)
      components/
        Name.tsx
        Name.test.tsx              ← component test (co-located)
        Photo.test.tsx
        JobTitle.test.tsx
    theme/
      hooks/
        useThemeController.test.ts
        useNavItemController.test.ts
  test/
    mothers/
      profile.mother.ts            ← ProfileMother (Object Mother pattern)
    utils/
      render.tsx                   ← renderWithProviders (Custom Render)
    setup.ts                       ← jest-dom setup (auto-imported by Vitest)
    AGENTS.md                      ← this file
```

**Rules:**
- Unit tests for a class/function → `*.test.ts` next to the source file
- Component tests → `*.test.tsx` next to the component file
- Shared factories and helpers → `src/test/mothers/` and `src/test/utils/`
- Never put individual unit/component tests inside `src/test/` — that folder is for shared infrastructure only

---

## Primary Pattern: AAA (Arrange-Act-Assert)

All tests follow the AAA structure. Add blank lines between sections for readability.

```ts
it('returns null username when not provided', () => {
  // Arrange
  const dto = { fullName: 'Aarón Cervantes', jobTitle: 'Engineer', photoUrl: 'https://example.com/photo.jpg' }

  // Act
  const model = new ProfileModel(dto)

  // Assert
  expect(model.username).toBeNull()
})
```

**Variant: Given-When-Then** (use for behavior-oriented descriptions):

```ts
it('builds fullName from first and last name', () => {
  // Given
  const dto = { fullName: 'Aarón Cervantes', jobTitle: 'Engineer', photoUrl: 'https://example.com/photo.jpg' }

  // When
  const model = new ProfileModel(dto)

  // Then
  expect(model.fullName).toBe('Aarón Cervantes')
})
```

---

## Object Mother Pattern

Use **Object Mothers** to create consistent test fixtures for Models. Lives in `src/test/mothers/`.

```ts
// src/test/mothers/profile.mother.ts
import { ProfileModel } from '@/features/profile/models/profile.model'
import type { ProfileDto } from '@/features/profile/dtos/profile.dto'

const base: ProfileDto = {
  fullName: 'Test User',
  jobTitle: 'Engineer',
  photoUrl: 'https://example.com/photo.jpg',
}

export class ProfileMother {
  static valid(): ProfileModel {
    return new ProfileModel(base)
  }

  static withoutUsername(): ProfileModel {
    return new ProfileModel({ ...base, username: undefined })
  }

  static withUsername(username: string): ProfileModel {
    return new ProfileModel({ ...base, username })
  }

  static withFullName(fullName: string): ProfileModel {
    return new ProfileModel({ ...base, fullName })
  }
}
```

**Rules:**
- One Mother per Model (not per DTO)
- `valid()` returns the minimal valid instance — no optional fields
- Named variants describe the scenario: `withoutUsername`, `asAdmin`, `withInvalidPhoto`
- Mothers are only for Models — raw DTO objects can be inlined in tests when simpler

---

## Custom Render: `renderWithProviders`

Component tests that use `useProfile()` must be wrapped in `<Profile>`. Use `renderWithProviders` from `src/test/utils/render.tsx`.

```tsx
// src/test/utils/render.tsx
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Profile } from '@/features/profile/Provider'
import { ProfileMother } from '../mothers/profile.mother'
import type { ProfileModel } from '@/features/profile/models/profile.model'

type Options = {
  model?: ProfileModel
}

export function renderWithProfile(ui: ReactElement, { model = ProfileMother.valid() }: Options = {}) {
  return render(<Profile model={model}>{ui}</Profile>)
}
```

**Usage in component tests:**

```tsx
import { screen } from '@testing-library/react'
import { renderWithProfile } from '@/test/utils/render'
import { ProfileName } from '../Name'

it('renders the full name from model', () => {
  // Arrange
  const model = ProfileMother.withFullName('Jane Doe')

  // Act
  renderWithProfile(<ProfileName />, { model })

  // Assert
  expect(screen.getByText('Jane Doe')).toBeInTheDocument()
})
```

---

## Mocking @m3e/react Components

`@m3e/react` uses Web Components (Shadow DOM). `jsdom` does not support custom elements natively. **Mock all `@m3e/react/*` imports** with lightweight HTML stubs at the top of each test file that needs them.

```ts
// At the top of the test file — before any imports that pull in @m3e/react
vi.mock('@m3e/react/typography', () => ({
  M3eHeading: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    <span data-testid="m3e-heading" {...props}>{children}</span>,
}))
```

**Rules:**
- Mock per module (e.g. `@m3e/react/typography`, `@m3e/react/button`) — not the entire `@m3e/react` package
- Stubs must render `children` so content assertions still work
- Add `data-testid="m3e-xxx"` to stubs for querying when needed
- Place all `vi.mock` calls at the **top of the test file**, before imports that use them (Vitest hoists them automatically)

**Common stubs to reuse:**

```ts
vi.mock('@m3e/react/typography', () => ({
  M3eHeading: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) =>
    <span data-testid="m3e-heading" {...props}>{children}</span>,
}))

vi.mock('@m3e/react/nav-bar', () => ({
  M3eNavItem: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) =>
    <div data-testid="m3e-nav-item" {...props}>{children}</div>,
}))
```

---

## What to Test Per Layer

### Unit — Models and pure functions

Target: `src/features/*/models/*.model.ts`

| Test | Description |
|---|---|
| `ProfileModel.fullName` | Concatenates `#firstName` and `#lastName` |
| `ProfileModel.name` | Returns only first name |
| `ProfileModel.username` | Returns `null` when DTO has no `username` |
| `ProfileModel.photo` | Returns a `URL` instance (not a string) |
| `ProfileModel.photo.href` | Matches the original `photoUrl` |
| Edge case: multi-word name | `fullName: 'Aarón de la Cruz'` — first name vs last name split |

### Unit — ViewController Hooks

Target: `src/features/theme/hooks/`

Use `renderHook` from Testing Library:

```ts
import { renderHook } from '@testing-library/react'

it('returns isSelected false when not in context item', () => {
  const wrapper = ({ children }) => <Nav>{children}</Nav>
  const { result } = renderHook(() => useNavItemController({ selected: false }), { wrapper })
  expect(result.current.isSelected).toBe(false)
})
```

| Hook | What to test |
|---|---|
| `useProfile` (throws) | Throws when called outside `<Profile>` |
| `useNav` (throws) | Throws when called outside `<Nav>` |

### Component — Profile sub-components

Target: `src/features/profile/components/`

| Component | What to test |
|---|---|
| `ProfilePhoto` | `<img>` has correct `src` (`model.photo.href`) and `alt` (`model.fullName`) |
| `ProfileName` | Renders `model.fullName` by default |
| `ProfileName` | Renders `children` when provided (overrides model) |
| `ProfileJobTitle` | Renders `model.jobTitle` by default |
| `ProfileJobTitle` | Renders `children` when provided (overrides model) |

**Testing Library philosophy — test behavior, not implementation:**

```tsx
// ❌ Don't test internal state or component methods
expect(wrapper.state.name).toBe('Aarón')

// ✅ Test what the user sees
expect(screen.getByText('Aarón Cervantes')).toBeInTheDocument()
expect(screen.getByRole('img', { name: 'Aarón Cervantes' })).toHaveAttribute('src', '...')
```

---

## FIRST Principles

Every test in this project must be:

| Principle | Meaning |
|---|---|
| **F**ast | No network calls, no real timers — mock everything external |
| **I**ndependent | Tests do not share state — each test sets up its own fixtures |
| **R**epeatable | Same result on every run, any machine |
| **S**elf-validating | Pass or fail — no manual inspection |
| **T**imely | Written alongside the feature, not months later |

---

## Naming Conventions

```ts
describe('ProfileModel', () => {
  describe('username', () => {
    it('returns the username when provided in the DTO', () => { ... })
    it('returns null when username is not in the DTO', () => { ... })
  })
})
```

- `describe` → the class, module, or component name
- Inner `describe` → the method or prop being tested (optional for simple cases)
- `it` → plain English, present tense, describes the expected outcome

---

## References

- `src/AGENTS.md` — DTO, Model, ViewController patterns
- `src/features/profile/AGENTS.md` — Profile data flow and compound structure
- `src/features/theme/hooks/AGENTS.md` — ViewController hook details
- [Testing Library Docs](https://testing-library.com/docs/)
- [Kent C. Dodds — Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [xUnit Test Patterns — Test Doubles](http://xunitpatterns.com/Test%20Double.html)
