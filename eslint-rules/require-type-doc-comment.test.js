import {RuleTester} from 'eslint'
import rule from './require-type-doc-comment.js'
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

ruleTester.run('require-type-doc-comment', rule, {
  valid: [
    {
      code: `
        /**
         * User type
         */
        export type User = {
          /**
           * name
           */
          name: string
          /**
           * age
           */
          age: number
        }
      `,
    },
    {
      code: `
        /**
         * Config interface
         */
        interface Config {
          /**
           * enabled
           */
          enabled: boolean
        }
      `,
    },
  ],

  invalid: [
    {
      code: `export type User = { name: string }`,
      errors: [
        {messageId: 'missingType', data: {name: 'User'}},
        {messageId: 'missingProperty', data: {name: 'name', typeName: 'User'}},
      ],
      output: `/**
 * User
 * TODO: describe what this type represents.
 */
export type User = { /**
   * name
   */
  name: string }`,
    },
    {
      code: `
        export type UseUserLocationOptions = {
          shouldWatch?: boolean
          accuracy?: number
          distanceInterval?: number
        }
      `,
      errors: [
        {messageId: 'missingType', data: {name: 'UseUserLocationOptions'}},
        {
          messageId: 'missingProperty',
          data: {name: 'shouldWatch', typeName: 'UseUserLocationOptions'},
        },
        {
          messageId: 'missingProperty',
          data: {name: 'accuracy', typeName: 'UseUserLocationOptions'},
        },
        {
          messageId: 'missingProperty',
          data: {name: 'distanceInterval', typeName: 'UseUserLocationOptions'},
        },
      ],
      output: `
        /**
 * UseUserLocationOptions
 * TODO: describe what this type represents.
 */
export type UseUserLocationOptions = {
          /**
   * shouldWatch
   */
  shouldWatch?: boolean
          /**
   * accuracy
   */
  accuracy?: number
          /**
   * distanceInterval
   */
  distanceInterval?: number
        }
      `,
    },
    {
      code: `interface Config { enabled: boolean }`,
      errors: [
        {messageId: 'missingType', data: {name: 'Config'}},
        {
          messageId: 'missingProperty',
          data: {name: 'enabled', typeName: 'Config'},
        },
      ],
      output: `/**
 * Config
 * TODO: describe what this type represents.
 */
interface Config { /**
   * enabled
   */
  enabled: boolean }`,
    },
  ],
})
