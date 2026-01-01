import type {PressableBaseProps} from '../PressableBase/PressableBase.types'

import type {ParagraphProps} from '@/shared/components/ui/typography/Paragraph/Paragraph.types'
import type {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * LinkButtonProps
 * Props for the LinkButton component
 */
export type LinkButtonProps = Omit<
  PressableBaseProps,
  'style' | 'children' | 'testID'
> &
  Omit<ParagraphProps, 'style' | 'children' | 'testID'> &
  TestProps<'LinkButton'> & {
    /**
     * label - Text content of the link button
     */
    label: string
    /**
     * textVariant - Text variant to use for the label
     */
    textVariant?: keyof typeof Text
  }
