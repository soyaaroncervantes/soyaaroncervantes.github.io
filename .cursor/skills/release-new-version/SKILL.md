---
name: release-new-version
description: Create a new version release for the project. Updates version in package.json, creates git tags, and triggers GitHub release workflow. Use when releasing a new version, bumping version numbers, creating releases, or when the user asks to release a new version.
---

# Release New Version

Create a new project version with proper versioning, git tagging, and GitHub release automation.

## Workflow

1. **Check current version**
   - Read `package.json` to find the current version
   - Understand semantic versioning (MAJOR.MINOR.PATCH)

2. **Analyze changes for version bump**
   - Review commits since the last tag
   - Determine if this is a:
     - **MAJOR** bump: Breaking changes
     - **MINOR** bump: New features (backwards compatible)
     - **PATCH** bump: Bug fixes (no new features)
   - Suggest the new version to the user

3. **Get user confirmation**
   - Present the current version and suggested new version
   - Allow user to accept or override the suggestion
   - Explain reasoning based on conventional commits found

4. **Update version**
   - Update `package.json` version field
   - Commit with message: `chore(release): bump version to X.Y.Z`

5. **Create git tag**
   - Create tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
   - Use conventional commit format for tag message
   - Include summary of major changes in tag message

6. **Push and trigger workflow**
   - Push the commit and tag to origin
   - `.github/workflows/release.yml` workflow will be triggered automatically
   - Workflow creates GitHub release with changelog

7. **Verify release**
   - Check GitHub Releases page
   - Verify release notes are generated correctly
   - Confirm version matches across package.json and git tag

## Semantic Versioning Reference

- **MAJOR** (X.0.0): Breaking API changes, incompatible updates
- **MINOR** (x.Y.0): New features, backwards compatible
- **PATCH** (x.y.Z): Bug fixes, no new features

## Conventional Commits → Version Bumps

| Commits | Version Bump |
|---------|--------------|
| `feat:` only | MINOR bump |
| `fix:` only | PATCH bump |
| `feat:` + `fix:` | MINOR bump |
| `BREAKING CHANGE:` footer | MAJOR bump |

## Example

```bash
# Current version: 1.0.0
# Found: 3 feat commits, 2 fix commits, no breaking changes
# Suggested version: 1.1.0 (MINOR)

chore(release): bump version to 1.1.0

- feat(profile): add ProfileModel with DTO transformation
- feat(navigation): implement Navbar compound component
- fix(theme): correct color scheme detection
```
