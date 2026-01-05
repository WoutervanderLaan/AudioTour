import type {TextPropsBase} from '../TextBase/TextBase.types'

/**
 * TitleLevel
 * Heading levels for the Title component
 */
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * TitleProps
 * Props for the Title component
 */
export type TitleProps = Omit<TextPropsBase, 'fontSize' | 'lineHeight'> & {
  /**
   * level - Heading level (h1-h6)
   */
  level?: TitleLevel
}
