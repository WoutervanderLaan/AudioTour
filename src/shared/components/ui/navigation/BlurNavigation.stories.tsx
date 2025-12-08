import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View, ImageBackground} from 'react-native'

import {BlurBox} from '../layout/BlurBox'
import {Label} from '../typography/Label'
import {Title} from '../typography/Title'
import {Paragraph} from '../typography/Paragraph'

/**
 * Documentation component for blur navigation components
 */
const BlurNavigationDocs = (): React.JSX.Element => {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
      }}
      style={{
        flex: 1,
        padding: 20,
        minHeight: 600,
      }}>
      <BlurBox
        padding="xl"
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          marginBottom: 20,
        }}>
        <Title>Blur Navigation Components</Title>
        <Paragraph style={{marginTop: 12}}>
          This app includes blur components for navigation elements using
          expo-blur.
        </Paragraph>
      </BlurBox>

      <BlurBox
        padding="lg"
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          marginBottom: 20,
        }}>
        <Label style={{fontWeight: 'bold', marginBottom: 8}}>
          BlurTabBar
        </Label>
        <Paragraph>
          Blurred bottom tab bar component. Already integrated in
          RootNavigator.tsx.
        </Paragraph>
      </BlurBox>

      <BlurBox
        padding="lg"
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          marginBottom: 20,
        }}>
        <Label style={{fontWeight: 'bold', marginBottom: 8}}>BlurHeader</Label>
        <Paragraph>
          Blurred header component for screens. Use getBlurHeaderOptions()
          helper.
        </Paragraph>
        <View
          style={{
            marginTop: 12,
            padding: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 8,
          }}>
          <Label style={{fontFamily: 'monospace', fontSize: 11}}>
            {`import {getBlurHeaderOptions} from '@/shared/hooks/useNavigationTheme'\n\n<Stack.Screen\n  name="MyScreen"\n  component={MyScreen}\n  options={getBlurHeaderOptions(80)}\n/>`}
          </Label>
        </View>
      </BlurBox>

      <BlurBox
        padding="lg"
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          marginBottom: 20,
        }}>
        <Label style={{fontWeight: 'bold', marginBottom: 8}}>BlurBox</Label>
        <Paragraph>
          General-purpose blur container component. Use anywhere in your app for
          glassmorphism effects.
        </Paragraph>
        <View
          style={{
            marginTop: 12,
            padding: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 8,
          }}>
          <Label style={{fontFamily: 'monospace', fontSize: 11}}>
            {`import {BlurBox} from '@/shared/components/ui/layout/BlurBox'\n\n<BlurBox\n  tint="light"\n  intensity={80}\n  padding="xl"\n>\n  <Text>Content</Text>\n</BlurBox>`}
          </Label>
        </View>
      </BlurBox>

      <BlurBox
        padding="lg"
        featheredEdges={true}
        featherRadius={30}
        style={{
          borderRadius: 16,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}>
        <Label style={{fontWeight: 'bold', marginBottom: 8}}>
          Feathered Edges
        </Label>
        <Paragraph>
          All blur components support feathered (gradient fade) edges for smoother
          blending with the background. BlurBox supports all edges, BlurHeader
          supports bottom edge, and BlurTabBar supports top edge.
        </Paragraph>
        <View
          style={{
            marginTop: 12,
            padding: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 8,
          }}>
          <Label style={{fontFamily: 'monospace', fontSize: 11}}>
            {`// Feather all edges\n<BlurBox featheredEdges={true} featherRadius={30} />\n\n// Feather specific edges\n<BlurBox featheredEdges={{bottom: true}} />\n\n// Header with feathered bottom\n<BlurHeader featheredBottomEdge={true} />\n\n// Tab bar with feathered top\n<BlurTabBar featheredTopEdge={true} />`}
          </Label>
        </View>
      </BlurBox>
    </ImageBackground>
  )
}

const meta = {
  title: 'Navigation/BlurComponents',
  component: BlurNavigationDocs,
  tags: ['autodocs'],
} satisfies Meta<typeof BlurNavigationDocs>

export default meta

/**
 * Story
 * Type definition for BlurNavigation component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Documentation: Story = {
  args: {},
}
