#!/bin/bash
# Helper script to reply to a PR review comment
# Usage: ./reply-to-comment.sh <pr_number> <comment_id> <message>

set -e

PR_NUMBER=$1
COMMENT_ID=$2
MESSAGE=$3

if [ -z "$PR_NUMBER" ] || [ -z "$COMMENT_ID" ] || [ -z "$MESSAGE" ]; then
  echo "Usage: $0 <pr_number> <comment_id> <message>"
  exit 1
fi

echo "Replying to comment #$COMMENT_ID on PR #$PR_NUMBER..."

# Reply to the comment
gh api \
  --method POST \
  "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER/comments/$COMMENT_ID/replies" \
  -f body="$MESSAGE"

if [ $? -eq 0 ]; then
  echo "✅ Reply posted successfully"
else
  echo "❌ Failed to post reply"
  exit 1
fi
