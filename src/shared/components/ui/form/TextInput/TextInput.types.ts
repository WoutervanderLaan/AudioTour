import type {TextInputProps as RNTextInputProps} from 'react-native'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * TextInputProps
 * Props for the TextInput component
 */
export type TextInputProps = Omit<RNTextInputProps, 'editable' | 'testID'> &
  TestProps<'TextInput'> & {
    /**
     * disabled - Whether the input is disabled
     */
    disabled?: boolean
    /**
     * hasError - Whether the input has an error (for styling)
     */
    hasError?: boolean
    /**
     * inputId - Native ID for the input element
     */
    inputId?: string
    /**
     * labelId - Native ID for the associated label element
     */
    labelId?: string
  }
