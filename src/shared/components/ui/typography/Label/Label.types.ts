import type {TextPropsBase} from '../TextBase/TextBase.types'

/**
 * LabelProps
 * Props for the Text.Label component
 */
export type LabelProps = Omit<TextPropsBase, 'fontSize' | 'lineHeight'>
