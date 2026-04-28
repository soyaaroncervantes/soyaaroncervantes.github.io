---
name: commit-with-conventional
description: Create commits following conventional commit standards. Splits changes into multiple logical commits grouped by concern. Use when committing code changes, following the git-commit and conventional-commit patterns, or when the user asks to commit changes with proper conventional commit messages.
---

# Commit with Conventional Commits

Commit changes following conventional commit standards and best practices from the project.

## Workflow

1. **Check working changes**
   - Review all modified and untracked files
   - Understand what changed and why

2. **Analyze and group by concern**
   - Identify logical groupings (features, fixes, refactoring, docs, tests)
   - Each commit should address one concern
   - Avoid mixing unrelated changes in a single commit

3. **Use project skills**
   - Use `@conventional-commit` skill to understand the format
   - Use `@git-commit` skill to create commits with proper messages
   - Reference: `PRD.md` for context on what you're committing

4. **Split into multiple commits if needed**
   - Group files by common concern
   - Create atomic, reviewable commits
   - Each commit should be independently understandable

5. **Verify completion**
   - Run `bun check` before considering the task complete
   - Ensure all changes are committed
   - Review git log to verify commits are clean and descriptive

## Conventional Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore, ci
**Scope**: Feature or area being changed (optional but recommended)
**Subject**: Imperative, present tense, lowercase, no period
**Body**: Explain what and why (optional for small commits)
**Footer**: Reference issues, breaking changes (optional)

## Examples

```
feat(navigation): implement navbar with compound component pattern

Add NavbarContext for shared state, useNavbarController for logic, and
Navbar.Items for automatic route tracking and prefetching.

Closes #123
```

```
fix(theme): correct color scheme detection on page load

Use useEffectEvent to listen for system theme changes without
recreating the listener on each render.
```

```
test(profile): add unit tests for ProfileModel

Test DTO to Model transformation, URL parsing, and Nullable handling.
```
