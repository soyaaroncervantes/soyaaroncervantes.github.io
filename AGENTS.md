## Learned User Preferences

- User communicates primarily in Spanish; respond in Spanish when the user writes in Spanish
- Do not assume intent on ambiguous design or refactoring decisions; ask clarifying questions before drafting plans
- Identify design patterns by canonical name (GoF, Fowler "Refactoring") with references, and distinguish related patterns explicitly (e.g. Template Method vs Abstract Factory)
- Split commits into multiple atomic conventional commits grouped by concern, one concern per commit; follow `.cursor/skills/commit-with-conventional/`
- When writing a plan, list every constructor/method parameter explicitly in tables (no `args: SomeType`, no `(input)` alone) and place each code example immediately after the explanation it illustrates — never group all examples at the bottom. Full rules in `.cursor/rules/RULE.md` under "Plan Writing Conventions".
- Every phase in a plan must end with an explicit **tests + smoke** step (update affected unit tests → `bun test` → `bun check` → manual smoke in `bun dev`). Never relegate verification to "exit criteria" prose.
- When a plan would benefit from a plugin or codegen that replaces a hand-maintained source of truth (sprite IDs, route lists, env keys, etc.), pull the dependency forward into the phase that first uses it — do not park it as "future hardening". Hand-written registries kept in sync with another file are bug factories.
- Prefer negative-first guards (early return on "unsupported" / "missing" condition) before the happy path; this reduces nesting and can eliminate extra `try/catch` blocks.
- Use `URL | null` (not `string | null`) for fields that hold the result of URL parsing — `URL.parse()` returns `URL | null`, not a string.
- Eliminate single-use private wrapper methods that only delegate to one expression; inline the call at the call site instead.
- When multiple subclasses need the same helper, extract it as `protected static` on the base class rather than duplicating inline in each sibling.

## Learned Workspace Facts

- TanStack Router excludes any file whose name begins with `-` from the generated route tree; use this prefix to colocate non-route helpers next to routes (e.g. `-navigation.ts`)
- Cursor configuration lives in `.cursor/` (`rules/RULE.md`, `skills/`, `templates/`); the legacy `.windsurf/` directory is retained as a migration reference only
- `@m3e/react`'s `M3eNavItem` natively accepts `href`, `target`, `rel`, and `download` via `LinkButtonMixin` from `@m3e/web`, so anchor attributes can be spread onto `<Nav.Item>` without wrapper components
- Anchor-attribute types (e.g. `NavItemAnchorAttrs`) should extend `LinkButtonMixin` from `@m3e/web` rather than redeclaring equivalent props from scratch
- `ShareNavItemDto.url` is optional so `ShareNavItemModel` can fall back to `window.location.href` at click time; the navigation map is initialized once per session, so capturing `window.location` at construction would freeze the URL of the wrong page
