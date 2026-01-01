import {RuleTester} from 'eslint'
import rule from './split-type-declarations.js'
import * as tsParser from '@typescript-eslint/parser'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
})

ruleTester.run('split-type-declarations', rule, {
  valid: [
    // Type declarations in .ts files are allowed
    {
      filename: 'Component.types.ts',
      code: `export type Props = { name: string }`,
    },
    {
      filename: 'types.ts',
      code: `export interface Config { enabled: boolean }`,
    },
    // Regular code in .tsx files without type declarations is allowed
    {
      filename: 'Component.tsx',
      code: `export const Component = () => <div>Hello</div>`,
    },
    // Non-tsx files with type declarations are allowed
    {
      filename: 'utils.ts',
      code: `export type Result = { success: boolean }`,
    },
  ],

  invalid: [
    // Type alias in .tsx file
    {
      filename: 'Component.tsx',
      code: `export type Props = { name: string }`,
      errors: [{messageId: 'splitType', data: {name: 'Props'}}],
    },
    // Interface in .tsx file
    {
      filename: 'Component.tsx',
      code: `export interface ComponentProps { title: string }`,
      errors: [{messageId: 'splitType', data: {name: 'ComponentProps'}}],
    },
    // Multiple type declarations in .tsx file
    {
      filename: 'Screen.tsx',
      code: `
        type ScreenProps = { id: string }
        interface ScreenState { loading: boolean }
        export const Screen = () => null
      `,
      errors: [
        {messageId: 'splitType', data: {name: 'ScreenProps'}},
        {messageId: 'splitType', data: {name: 'ScreenState'}},
      ],
    },
    // Non-exported type in .tsx file
    {
      filename: 'Button.tsx',
      code: `type ButtonVariant = 'primary' | 'secondary'`,
      errors: [{messageId: 'splitType', data: {name: 'ButtonVariant'}}],
    },
  ],
})
