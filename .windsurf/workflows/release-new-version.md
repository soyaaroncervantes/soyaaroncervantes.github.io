---
auto_execution_mode: 2
description: Create a new version of the project, it should release a new GH release and update the version in package.json
---

## Steps

1. Check the current version in package.json
2. Ask the user for the new version, analyze the code, and suggest a version based on the changes
3. Update the version in package.json
4. Create a new git-tag with the new version
5. Follows conventional commits for tag description
6. `.github/workflows/release.yml` workflow should be triggered
7. Compare changes with previous tag
8. Verify the release was created successfully