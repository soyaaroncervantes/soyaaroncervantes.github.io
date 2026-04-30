## Learned User Preferences

- User communicates primarily in Spanish; respond in Spanish when the user writes in Spanish
- Do not assume intent on ambiguous design or refactoring decisions; ask clarifying questions before drafting plans
- Identify design patterns by canonical name (GoF, Fowler "Refactoring") with references, and distinguish related patterns explicitly (e.g. Template Method vs Abstract Factory)
- Split commits into multiple atomic conventional commits grouped by concern, one concern per commit; follow `.cursor/skills/commit-with-conventional/`

## Learned Workspace Facts

- TanStack Router excludes any file whose name begins with `-` from the generated route tree; use this prefix to colocate non-route helpers next to routes (e.g. `-navigation.ts`)
- Cursor configuration lives in `.cursor/` (`rules/RULE.md`, `skills/`, `templates/`); the legacy `.windsurf/` directory is retained as a migration reference only
- `@m3e/react`'s `M3eNavItem` natively accepts `href`, `target`, `rel`, and `download` via `LinkButtonMixin` from `@m3e/web`, so anchor attributes can be spread onto `<Nav.Item>` without wrapper components
