# PR Review Rework Workflow

This document explains how the automated PR review rework system works.

## Overview

When a code review is submitted on a PR, Claude automatically processes the review comments, makes necessary changes, and replies to each comment with a resolution.

## Workflow Trigger

The workflow (`.github/workflows/pr-review-rework.yml`) triggers when:
- A PR review is submitted (`pull_request_review.submitted` event)
- The review state is `approved`, `commented`, or `changes_requested`

## Process Flow

### 1. Review Submission
When you submit a review on a PR:
- Add inline comments on specific lines of code
- Add general comments in the review summary
- Submit with state: Approve, Comment, or Request Changes

### 2. Automatic Processing
The workflow automatically:
1. Checks out the PR branch
2. Fetches all review comments
3. Invokes Claude to process each comment
4. Claude makes necessary changes
5. Claude commits and pushes updates
6. Claude replies to every comment

### 3. Comment Processing

For each review comment, Claude will:

#### Inline Code Comments
- Read the file and understand the context
- Analyze the requested change
- Implement the change if valid
- Commit with a descriptive message
- Reply to the comment with resolution

#### General Review Comments
- Read the overall feedback
- Address each point systematically
- Post a summary response

### 4. Reply Format

Claude uses standard reply formats:

- **Change implemented:**
  ```
  ✅ Fixed in [commit]. [Brief explanation]
  ```

- **No change needed:**
  ```
  ✅ Acknowledged. [Explanation why]
  ```

- **Needs clarification:**
  ```
  ❓ I need more information: [specific question]
  ```

## Helper Scripts

Two helper scripts are available in `.github/scripts/`:

### process-review-comments.sh
Fetches and structures review comments for processing.

```bash
./.github/scripts/process-review-comments.sh <pr_number> <review_id>
```

**Output:**
- Comment count
- Review state and body
- Structured list of all comments
- JSON format for programmatic processing

### reply-to-comment.sh
Posts a reply to a specific review comment.

```bash
./.github/scripts/reply-to-comment.sh <pr_number> <comment_id> "Your message"
```

## Manual Processing (Claude's Perspective)

When Claude processes a review, it follows these steps:

### Step 1: Fetch Comments
```bash
# Get review comments
gh api repos/$REPO/pulls/$PR_NUMBER/reviews/$REVIEW_ID/comments

# Or use the helper script
./.github/scripts/process-review-comments.sh $PR_NUMBER $REVIEW_ID
```

### Step 2: Create Todo List
Create a todo item for each comment that needs addressing.

### Step 3: Process Each Comment

For each comment:

1. **Read the context:**
   ```bash
   # Read the file mentioned in the comment
   cat $FILE_PATH
   ```

2. **Make the change:**
   ```bash
   # Use appropriate edit/write tools
   # Follow project guidelines in CLAUDE.md
   ```

3. **Validate:**
   ```bash
   npm run validate
   npm test
   ```

4. **Commit:**
   ```bash
   git add $FILES
   git commit -m "Fix: $DESCRIPTION

   Addresses review comment: $COMMENT_URL"
   ```

5. **Reply:**
   ```bash
   gh api \
     --method POST \
     repos/$REPO/pulls/$PR_NUMBER/comments/$COMMENT_ID/replies \
     -f body="✅ Fixed in $(git rev-parse --short HEAD). $EXPLANATION"
   ```

### Step 4: Push Changes
```bash
git push origin $BRANCH_NAME
```

### Step 5: Post Summary
```bash
gh pr comment $PR_NUMBER \
  --body "## ✅ Review Feedback Processed

I've addressed all review comments from @$REVIEWER.

**Changes made:** X files updated
**Comments resolved:** Y comments

All comments have been replied to individually."
```

## Best Practices

### For Reviewers
- Be specific in your comments
- Reference exact lines or sections
- Provide examples when suggesting changes
- Use clear, actionable language

### For Claude
- Always reply to EVERY comment
- Be respectful and professional
- Ask for clarification when unclear
- Validate changes before committing
- Keep commits focused and atomic

## Edge Cases

### Conflicting Feedback
If review comments conflict with each other:
1. Reply to all conflicting comments
2. Ask the reviewer for clarification
3. Don't proceed until resolved

### Unclear Requests
If a comment is ambiguous:
1. Reply with specific questions
2. Provide options if applicable
3. Wait for reviewer response

### No Change Needed
If a comment doesn't require changes:
1. Still reply to acknowledge
2. Explain why no change is needed
3. Offer to discuss if reviewer disagrees

## Example Review Processing Session

### Review Comment
```
File: src/components/Button.tsx
Line: 15
Comment: "This should use the theme token instead of a hardcoded color"
```

### Claude's Response
1. Reads `src/components/Button.tsx`
2. Identifies the hardcoded color on line 15
3. Checks theme tokens in `src/themes/tokens/`
4. Updates the code to use theme token
5. Runs `npm run validate`
6. Commits: `Fix: Use theme token for button color`
7. Replies:
   ```
   ✅ Fixed in abc123. Changed hardcoded color to theme.colors.primary.
   Now properly uses the theme system as per project guidelines.
   ```

## Monitoring

Check workflow runs at:
```
https://github.com/$OWNER/$REPO/actions/workflows/pr-review-rework.yml
```

View the workflow summary for:
- Number of comments processed
- Changes made
- Any errors or issues

## Troubleshooting

### Workflow doesn't trigger
- Check that review was actually submitted (not just saved as pending)
- Verify the review has comments or a body
- Check workflow file permissions

### Claude doesn't reply to comments
- Check GitHub API permissions
- Verify GH_TOKEN is available
- Check logs for API errors

### Changes not pushed
- Check git configuration
- Verify branch permissions
- Check for merge conflicts

## Integration with Trello

The workflow integrates with existing Trello workflows:
- Updates task status after processing
- Links PR and review in Trello card
- Notifies on completion or errors
