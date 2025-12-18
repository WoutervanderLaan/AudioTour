/**
 * ParagraphVariants
 * Union type defining the available paragraph text styles including body, intro, quote, and small text variants.
 */
export type ParagraphVariants =
  | 'body'
  | 'intro'
  | 'quote'
  | 'small'
  | 'extraSmall'

/**
 * ParagraphTokens
 * Type defining font size tokens for all paragraph text variants.
 */
type ParagraphTokens = {
  /**
   * body
   */
  body: number
  /**
   * extraSmall
   */
  extraSmall: number
  /**
   * intro
   */
  intro: number
  /**
   * quote
   */
  quote: number
  /**
   * small
   */
  small: number
}

/**
 * TitleTokensPerLevel
 * Type defining font size tokens for all heading levels from h1 to h6.
 */
export type TitleTokensPerLevel = {
  /**
   * h1
   */
  h1: number
  /**
   * h2
   */
  h2: number
  /**
   * h3
   */
  h3: number
  /**
   * h4
   */
  h4: number
  /**
   * h5
   */
  h5: number
  /**
   * h6
   */
  h6: number
}

export enum Emphasis {
  default = 'default',
  strong = 'strong',
}

/**
 * FontFamily
 * Enum defining all available font families in the application.
 * Uses Playfair Display for titles/headings and Lora for body text.
 */
export enum FontFamily {
  // Title/Heading fonts (Playfair Display)
  headingRegular = 'PlayfairDisplay-Regular',
  headingMedium = 'PlayfairDisplay-Medium',
  headingSemiBold = 'PlayfairDisplay-SemiBold',
  headingBold = 'PlayfairDisplay-Bold',
  headingExtraBold = 'PlayfairDisplay-ExtraBold',
  headingBlack = 'PlayfairDisplay-Black',

  // Body text fonts (Lora)
  regular = 'Lora-Regular',
  medium = 'Lora-Medium',
  semiBold = 'Lora-SemiBold',
  bold = 'Lora-Bold',
}

/**
 * TextTokens
 * Type defining all text-related theme tokens including font family, font size, and line height for all text variants.
 */
export type TextTokens = {
  /**
   * fontFamily
   */
  fontFamily: typeof FontFamily
  /**
   * fontSize
   */
  fontSize: ParagraphTokens & TitleTokensPerLevel
  /**
   * lineHeight
   */
  lineHeight: ParagraphTokens & TitleTokensPerLevel
}

const FontSize = {
  body: 18,
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 22,
  h5: 18,
  h6: 16,
  intro: 22,
  quote: 24,
  small: 16,
  extraSmall: 13,
} as const

export const textTokens: TextTokens = {
  fontSize: {
    body: FontSize.body,
    h1: FontSize.h1,
    h2: FontSize.h2,
    h3: FontSize.h3,
    h4: FontSize.h4,
    h5: FontSize.h5,
    h6: FontSize.h6,
    intro: FontSize.intro,
    quote: FontSize.quote,
    small: FontSize.small,
    extraSmall: FontSize.extraSmall,
  },
  fontFamily: {
    headingRegular: FontFamily.headingRegular,
    headingMedium: FontFamily.headingMedium,
    headingSemiBold: FontFamily.headingSemiBold,
    headingBold: FontFamily.headingBold,
    headingExtraBold: FontFamily.headingExtraBold,
    headingBlack: FontFamily.headingBlack,
    regular: FontFamily.regular,
    medium: FontFamily.medium,
    semiBold: FontFamily.semiBold,
    bold: FontFamily.bold,
  },
  lineHeight: {
    body: Math.round(1.6 * FontSize.body),
    h1: Math.round(1.1 * FontSize.h1),
    h2: Math.round(1.25 * FontSize.h2),
    h3: Math.round(1.3 * FontSize.h3),
    h4: Math.round(1.4 * FontSize.h4),
    h5: Math.round(1.4 * FontSize.h5),
    h6: Math.round(1.4 * FontSize.h6),
    intro: Math.round(1.6 * FontSize.intro),
    quote: Math.round(1.3 * FontSize.quote),
    small: Math.round(1.5 * FontSize.small),
    extraSmall: Math.round(1.5 * FontSize.extraSmall),
  },
} as const
