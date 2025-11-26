# Setting Up This Repository as a GitHub Template

This guide explains how to configure this repository as a GitHub template so you can easily create new projects from it.

## Step 1: Make This Repository a Template on GitHub

### Via GitHub Web Interface

1. Go to your repository on GitHub
2. Click on **Settings** (top navigation)
3. In the **General** section, find **Template repository**
4. Check the box that says **"Template repository"**
5. GitHub will now show a **"Use this template"** button on the repository home page

### What This Enables

Once marked as a template:
- Users can click **"Use this template"** to create a new repository with all the files
- The new repository starts with a clean git history (no commits from the template)
- All branches, files, and folder structure are copied to the new repo

## Step 2: Update Repository Description

1. In repository **Settings** → **General**
2. Update the **Description** field:
   ```
   Production-ready React Native template with Expo, comprehensive tooling, and strict code quality enforcement
   ```
3. Add **Topics/Tags** (click the gear icon next to About):
   - `react-native`
   - `expo`
   - `typescript`
   - `template`
   - `react-navigation`
   - `storybook`
   - `eslint`
   - `zustand`

## Step 3: Configure GitHub Actions Secrets (Optional)

If users of your template need specific secrets for the GitHub workflows:

### For AI Agent Workflow (`ai-agent.yml`)

The AI agent workflow requires:
- **ANTHROPIC_API_KEY** - Set this in repository settings if you want the agent workflow to work out of the box

However, users creating new projects from the template will need to set their own secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following **Repository secrets**:
   - `ANTHROPIC_API_KEY` - Your Anthropic API key for Claude Code agent

### For Trello Integration (Optional)

If using the Trello webhook features:
- `TRELLO_WEBHOOK_SECRET` - Shared secret for Trello webhook validation

**Note**: Each new repository created from the template will need to configure its own secrets. The template repository's secrets are NOT copied to new repositories.

## Step 4: Update Workflows for Template Use

The current workflows are configured for the original project. Consider these options:

### Option A: Keep Workflows As-Is (Recommended)

The workflows are already generic and will work for any repository. Users just need to:
1. Set their own `ANTHROPIC_API_KEY` secret
2. Optionally remove Trello-related workflows if not needed

### Option B: Disable Specific Workflows

If you want to disable Trello-specific workflows by default:

1. Rename workflows to add `.disabled` extension:
   ```bash
   mv .github/workflows/test-server-connection.yml .github/workflows/test-server-connection.yml.disabled
   ```

2. Add instructions in TEMPLATE-README.md for users to rename them if needed

### Option C: Make Workflows Conditional

Add conditional checks to workflows that require external services:

```yaml
# In ai-agent.yml
jobs:
  ai-agent:
    # Only run if secret is configured
    if: ${{ secrets.ANTHROPIC_API_KEY != '' }}
```

## Step 5: Clean Up Project-Specific Content

Before marking as template, remove or genericize:

✅ **Already Done**:
- [x] Updated `package.json` with generic name
- [x] Updated `app.json` with placeholder values
- [x] Removed EAS project ID
- [x] Removed Apple Team ID
- [x] Updated CLAUDE.md with generic description
- [x] Created TEMPLATE-README.md with setup instructions
- [x] Created .env.example for environment variables
- [x] Created init-template.js script

⚠️ **Consider Removing** (optional):
- [ ] `handbook/` directory (project-specific documentation)
- [ ] Feature examples (`src/features/auth`, `src/features/capture`, `src/features/user`)
  - Option 1: Keep as examples/reference
  - Option 2: Remove and leave empty features folder
- [ ] Project-specific assets in `assets/`

**Recommendation**: Keep example features as reference implementations. Users can delete them when starting their project.

## Step 6: Create a Clean README

You have two options:

### Option A: Replace README.md with Template Content

```bash
mv README.md README-OLD.md
mv TEMPLATE-README.md README.md
```

This makes the main README focused on template usage.

### Option B: Keep Both

Keep the current README.md and leave TEMPLATE-README.md as additional documentation. Add a link at the top of README.md:

```markdown
> **📝 Template Usage**: See [TEMPLATE-README.md](./TEMPLATE-README.md) for instructions on using this as a template.
```

## Step 7: Test the Template

Before publishing:

1. Mark the repository as a template (Step 1)
2. Click **"Use this template"** to create a test repository
3. Clone the test repository
4. Run the initialization script:
   ```bash
   npm install
   node scripts/init-template.js
   ```
5. Verify all configurations are updated correctly
6. Test the development workflow:
   ```bash
   npm run prepare
   npm run validate
   npm start
   ```

## Step 8: Document the Template

Add a badge to README.md indicating it's a template:

```markdown
# React Native Expo Template

[![Use this template](https://img.shields.io/badge/Use%20this-Template-blue?style=for-the-badge)](../../generate)

Production-ready React Native template with Expo...
```

## Using the Template

Once set up, users can create new projects:

### Via GitHub Web Interface

1. Click **"Use this template"** button on the repository page
2. Choose **"Create a new repository"**
3. Enter repository name and settings
4. Click **"Create repository from template"**

### Via GitHub CLI

```bash
gh repo create my-new-app --template your-username/your-template-repo
cd my-new-app
npm install
node scripts/init-template.js
```

### Manual Clone (Alternative)

```bash
git clone https://github.com/your-username/your-template-repo.git my-new-app
cd my-new-app
rm -rf .git
git init
npm install
node scripts/init-template.js
git add .
git commit -m "Initial commit from template"
```

## Maintaining the Template

### Versioning Strategy

Consider tagging template versions:

```bash
git tag -a v1.0.0 -m "Initial template release"
git push origin v1.0.0
```

Users can then reference specific template versions:
```bash
gh repo create my-app --template your-username/your-template-repo --ref v1.0.0
```

### Update Strategy

When updating the template:

1. Create a changelog (CHANGELOG.md)
2. Document breaking changes
3. Update version in package.json
4. Create a new git tag
5. Update README with migration notes

### Keeping Dependencies Updated

Regular maintenance tasks:

```bash
# Check for outdated dependencies
npm outdated

# Update dependencies
npm update

# Update to latest major versions (carefully)
npx npm-check-updates -u
npm install
npm run validate
```

## GitHub Template Features to Leverage

### Branch Protection

Set up recommended branch protection rules:

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require linear history

### Repository Templates

Create issue and PR templates:

```bash
mkdir -p .github/ISSUE_TEMPLATE
mkdir -p .github/PULL_REQUEST_TEMPLATE
```

Add templates to help users report issues and create PRs.

### Security

Enable security features:
- Dependabot alerts
- Code scanning (CodeQL)
- Secret scanning

## Troubleshooting

### Template Button Not Showing

- Ensure you checked the "Template repository" checkbox in Settings
- Refresh the repository page
- Check that you have admin access to the repository

### Workflows Not Running in New Repos

- Users need to enable Actions in their repository settings
- Users need to set required secrets (ANTHROPIC_API_KEY)
- Check workflow permissions in Settings → Actions → General

### Initialization Script Fails

- Ensure Node.js is installed
- Check file permissions: `chmod +x scripts/init-template.js`
- Verify all paths in the script are correct

## Additional Resources

- [GitHub Template Repository Documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
