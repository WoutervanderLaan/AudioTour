# GitHub Workflows Documentation

This directory contains automated workflows for the AudioTour project.

## Workflows Overview

### auto-update-docs.yml

**Purpose:** Performs comprehensive audits of ALL documentation in the repository to identify and fix issues.

**Triggers:**

- **Manual:** Can be triggered manually from GitHub Actions with a custom reason
- **Automatic (Optional):** Runs when a non-docs PR is merged to `main` or `master`
- **Self-Protection:** Never triggers on its own documentation PRs (prevents infinite loops)

**What it does:**

1. Performs a comprehensive audit of ALL documentation across the entire repository
2. Checks for specific issues:
   - ❌ Incomplete documentation (missing JSDoc, parameters, return types)
   - ❌ Inconsistent documentation (JSDoc doesn't match function signatures)
   - ❌ Discrepancies (documentation contradicts actual code)
   - ❌ Outdated information (references to deprecated features, old patterns)
   - ❌ Incorrect information (describes non-existent behavior)
3. **ONLY creates a PR if issues are found**
4. If no issues found, completes successfully and reports why no updates were needed

**Important:**

- The workflow audits ALL documentation, not just recently changed files
- It ONLY updates documentation when actual issues are detected
- It NEVER modifies code implementation - documentation only

#### Setup Requirements

To enable this workflow, you need to configure the following GitHub secret:

- `CLAUDE_CODE_OAUTH_TOKEN` - OAuth token for Claude Code API access
  - Get this from: https://claude.ai/settings (under API settings)
  - Add to: Repository Settings → Secrets and variables → Actions → New repository secret

#### How to Use

**Manual Trigger (Recommended):**

1. Go to Actions → Auto-Update Documentation
2. Click "Run workflow"
3. Optionally enter a reason (e.g., "Monthly documentation audit")
4. Click "Run workflow" button

**Automatic Trigger:**

- Automatically runs when a non-docs PR is merged to main/master
- Skips if the merged PR is from a `docs/` branch or has `docs:` in the title

#### How It Works

1. **Comprehensive Discovery:** Finds ALL documentation in the repository:
   - All TypeScript/JavaScript files with JSDoc comments
   - All markdown files (README.md, DOCS.md, handbook/, etc.)
   - Configuration documentation

2. **Thorough Audit:** Claude Code checks each piece of documentation:
   - JSDoc: Completeness, accuracy, parameter matching, return types
   - Markdown: Valid code examples, correct file paths, accurate feature lists
   - Configuration: Valid commands, correct script names

3. **Issue Detection:** Identifies specific problems:
   - Missing or incomplete documentation
   - Inconsistencies between docs and code
   - Outdated references to old patterns
   - Incorrect information

4. **Conditional Action:**
   - **If issues found:** Creates a detailed PR with all fixes
   - **If no issues found:** Completes successfully with a report explaining why no updates were needed

5. **Human Review:** All documentation updates (when created) go through PR review

#### Workflow Outcomes

**Scenario 1: Issues Found**

- A PR is created with detailed fixes
- PR includes:
  - List of all issues found (file paths and line numbers)
  - Specific fixes applied to each issue
  - Audit statistics (files reviewed, issues fixed)
- Review and merge the PR to apply documentation updates

**Scenario 2: No Issues Found**

- Workflow completes successfully without creating a PR
- GitHub Actions summary shows:
  - Detailed audit report
  - Statistics of what was checked
  - Confirmation that all docs are complete, accurate, consistent, and up-to-date
- No action needed - documentation is already in good shape

#### Review Process (When PR is Created)

When a documentation PR is created:

1. Review the issues found and fixes applied
2. Verify only documentation was modified (no code changes)
3. Confirm JSDoc comments match actual function implementations
4. Check markdown documentation reflects current state
5. Merge the PR to apply the documentation fixes

#### Customization

You can customize the workflow by editing `.github/workflows/auto-update-docs.yml`:

- **Disable automatic trigger:** Remove or comment out the `pull_request` trigger
- **Change target branches:** Modify the `branches` list under `on.pull_request`
- **Adjust issue detection:** Edit the prompt to add/remove issue types to check for
- **Change documentation scope:** Modify which files/directories are audited
- **Branch naming:** Update the `Generate documentation update branch name` step

#### Example Workflow Run

**Example 1: Issues Found**

```
Trigger: Manual - "Monthly documentation audit"

Audit Results:
✅ Audited 145 TypeScript files
✅ Reviewed 427 JSDoc comments
✅ Reviewed 23 markdown files

Issues Found: 8
1. src/modules/auth/hooks/useAuth.ts:42 - Missing @param for 'options'
2. src/shared/components/ui/Button.tsx:15 - Return type incorrect
3. handbook/architecture.md:89 - References old 'src/core/' path
...

Result: Created PR #156 with fixes
```

**Example 2: No Issues**

```
Trigger: PR merge - PR #155 "feat: add dark mode"

Audit Results:
✅ Audited 145 TypeScript files
✅ Reviewed 427 JSDoc comments
✅ Reviewed 23 markdown files

All documentation is:
✅ Complete
✅ Accurate
✅ Consistent
✅ Up-to-date

Result: No PR created - documentation already current
```

#### Troubleshooting

**Workflow doesn't trigger (manual):**

- Verify `CLAUDE_CODE_OAUTH_TOKEN` secret is set
- Check GitHub Actions are enabled
- Ensure you have permissions to run workflows

**Workflow doesn't trigger (automatic):**

- Confirm the PR was merged (not just closed)
- Check the PR doesn't have `docs:` in title or come from `docs/` branch
- Verify the target branch is `main` or `master`

**Workflow succeeds but no PR created:**

- **This is normal!** It means no documentation issues were found
- Check the workflow summary for the audit report
- Review the Claude Code step output for details

**Issues not being detected:**

- Review the audit criteria in the workflow prompt
- Ensure the documentation issues match the defined problem types
- Consider adjusting the prompt to be more or less strict

**False positives (unnecessary changes):**

- Review the PR carefully before merging
- Adjust the prompt to clarify what constitutes an "issue"
- Consider adding project-specific documentation standards to CLAUDE.md

### Other Workflows

- **ai-agent.yml** - Trello-integrated task runner using Claude Code
- **claude-code-review.yml** - Code review automation
- **claude.yml** - Interactive Claude Code for PR comments
- **deploy-storybook.yml** - Deploys Storybook documentation
- **test-server-connection.yml** - Server connectivity tests

## Best Practices

1. **Run manual audits periodically:** Trigger monthly or quarterly comprehensive audits
2. **Review PRs carefully:** AI is smart but not perfect - always review changes
3. **Keep CLAUDE.md updated:** The AI uses this as context for understanding your project
4. **Don't panic if no PR is created:** It means your docs are already in good shape!
5. **Use the workflow output:** The audit report provides valuable insights even when no PR is created

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

## Recommended Usage

**For Maximum Value:**

1. **Run manual audits regularly:** Set a reminder to run the workflow monthly or after major features
2. **Enable automatic trigger selectively:** If you want automatic audits, keep the PR trigger enabled
3. **Or disable automatic trigger:** Comment out the `pull_request` section if you prefer manual-only
4. **Review the audit reports:** Even when no PR is created, the audit provides valuable insights

**Recommended Schedule:**

- After major feature releases
- Monthly as part of maintenance
- Before important releases
- When onboarding new team members (to ensure docs are current)

## Contributing

When modifying workflows:

1. Test changes in a fork or feature branch first
2. Document any new required secrets or setup steps
3. Update this README with new workflow information
4. Consider the impact on CI/CD pipeline performance
5. For auto-update-docs.yml, test both scenarios (issues found and no issues)
