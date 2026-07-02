# GitHub Workflows

This directory contains the CI/automation workflows shipped with the template.

## Workflows

### claude.yml — Claude Code

Runs Claude Code on demand when you mention `@claude` in an issue, pull request
review, or comment. Useful for delegating small changes and answering questions
directly from GitHub.

### claude-code-review.yml — Claude Code Review

Automatically runs an AI code review on every opened/updated pull request.

### deploy-storybook.yml — Deploy Storybook

Builds the static Storybook and deploys it to GitHub Pages on pushes to `main`
(and via manual dispatch). Enable GitHub Pages for the repository (Settings →
Pages → Source: GitHub Actions) to use it.

## Setup Requirements

The Claude workflows require a GitHub secret:

- `CLAUDE_CODE_OAUTH_TOKEN` — OAuth token for Claude Code.

Add it under **Settings → Secrets and variables → Actions** in your repository.

## Notes

These workflows are optional. Remove any you don't need, or add your own
(tests, linting, EAS builds) following the same pattern.
