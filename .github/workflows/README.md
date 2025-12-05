# GitHub Workflows Documentation

This directory contains automated workflows for the AudioTour project.

## Workflows Overview

### auto-update-docs.yml

**Purpose:** Automatically updates documentation (JSDoc comments and markdown files) when pull requests are merged.

**Trigger:** Runs automatically when a PR is merged to `main` or `master` branch.

**What it does:**
1. Detects when a PR is merged
2. Retrieves the list of files that were changed in the merged PR
3. Uses Claude Code AI to:
   - Analyze all changed files and their contexts
   - Identify which documentation needs updating
   - Update JSDoc comments in affected files
   - Update related markdown documentation (README.md, DOCS.md, handbook/, etc.)
4. Creates a new branch with the documentation updates
5. Opens a pull request for human review

**Important:** The workflow ONLY updates documentation - it never modifies code implementation.

#### Setup Requirements

To enable this workflow, you need to configure the following GitHub secret:

- `CLAUDE_CODE_OAUTH_TOKEN` - OAuth token for Claude Code API access
  - Get this from: https://claude.ai/settings (under API settings)
  - Add to: Repository Settings → Secrets and variables → Actions → New repository secret

#### How It Works

1. **PR Merge Detected:** When you merge any PR to main/master, the workflow triggers
2. **File Analysis:** Gets the list of changed files from the merged PR
3. **AI Documentation Review:** Claude Code analyzes:
   - The changed files and their purpose
   - Related JSDoc comments that may need updates
   - Module documentation (DOCS.md) in affected directories
   - Project-level documentation (CLAUDE.md, handbook/*)
4. **Documentation Updates:** Claude updates:
   - JSDoc comments to reflect current function behavior
   - Parameter descriptions and return types
   - Markdown documentation files
   - Usage examples and API references
5. **PR Creation:** A new PR is created with all documentation updates for your review

#### Review Process

When the documentation PR is created:

1. Review the changes to ensure accuracy
2. Check that only documentation was modified (no code changes)
3. Verify JSDoc comments match the actual function implementations
4. Confirm markdown documentation reflects the current state
5. Merge the PR to keep docs in sync with code

#### Customization

You can customize the workflow behavior by editing `.github/workflows/auto-update-docs.yml`:

- **Allowed tools:** Modify `claude_args` to change which tools Claude can use
- **Target branches:** Change the `branches` list under `on.pull_request`
- **Documentation scope:** Edit the prompt to focus on specific documentation types
- **Branch naming:** Modify the `Generate documentation update branch name` step

#### Troubleshooting

**Workflow doesn't trigger:**
- Ensure the PR was merged (not just closed)
- Check that the target branch is `main` or `master`
- Verify GitHub Actions are enabled for the repository

**Documentation PR not created:**
- Check the workflow logs for Claude Code output
- Verify `CLAUDE_CODE_OAUTH_TOKEN` secret is set correctly
- Ensure git configuration is correct (username and email)

**Wrong documentation updated:**
- Review the changed files list in the workflow logs
- Adjust the prompt to provide better guidance to Claude
- Consider adding specific documentation rules to CLAUDE.md

### Other Workflows

- **ai-agent.yml** - Trello-integrated task runner using Claude Code
- **claude-code-review.yml** - Code review automation
- **claude.yml** - Interactive Claude Code for PR comments
- **deploy-storybook.yml** - Deploys Storybook documentation
- **test-server-connection.yml** - Server connectivity tests

## Best Practices

1. **Review AI-generated changes:** Always review documentation PRs before merging
2. **Keep CLAUDE.md updated:** The AI uses this file as context - keep it current
3. **Use descriptive PR titles:** Better PR titles lead to better documentation updates
4. **Manual updates welcome:** The workflow supplements, not replaces, manual documentation

## Security Considerations

- The workflow only has write access to contents and pull-requests
- It cannot modify the main branch directly - all changes go through PR review
- The `CLAUDE_CODE_OAUTH_TOKEN` should be kept secure and rotated periodically
- The workflow only runs on merged PRs, not on every commit

## Cost Considerations

- Each workflow run uses Claude Code AI, which may incur API costs
- The workflow only runs when PRs are merged, not on every push
- Consider the trade-off between automation and manual documentation updates
- Monitor your Claude Code usage in the Claude dashboard

## Contributing

When modifying workflows:

1. Test changes in a fork or feature branch first
2. Document any new required secrets or setup steps
3. Update this README with new workflow information
4. Consider the impact on CI/CD pipeline performance
