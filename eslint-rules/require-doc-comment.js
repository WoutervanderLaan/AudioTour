// rules/require-docs.js
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require JSDoc comments for all functions and components',
      category: 'Best Practices',
    },
    fixable: 'code',
    schema: [],
    messages: {
      missing:
        "Function or component '{{name}}' must include documentation (/** ... */).",
    },
  },

  create(context) {
    const source = context.getSourceCode()

    function checkNode(node, name) {
      const jsdoc = source
        .getCommentsBefore(node)
        .find(c => c.type === 'Block' && c.value.startsWith('*'))

      if (!jsdoc) {
        context.report({
          node,
          messageId: 'missing',
          data: {name: name || '(anonymous)'},
          fix(fixer) {
            // Insert doc ABOVE the node’s first token
            const firstToken = source.getFirstToken(node)
            const doc = `/**\n * ${name ? 'Function or component ' + name : 'Function'}\n * TODO: describe what it does.\n *\n * @returns {*} describe return value\n */\n`
            return fixer.insertTextBefore(firstToken, doc)
          },
        })
      }
    }

    return {
      FunctionDeclaration(node) {
        checkNode(node, node.id && node.id.name)
      },

      VariableDeclarator(node) {
        const init = node.init
        if (!init) return

        if (
          init.type === 'ArrowFunctionExpression' ||
          init.type === 'FunctionExpression'
        ) {
          const name = node.id.name
          checkNode(node, name)
        }
      },

      ExportNamedDeclaration(node) {
        // handle: export function Foo() {}
        if (node.declaration) {
          const decl = node.declaration
          if (decl.type === 'FunctionDeclaration') {
            checkNode(decl, decl.id && decl.id.name)
          }

          if (
            decl.type === 'VariableDeclaration' &&
            decl.declarations.length === 1
          ) {
            const varDecl = decl.declarations[0]
            const init = varDecl.init
            if (
              init &&
              (init.type === 'ArrowFunctionExpression' ||
                init.type === 'FunctionExpression')
            ) {
              checkNode(varDecl, varDecl.id.name)
            }
          }
        }
      },
    }
  },
}
