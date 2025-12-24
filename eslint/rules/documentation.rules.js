/**
 * Documentation rules configuration (custom local rules)
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const documentationRules = () => ({
  'local/require-doc-comment': 'error',
  'local/require-type-doc-comment': 'error',
  'local/require-folder-docs': [
    'error',
    {
      include: ['src', 'app', 'store', 'themes', 'modules', 'core', 'shared'],
    },
  ],
})
