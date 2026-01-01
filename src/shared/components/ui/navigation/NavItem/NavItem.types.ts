import type {IconName} from '@/core/navigation/types'
import type {PressableBaseProps} from '@/shared/components/ui/pressable/PressableBase'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * NavItemProps
 * Props for the NavItem component
 */
export type NavItemProps = Omit<
  PressableBaseProps,
  'children' | 'style' | 'testID'
> &
  TestProps<'NavItem'> & {
    /**
     * label - Text label for the navigation item
     */
    label: string
    /**
     * icon - Optional icon name from MaterialIcons
     */
    icon?: IconName
    /**
     * small - Optional smaller variant
     */
    small?: boolean
  }
