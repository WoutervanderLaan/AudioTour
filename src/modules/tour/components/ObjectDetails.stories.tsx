import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {ObjectDetails, type ObjectDetailsProps} from './ObjectDetails'

const meta = {
  title: 'Module/Tour/ObjectDetails',
  component: ObjectDetails,
  tags: ['autodocs'],
} satisfies Meta<typeof ObjectDetails>

export default meta

/**
 * Story
 * Storybook story type for FeedItem component
 */
type Story = StoryObj<typeof meta>

const mockAudioUrl =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

const baseDatails: ObjectDetailsProps = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  recognitionConfidence: 90,
  objectId: 'abc-123',
  narrativeText:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  audioUrl: mockAudioUrl,
  status: 'ready',
}

export const Ready: Story = {
  args: baseDatails,
}

export const Error: Story = {
  args: {
    ...baseDatails,
    status: 'error',
    error: 'test',
  },
}
