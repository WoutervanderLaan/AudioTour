import {RuleTester} from 'eslint'
import rule from './require-doc-comment.js'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

const docTemplate = name =>
  `/**
 * ${name}
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
`

ruleTester.run('require-doc-comment', rule, {
  valid: [
    {
      code: `
        /**
         * test
         */
        function test() {}
      `,
    },
    {
      code: `
        /**
         * foo
         */
        export function foo() {}
      `,
    },
    {
      code: `
        /**
         * bar
         */
        const bar = () => {}
      `,
    },
    {
      code: `
        /**
         * MyClass
         */
        class MyClass {}
      `,
    },
  ],

  invalid: [
    {
      code: `function test() {}`,
      errors: [{messageId: 'missing', data: {name: 'test'}}],
      output: `${docTemplate('test')}function test() {}`,
    },
    {
      code: `export function foo() {}`,
      errors: [{messageId: 'missing', data: {name: 'foo'}}],
      output: `${docTemplate('foo')}export function foo() {}`,
    },
    {
      code: `async function doStuff() {}`,
      errors: [{messageId: 'missing', data: {name: 'doStuff'}}],
      output: `${docTemplate('doStuff')}async function doStuff() {}`,
    },
    {
      code: `export async function doStuff() {}`,
      errors: [{messageId: 'missing', data: {name: 'doStuff'}}],
      output: `${docTemplate('doStuff')}export async function doStuff() {}`,
    },
    {
      code: `const bar = () => {}`,
      errors: [{messageId: 'missing', data: {name: 'bar'}}],
      output: `${docTemplate('bar')}const bar = () => {}`,
    },
    {
      code: `export const bar = () => {}`,
      errors: [{messageId: 'missing', data: {name: 'bar'}}],
      output: `${docTemplate('bar')}export const bar = () => {}`,
    },
    {
      code: `class MyClass {}`,
      errors: [{messageId: 'missing', data: {name: 'MyClass'}}],
      output: `${docTemplate('MyClass')}class MyClass {}`,
    },
    {
      code: `export class MyClass {}`,
      errors: [{messageId: 'missing', data: {name: 'MyClass'}}],
      output: `${docTemplate('MyClass')}export class MyClass {}`,
    },
    {
      code: `export default function () {}`,
      errors: [{messageId: 'missing', data: {name: '(anonymous)'}}],
      output: `${docTemplate('Function')}export default function () {}`,
    },
  ],
})
