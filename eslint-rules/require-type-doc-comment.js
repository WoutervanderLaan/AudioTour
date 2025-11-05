export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require JSDoc comments for all type properties',
      category: 'Best Practices',
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingType: "Type '{{name}}' must include documentation (/** ... */).",
      missingProperty:
        "Property '{{name}}' in type '{{typeName}}' must include documentation (/** ... */).",
    },
  },

  create(context) {
    const source = context.getSourceCode()

    function findTopLevelNode(node) {
      if (
        node.parent &&
        (node.parent.type === 'ExportNamedDeclaration' ||
          node.parent.type === 'ExportDefaultDeclaration')
      ) {
        return node.parent
      }
      return node
    }

    function hasJSDoc(node) {
      const topNode = findTopLevelNode(node)
      const comments = source.getCommentsBefore(topNode)
      return comments.some(
        c => c.type === 'Block' && c.value.trim().startsWith('*'),
      )
    }

    function getPropertyName(property) {
      if (property.key && property.key.type === 'Identifier') {
        return property.key.name
      }
      if (property.key && property.key.type === 'Literal') {
        return property.key.value
      }
      return 'property'
    }

    function getTypeName(node) {
      // For TSTypeAliasDeclaration
      if (node.id && node.id.name) {
        return node.id.name
      }
      // For TSInterfaceDeclaration
      if (node.id && node.id.name) {
        return node.id.name
      }
      return 'Type'
    }

    function insertTypeDocFix(fixer, node, name) {
      const topNode = findTopLevelNode(node)
      const firstToken = source.getFirstToken(topNode)
      const doc = `/**\n * ${name}\n * TODO: describe what this type represents.\n */\n`
      return fixer.insertTextBefore(firstToken, doc)
    }

    function insertPropertyDocFix(fixer, property, propertyName) {
      const firstToken = source.getFirstToken(property)
      const doc = `/**\n   * ${propertyName}\n   */\n  `
      return fixer.insertTextBefore(firstToken, doc)
    }

    function checkTypeProperties(node, typeName) {
      // Check TSTypeLiteral (type Foo = { ... })
      if (node.typeAnnotation && node.typeAnnotation.type === 'TSTypeLiteral') {
        const members = node.typeAnnotation.members
        members.forEach(member => {
          if (member.type === 'TSPropertySignature') {
            const comments = source.getCommentsBefore(member)
            const hasDoc = comments.some(
              c => c.type === 'Block' && c.value.trim().startsWith('*'),
            )
            if (!hasDoc) {
              const propertyName = getPropertyName(member)
              context.report({
                node: member,
                messageId: 'missingProperty',
                data: {name: propertyName, typeName},
                fix(fixer) {
                  return insertPropertyDocFix(fixer, member, propertyName)
                },
              })
            }
          }
        })
      }
    }

    function checkInterfaceProperties(node, typeName) {
      if (node.body && node.body.body) {
        node.body.body.forEach(member => {
          if (member.type === 'TSPropertySignature') {
            const comments = source.getCommentsBefore(member)
            const hasDoc = comments.some(
              c => c.type === 'Block' && c.value.trim().startsWith('*'),
            )
            if (!hasDoc) {
              const propertyName = getPropertyName(member)
              context.report({
                node: member,
                messageId: 'missingProperty',
                data: {name: propertyName, typeName},
                fix(fixer) {
                  return insertPropertyDocFix(fixer, member, propertyName)
                },
              })
            }
          }
        })
      }
    }

    return {
      TSTypeAliasDeclaration(node) {
        const typeName = getTypeName(node)

        // Check if the type itself has JSDoc
        if (!hasJSDoc(node)) {
          context.report({
            node,
            messageId: 'missingType',
            data: {name: typeName},
            fix(fixer) {
              return insertTypeDocFix(fixer, node, typeName)
            },
          })
        }

        // Check properties within the type
        checkTypeProperties(node, typeName)
      },

      TSInterfaceDeclaration(node) {
        const typeName = getTypeName(node)

        // Check if the interface itself has JSDoc
        if (!hasJSDoc(node)) {
          context.report({
            node,
            messageId: 'missingType',
            data: {name: typeName},
            fix(fixer) {
              return insertTypeDocFix(fixer, node, typeName)
            },
          })
        }

        // Check properties within the interface
        checkInterfaceProperties(node, typeName)
      },
    }
  },
}
