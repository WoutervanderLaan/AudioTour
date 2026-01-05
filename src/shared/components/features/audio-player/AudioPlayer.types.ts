import type {TestProps} from '@/shared/types/TestProps'

/**
 * AudioPlayerProps
 * Props for the AudioPlayer component
 */
export type AudioPlayerProps = TestProps<'AudioPlayer'> & {
  /**
   * Audio source URL
   */
  src: string
}
