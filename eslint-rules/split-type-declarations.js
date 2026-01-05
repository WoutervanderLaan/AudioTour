export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Type declarations should be moved to their own file.',
      category: 'Best Practices',
    },
    schema: [],
    messages: {
      splitType:
        "Type '{{name}}' clutters the component and must be moved to its own ComponentName.types.ts file.",
    },
  },

  create(context) {
    const filename = context.filename || context.getFilename()

    if (!filename.endsWith('.tsx')) {
      return {}
    }

    /**
     * Reports a type declaration that should be moved to a separate file
     * @param {object} node - The AST node
     * @param {string} name - The name of the type
     */
    function reportTypeDeclaration(node, name) {
      context.report({
        node,
        messageId: 'splitType',
        data: {name},
      })
    }

    return {
      TSTypeAliasDeclaration(node) {
        const name = node.id?.name || 'Type'
        reportTypeDeclaration(node, name)
      },

      TSInterfaceDeclaration(node) {
        const name = node.id?.name || 'Interface'
        reportTypeDeclaration(node, name)
      },
    }
  },
}
