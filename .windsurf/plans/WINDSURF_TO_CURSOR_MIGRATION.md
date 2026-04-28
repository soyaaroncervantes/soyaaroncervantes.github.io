# Windsurf to Cursor Migration - Updated Plan

## Overview

Your project already has a **solid documentation structure** that will mostly stay in place:
- ✅ `.windsurfrules.md` (global rules for Windsurf agent) → convert to `.cursor/rules/RULE.md`
- ✅ `PRD.md` (product requirements) → reference from `.cursor/rules/`
- ✅ `src/AGENTS.md` + 16 feature-level `AGENTS.md` files → reference from `.cursor/rules/`

You're migrating **5 Windsurf items** to Cursor skills:

1. **Skills** (1): `create-readme`
2. **Workflows** (2): `commit-my-changes`, `release-new-version`
3. **Templates** (2): `agent.template.md`, `prd.template.md`

## Current State

```
Root:
├── .windsurfrules.md           ← Global Windsurf rules
├── PRD.md                      ← Product requirements
└── .windsurf/
    ├── skills/
    │   └── create-readme/SKILL.md
    ├── workflows/
    │   ├── commit-my-changes.md
    │   └── release-new-version.md
    └── templates/
        ├── agent.template.md
        └── prd.template.md

src/:
├── AGENTS.md                   ← Global architecture patterns
└── features/*/AGENTS.md        ← Feature-specific patterns (16 files)
```

## Target State (After Migration)

```
.cursor/
├── rules/
│   └── RULE.md                 ← From .windsurfrules.md
│                                 References: PRD.md, src/AGENTS.md
├── skills/
│   ├── create-readme/
│   │   └── SKILL.md
│   ├── commit-with-conventional/
│   │   └── SKILL.md
│   └── release-new-version/
│       └── SKILL.md
└── templates/
    ├── PRD.md
    └── AGENT-CONTEXT.md

Root:
├── .windsurfrules.md           ← Keep as reference/legacy
├── PRD.md                      ← Keep (source of truth)
└── .windsurf/                  ← Can optionally archive after migration
```

## Migration Strategy

### 1. Convert `.windsurfrules.md` → `.cursor/rules/RULE.md`

**Source**: `.windsurfrules.md` (49 lines)  
**Target**: `.cursor/rules/RULE.md`

- Copy content from `.windsurfrules.md` into new RULE.md
- Add reference links to:
  - `PRD.md` (product requirements)
  - `src/AGENTS.md` (architecture patterns)
  - Feature-level `AGENTS.md` docs
- Keep all role, stack, conventions, and rules sections intact

**Result**: Cursor agent reads global rules and understands project context.

### 2. Migrate Skills (Windsurf → Cursor format)

Three skills to migrate with proper YAML frontmatter and Cursor-compatible descriptions:

#### Skill 1: `create-readme`
- **From**: `.windsurf/skills/create-readme/SKILL.md`
- **To**: `.cursor/skills/create-readme/SKILL.md`
- Update description: third-person, include "Use when..." trigger terms
- Keep content mostly as-is; format for Cursor compatibility

#### Skill 2: `commit-with-conventional` (from workflow)
- **From**: `.windsurf/workflows/commit-my-changes.md`
- **To**: `.cursor/skills/commit-with-conventional/SKILL.md`
- Convert workflow steps into skill instructions
- Reference Cursor's built-in `git-commit` and `conventional-commit` skills
- Emphasis on multi-commit grouping by concern

#### Skill 3: `release-new-version` (from workflow)
- **From**: `.windsurf/workflows/release-new-version.md`
- **To**: `.cursor/skills/release-new-version/SKILL.md`
- Convert workflow steps into skill instructions
- Document version bumping, git tagging, and GitHub release workflow
- Reference semantic versioning best practices

### 3. Copy Templates (No conversion needed)

Templates are reference docs, not executable skills. Copy as-is:
- `PRD.md` from `.windsurf/templates/prd.template.md` → `.cursor/templates/PRD.md`
- `AGENT-CONTEXT.md` from `.windsurf/templates/agent.template.md` → `.cursor/templates/AGENT-CONTEXT.md`

## Key Differences: Windsurf → Cursor

| Aspect | Windsurf | Cursor | What changes |
|--------|----------|--------|--------------|
| **Rules file** | `.windsurfrules.md` | `.cursor/rules/RULE.md` | Location + format (RULE.md in `.cursor/`) |
| **Skills** | `.windsurf/skills/` | `.cursor/skills/` | Description field required with trigger terms |
| **Workflows** | `.windsurf/workflows/` | `.cursor/skills/` | Convert to skill format with instructions |
| **Templates** | `.windsurf/templates/` | `.cursor/templates/` | Just move; no conversion needed |
| **Project docs** | Root + src/ | Root + src/ (unchanged) | Reference them from `.cursor/rules/RULE.md` |

## Implementation Steps

1. Create `.cursor/rules/`, `.cursor/skills/`, `.cursor/templates/` directories
2. Convert `.windsurfrules.md` → `.cursor/rules/RULE.md` with cross-references
3. Migrate `create-readme` skill with Cursor-compatible description
4. Convert `commit-my-changes` workflow → `commit-with-conventional` skill
5. Convert `release-new-version` workflow → `release-new-version` skill
6. Copy templates to `.cursor/templates/`
7. Test each skill/rule is discoverable
8. (Optional) Archive `.windsurf/` once verified

## Organization Strategy (Chosen)

**User selected option A: `create_rule`**

This means:
1. Create `.cursor/rules/RULE.md` as the centralized hub for agent guidelines
2. `.cursor/rules/RULE.md` copies content from `.windsurfrules.md`
3. Add cross-references to:
   - `PRD.md` — product requirements and feature scope
   - `src/AGENTS.md` — global architecture patterns (DTO, Model, ViewController, Compound components)
   - Feature-level `AGENTS.md` files — specific patterns for each feature module

This gives Cursor a single entry point for understanding project conventions while keeping source-of-truth documents in their natural locations.

## Key Points

- **`.windsurfrules.md` stays at root**: Keep as a reference or delete after `.cursor/rules/RULE.md` is confirmed working
- **`PRD.md` and `src/AGENTS.md` DO NOT MOVE**: They're the source of truth; `.cursor/rules/RULE.md` just references them
- **Feature-level `AGENTS.md` files stay in src/**: These provide local context to each feature and are already discoverable by Cursor
- **Cursor compatibility**: 
  - Descriptions: third-person with trigger terms ("Use when...")
  - Skills: require YAML frontmatter (`name`, `description`)
  - File paths: forward slashes only
  - Keep SKILL.md under 500 lines; reference detailed docs separately
