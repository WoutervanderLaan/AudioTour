import fs from 'node:fs'
import path from 'node:path'

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure every folder recursively contains DOCS.md or README.md',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          include: {
            type: 'array',
            items: {type: 'string'},
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingDocs:
        "Folder '{{folder}}' must contain a DOCS.md or README.md file.",
    },
  },

  create(context) {
    const options = context.options[0] || {}
    const include = Array.isArray(options.include) ? options.include : []

    const cwd = context.cwd ?? process.cwd()

    /** Recursively walk folders */
    function walkFolders(dir) {
      // ignore files
      if (!fs.statSync(dir).isDirectory()) return

      const contents = fs.readdirSync(dir)

      const hasDocs =
        contents.includes('DOCS.md') || contents.includes('README.md')

      if (!hasDocs) {
        const relative = path.relative(cwd, dir)

        context.report({
          node: context.getSourceCode().ast,
          messageId: 'missingDocs',
          data: {folder: relative},
          fix(fixer) {
            const docsPath = path.join(dir, 'DOCS.md')
            const stub = `# ${relative}\n\nTODO: Explain the purpose and structure of this folder.\n`

            try {
              fs.writeFileSync(docsPath, stub, 'utf8')
            } catch (err) {
              console.error('folder-docs: failed to write file', err)
            }

            return fixer.insertTextAfterRange([0, 0], '')
          },
        })
      }

      // recurse into subfolders
      for (const name of contents) {
        const fullPath = path.join(dir, name)
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
          walkFolders(fullPath)
        }
      }
    }

    return {
      'Program:exit'() {
        for (const root of include) {
          const rootPath = path.join(cwd, root)
          if (fs.existsSync(rootPath) && fs.statSync(rootPath).isDirectory()) {
            walkFolders(rootPath)
          }
        }
      },
    }
  },
}
