# Navigation Models

Model layer for navigation actions. This directory defines the polymorphic hierarchy used by `Navbar.Items`.

## Hierarchy

- `NavItemModel` (abstract base)
  - `RouteNavItemModel`
  - `AnchorNavItemModel` (abstract template)
    - `ExternalLinkNavItemModel`
    - `MailtoNavItemModel`
    - `DownloadNavItemModel`
  - `ShareNavItemModel`

## Base contract (`NavItemModel`)

- Immutable `id` and `icon`.
- `toAnchorAttrs()` returns anchor-compatible attrs to spread into `Nav.Item`.
- `onClick(event, deps)` executes the action.
- `parseUrl(input)` is the shared URL normalizer for subclasses.

## Rules

- Add a new model file per new nav kind.
- Do not add branch logic to the base class for specific kinds.
- Keep DTOs passive (`type` only) and parse/validate in models.
