import {architecturalRules} from './architectural.rules.js'
import {codeQualityRules} from './code-quality.rules.js'
import {documentationRules} from './documentation.rules.js'
import {folderStructureRules} from './folder-structure.rules.js'
import {generalRules} from './general.rules.js'
import {importsRules} from './imports.rules.js'
import {miscRules} from './misc.rules.js'
import {reactRules} from './react.rules.js'
import {reactNativeRules} from './react-native.rules.js'
import {typescriptRules} from './typescript.rules.js'

/**
 * Combines all rule configurations into a single rules object
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const createAllRules = () => ({
  ...reactRules(),
  ...reactNativeRules(),
  ...typescriptRules(),
  ...generalRules(),
  ...codeQualityRules(),
  ...documentationRules(),
  ...folderStructureRules(),
  ...importsRules(),
  ...architecturalRules(),
  ...miscRules(),
})
