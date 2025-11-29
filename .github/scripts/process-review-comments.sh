#!/bin/bash
# Helper script for Claude to process PR review comments systematically
# Usage: ./process-review-comments.sh <pr_number> <review_id>

set -e

PR_NUMBER=$1
REVIEW_ID=$2

if [ -z "$PR_NUMBER" ] || [ -z "$REVIEW_ID" ]; then
  echo "Usage: $0 <pr_number> <review_id>"
  exit 1
fi

echo "=== Fetching Review Comments for PR #$PR_NUMBER, Review #$REVIEW_ID ==="

# Fetch review comments
COMMENTS=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER/reviews/$REVIEW_ID/comments" 2>/dev/null || echo "[]")
COMMENT_COUNT=$(echo "$COMMENTS" | jq 'length')

echo "Found $COMMENT_COUNT review comments"

# Fetch the main review body
REVIEW=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER/reviews/$REVIEW_ID" 2>/dev/null || echo "{}")
REVIEW_BODY=$(echo "$REVIEW" | jq -r '.body // ""')
REVIEW_STATE=$(echo "$REVIEW" | jq -r '.state // ""')

echo ""
echo "=== Review Summary ==="
echo "State: $REVIEW_STATE"
echo "Body: $REVIEW_BODY"
echo ""

# Output comments in a structured format
if [ "$COMMENT_COUNT" -gt 0 ]; then
  echo "=== Review Comments ==="
  echo "$COMMENTS" | jq -r '.[] |
    "---\n" +
    "Comment ID: \(.id)\n" +
    "File: \(.path)\n" +
    "Line: \(.line // .original_line)\n" +
    "Author: \(.user.login)\n" +
    "Body:\n\(.body)\n"'
fi

# Output as JSON for programmatic processing
echo ""
echo "=== JSON Output ==="
jq -n \
  --argjson comments "$COMMENTS" \
  --arg review_body "$REVIEW_BODY" \
  --arg review_state "$REVIEW_STATE" \
  '{
    review_state: $review_state,
    review_body: $review_body,
    comments: $comments
  }'
