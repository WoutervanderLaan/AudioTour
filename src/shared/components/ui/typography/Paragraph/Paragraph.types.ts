import type {TextPropsBase} from '../TextBase/TextBase.types'

import type {ParagraphVariants} from '@/themes/tokens/text'

/**
 * ParagraphProps
 * Props for the Paragraph component
 */
export type ParagraphProps = Omit<TextPropsBase, 'fontSize' | 'lineHeight'> & {
  /**
   * variant - Paragraph variant (body, intro, quote, small, extraSmall)
   */
  variant?: ParagraphVariants
}
