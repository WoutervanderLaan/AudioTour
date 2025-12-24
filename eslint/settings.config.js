/**
 * ESLint settings configuration for React and import resolution
 * @returns {Record<string, unknown>}
 */
export const createSettingsConfig = () => ({
  react: {version: 'detect'},
  'import/resolver': {
    typescript: {
      project: './tsconfig.json',
    },
  },
  'boundaries/elements': [
    {type: 'app', pattern: 'src/app/**'},
    {type: 'shared', pattern: 'src/shared/**'},
    {type: 'modules', pattern: 'src/modules/**'},
    {type: 'store', pattern: 'src/store/**'},
    {type: 'themes', pattern: 'src/themes/**'},
    {type: 'core', pattern: 'src/core/**'},
  ],
})
