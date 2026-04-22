# PRD - Personal Portfolio

A personal portfolio web application for Aarón Cervantes — an interactive CV with a career timeline, PDF download, email contact, and shareable URL with origin tracking.

## Problem Statement

A static PDF CV does not communicate technical criteria or judgment. A portfolio as a web application demonstrates real skills with evidence, and serves as a first impression when someone searches for you online.

## Objectives

- Present work experience as an interactive career timeline
- Allow CV download as PDF
- Enable direct contact by email
- Support multiple design versions (v1, v2…) accessible by route
- i18n support (es / en)

## Target Users

- **Recruiters / companies** — validate experience, skills, and make contact
- **Dev community** — technical reference, open source projects

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev) + [TypeScript 6](https://www.typescriptlang.org) |
| Build | [Vite 8](https://vite.dev) |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based) |
| Server state | [TanStack Query](https://tanstack.com/query) |
| HTTP client | [superagent](https://github.com/ladjs/superagent) |
| Client state | [Zustand](https://zustand.docs.pmnd.rs) + [zustand-slices](https://github.com/zustandjs/zustand-slices) |
| UI / Design system | [@m3e/react](https://github.com/matraic/m3e) (Material Design 3) |
| i18n | [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) |
| Linting & formatting | [Biome](https://biomejs.dev) |
| Testing | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| Package manager | [Bun](https://bun.sh) |
| Deploy | GitHub Pages |

## Architecture

- **Pattern:** Feature-based + MVVM-inspired (ViewController hooks)
- **UI pattern:** Compound components with Context (and without Context for namespace-only grouping)
- **Models:** Classes with private fields and typed getters, always built from DTOs
- **i18n:** Paraglide JS with strategy `["url", "localStorage", "preferredLanguage", "baseLocale"]`, base locale `es`

## Features

### Completed ✅

- [x] Base layout (Screen + Content)
- [x] Theme design system — Nav (Rail, Item, Group, Container), Card (Header, Content, Footer, Actions), Text, Icon, Button
- [x] Profile compound component (Provider, Name, JobTitle, Photo)
- [x] ProfileModel with `photo: URL`, `username: Nullable<string>`, built from `ProfileDto`
- [x] i18n with Paraglide JS (es/en, URL-based detection)
- [x] I18nProvider + useI18nController
- [x] V1Page with profile section
- [x] Multiple page versions (v1, v2)

### In Progress 🔄

- [ ] V1Page: real content (About me, Knowledge)
- [ ] V2Page: design and content

### Planned 📋

- [ ] Career timeline / work experience
- [ ] CV download (PDF)
- [ ] Email contact form
- [ ] Share with origin reference (UTM or analytics)
- [ ] Blog / articles
- [ ] Analytics / referrer tracking

## Business Rules

- Portfolio has multiple design versions (v1, v2) accessible by route
- Root route `/` redirects to `/v2` by default
- Base locale is `es`; English (`en`) is activated by URL prefix
- Models are always built from DTOs — never instantiate with raw data in components
- `src/paraglide/` is auto-generated — never edit manually

## Non-Functional Requirements

- Deploy on GitHub Pages (static, no backend)
- Pre-commit: automatic Biome check via `simple-git-hooks`
- TypeScript strict mode — no `any`
- Accessibility: `alt` and `aria-label` on all visual elements

## Out of Scope

- Own backend / database
- Auth / login
- CMS (for now)
- Advanced analytics (for now)

## Milestones

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Setup + base components (Nav, Card, Layout) | ✅ Done |
| Phase 2 | Profile compound + i18n + ProfileModel | ✅ Done |
| Phase 3 | Real V1 content: timeline, about, skills | 🔄 Next |
| Phase 4 | CV download + email contact | 📋 Planned |
| Phase 5 | V2 design | 📋 Planned |
| Phase 6 | Blog / articles | 📋 Future |
| Phase 7 | Analytics + referrer tracking | 📋 Future |
