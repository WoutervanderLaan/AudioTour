/**
 * Folder structure and boundaries rules configuration
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const folderStructureRules = () => ({
  'unicorn/filename-case': [
    'error',
    {
      cases: {
        camelCase: true,
        pascalCase: true,
      },
    },
  ],
  'local/split-type-declarations': 'warn',
  'local/enforce-feature-structure': [
    'error',
    {
      allowedFolders: ['modules', 'shared', 'app', 'store', 'themes', 'core'],
    },
  ],
  'boundaries/no-unknown': 'error',
  'boundaries/element-types': [
    'error',
    {
      default: 'disallow',
      rules: [
        {
          from: ['app'],
          allow: ['shared', 'store', 'themes', 'modules', 'core'],
        },
        {from: ['core'], allow: ['shared', 'modules']},
        {from: ['shared'], allow: ['themes', 'core']},
        {from: ['modules'], allow: ['shared', 'store', 'core']},
        {from: ['store'], allow: ['shared']},
      ],
    },
  ],
})
