#!/bin/bash
# Helper script to reply to a PR review comment
# Usage: ./reply-to-comment.sh <pr_number> <comment_id> <message>

# Strict error handling
set -euo pipefail

PR_NUMBER=$1
COMMENT_ID=$2
MESSAGE=$3

# Validate required environment variables
if [ -z "${GITHUB_REPOSITORY:-}" ]; then
  echo "❌ ERROR: GITHUB_REPOSITORY environment variable is not set"
  exit 1
fi

# Validate required arguments
if [ -z "$PR_NUMBER" ] || [ -z "$COMMENT_ID" ] || [ -z "$MESSAGE" ]; then
  echo "Usage: $0 <pr_number> <comment_id> <message>"
  exit 1
fi

# Input validation: PR_NUMBER and COMMENT_ID must be numeric
if ! [[ "$PR_NUMBER" =~ ^[0-9]+$ ]]; then
  echo "❌ ERROR: PR_NUMBER must be a numeric value, got: $PR_NUMBER"
  exit 1
fi

if ! [[ "$COMMENT_ID" =~ ^[0-9]+$ ]]; then
  echo "❌ ERROR: COMMENT_ID must be a numeric value, got: $COMMENT_ID"
  exit 1
fi

# Validate MESSAGE is not empty and has reasonable length
MESSAGE_LENGTH=${#MESSAGE}
if [ "$MESSAGE_LENGTH" -eq 0 ]; then
  echo "❌ ERROR: MESSAGE cannot be empty"
  exit 1
fi

if [ "$MESSAGE_LENGTH" -gt 65536 ]; then
  echo "❌ ERROR: MESSAGE is too long (max 65536 characters)"
  exit 1
fi

echo "Replying to comment #$COMMENT_ID on PR #$PR_NUMBER..."

# Reply to the comment using GitHub API
if gh api \
  --method POST \
  "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER/comments/$COMMENT_ID/replies" \
  -f body="$MESSAGE"; then
  echo "✅ Reply posted successfully"
else
  echo "❌ Failed to post reply"
  exit 1
fi
