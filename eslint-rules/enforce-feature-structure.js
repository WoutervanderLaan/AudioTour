import path from 'node:path'
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure files are inside allowed src subfolders (features, shared, etc).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedFolders: {
            type: 'array',
            items: {type: 'string'},
            minItems: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      misplacedFile:
        'File "{{file}}" is not inside an allowed folder ({{allowed}}).',
    },
  },

  create(context) {
    const filename = context.getFilename()
    if (filename.includes('node_modules')) return {}

    const options = context.options[0] || {}
    const allowedFolders = options.allowedFolders || []

    const relative = path.relative(process.cwd(), filename)

    // Create a dynamic regex like: ^src\/(features|shared|app)\/
    const folderRegex = new RegExp(`^src\\/(${allowedFolders.join('|')})\\/`)

    if (!folderRegex.test(relative)) {
      context.report({
        loc: {line: 1, column: 0},
        messageId: 'misplacedFile',
        data: {
          file: relative,
          allowed: allowedFolders.join(', '),
        },
      })
    }

    return {}
  },
}
