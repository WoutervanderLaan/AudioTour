import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Absolute path to the project root directory
 * Used for consistent path resolution across all ESLint config files
 */
export const PROJECT_ROOT = resolve(__dirname, '..')
