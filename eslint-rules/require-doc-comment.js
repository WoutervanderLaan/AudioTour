export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require JSDoc comments for all functions and classes',
      category: 'Best Practices',
    },
    fixable: 'code',
    schema: [],
    messages: {
      missing:
        "Function, class, or component '{{name}}' must include documentation (/** ... */).",
    },
  },

  create(context) {
    const source = context.getSourceCode()

    function findTopLevelNode(current) {
      if (
        current.parent &&
        (current.parent.type === 'ExportNamedDeclaration' ||
          current.parent.type === 'ExportDefaultDeclaration')
      ) {
        return current.parent
      }

      if (current.type === 'VariableDeclarator' && current.parent) {
        return current.parent
      }

      return current
    }

    function findNodeForInsertion(node) {
      // For VariableDeclarator, we want to insert before the VariableDeclaration
      if (node.type === 'VariableDeclarator' && node.parent) {
        const varDecl = node.parent
        // Check if the VariableDeclaration is exported
        if (
          varDecl.parent &&
          (varDecl.parent.type === 'ExportNamedDeclaration' ||
            varDecl.parent.type === 'ExportDefaultDeclaration')
        ) {
          return varDecl.parent
        }
        return varDecl
      }

      // For functions and classes, check if they're exported
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
      const comments = source.getCommentsBefore(node)

      return comments.some(
        c => c.type === 'Block' && c.value.trim().startsWith('*'),
      )
    }

    function getFunctionNode(node) {
      if (node.type === 'VariableDeclarator' && node.init) {
        return node.init
      }
      return node
    }

    function getParams(node) {
      const funcNode = getFunctionNode(node)
      if (
        funcNode.type === 'FunctionDeclaration' ||
        funcNode.type === 'FunctionExpression' ||
        funcNode.type === 'ArrowFunctionExpression'
      ) {
        return funcNode.params || []
      }
      return []
    }

    function getParamName(param) {
      if (param.type === 'Identifier') {
        return param.name
      }
      if (
        param.type === 'RestElement' &&
        param.argument.type === 'Identifier'
      ) {
        return `...${param.argument.name}`
      }
      if (
        param.type === 'AssignmentPattern' &&
        param.left.type === 'Identifier'
      ) {
        return param.left.name
      }
      if (param.type === 'ObjectPattern') {
        return 'options'
      }
      if (param.type === 'ArrayPattern') {
        return 'items'
      }
      return 'param'
    }

    function insertDocFix(fixer, node, name) {
      const insertionNode = findNodeForInsertion(node)
      const firstToken = source.getFirstToken(insertionNode)

      const params = getParams(node)
      const paramDocs = params
        .map(param => {
          const paramName = getParamName(param)
          return ` * @param {*} ${paramName}`
        })
        .join('\n')

      let doc = `/**\n * ${name || 'Function'}\n * TODO: describe what it does.\n *\n`
      if (paramDocs) {
        doc += `${paramDocs}\n`
      }
      doc += ` * @returns {*} describe return value\n */\n`

      return fixer.insertTextBefore(firstToken, doc)
    }

    function checkNode(node, name) {
      const topNode = findTopLevelNode(node)
      if (!hasJSDoc(topNode)) {
        context.report({
          node,
          messageId: 'missing',
          data: {name: name || '(anonymous)'},
          fix(fixer) {
            return insertDocFix(fixer, node, name)
          },
        })
      }
    }

    return {
      FunctionDeclaration(node) {
        checkNode(node, node.id && node.id.name)
      },
      ClassDeclaration(node) {
        checkNode(node, node.id && node.id.name)
      },
      VariableDeclarator(node) {
        const init = node.init
        if (
          init &&
          (init.type === 'ArrowFunctionExpression' ||
            init.type === 'FunctionExpression')
        ) {
          checkNode(node, node.id.name)
        }
      },
    }
  },
}
