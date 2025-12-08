import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View, ImageBackground} from 'react-native'

import {BlurBox} from './BlurBox'

import {Label} from '@/shared/components/ui/typography/Label'
import {Title} from '@/shared/components/ui/typography/Title'

const meta = {
  title: 'Layout/BlurBox',
  component: BlurBox,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}>
        <Story />
      </ImageBackground>
    ),
  ],
} satisfies Meta<typeof BlurBox>

export default meta

/**
 * Story
 * Type definition for BlurBox component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tint: 'default',
    intensity: 80,
    padding: 'xxl',
    style: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Blurred Container</Title>
      <Label style={{marginTop: 8}}>
        This is a BlurBox with glassmorphism effect
      </Label>
    </BlurBox>
  ),
}

export const Light: Story = {
  args: {
    tint: 'light',
    intensity: 80,
    padding: 'xxl',
    style: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Light Blur</Title>
      <Label style={{marginTop: 8}}>Light tint with high intensity</Label>
    </BlurBox>
  ),
}

export const Dark: Story = {
  args: {
    tint: 'dark',
    intensity: 80,
    padding: 'xxl',
    style: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Dark Blur</Title>
      <Label style={{marginTop: 8}}>Dark tint with high intensity</Label>
    </BlurBox>
  ),
}

export const ExtraLight: Story = {
  args: {
    tint: 'extraLight',
    intensity: 100,
    padding: 'xxl',
    style: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Extra Light</Title>
      <Label style={{marginTop: 8}}>Extra light tint with max intensity</Label>
    </BlurBox>
  ),
}

export const LowIntensity: Story = {
  args: {
    tint: 'default',
    intensity: 30,
    padding: 'xxl',
    style: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Low Intensity</Title>
      <Label style={{marginTop: 8}}>Subtle blur effect</Label>
    </BlurBox>
  ),
}

export const SystemMaterial: Story = {
  args: {
    tint: 'systemMaterial',
    intensity: 80,
    padding: 'xxl',
    style: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>System Material</Title>
      <Label style={{marginTop: 8}}>iOS system material blur</Label>
    </BlurBox>
  ),
}

export const WithLayout: Story = {
  args: {
    tint: 'default',
    intensity: 80,
    padding: 'xl',
    row: true,
    gap: 'md',
    centerY: true,
    style: {
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  render: args => (
    <BlurBox {...args}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      />
      <View>
        <Title>With Layout Props</Title>
        <Label style={{marginTop: 4}}>
          Supports all Box layout features
        </Label>
      </View>
    </BlurBox>
  ),
}

export const FeatheredAllEdges: Story = {
  args: {
    tint: 'default',
    intensity: 80,
    padding: 'xxl',
    featheredEdges: true,
    featherRadius: 30,
    style: {
      borderRadius: 16,
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Feathered Edges</Title>
      <Label style={{marginTop: 8}}>
        All edges fade smoothly into background
      </Label>
    </BlurBox>
  ),
}

export const FeatheredBottomEdge: Story = {
  args: {
    tint: 'default',
    intensity: 80,
    padding: 'xxl',
    featheredEdges: {bottom: true},
    featherRadius: 40,
    style: {
      borderRadius: 16,
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Feathered Bottom</Title>
      <Label style={{marginTop: 8}}>
        Bottom edge fades like a header
      </Label>
    </BlurBox>
  ),
}

export const FeatheredTopEdge: Story = {
  args: {
    tint: 'default',
    intensity: 80,
    padding: 'xxl',
    featheredEdges: {top: true},
    featherRadius: 40,
    style: {
      borderRadius: 16,
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Feathered Top</Title>
      <Label style={{marginTop: 8}}>
        Top edge fades like a tab bar
      </Label>
    </BlurBox>
  ),
}

export const FeatheredVerticalEdges: Story = {
  args: {
    tint: 'light',
    intensity: 80,
    padding: 'xxl',
    featheredEdges: {top: true, bottom: true},
    featherRadius: 50,
    style: {
      borderRadius: 16,
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Feathered Top & Bottom</Title>
      <Label style={{marginTop: 8}}>
        Vertical edges fade smoothly
      </Label>
    </BlurBox>
  ),
}

export const FeatheredWithCustomRadius: Story = {
  args: {
    tint: 'default',
    intensity: 80,
    padding: 'xxl',
    featheredEdges: true,
    featherRadius: 80,
    style: {
      borderRadius: 16,
    },
  },
  render: args => (
    <BlurBox {...args}>
      <Title>Large Feather Radius</Title>
      <Label style={{marginTop: 8}}>
        80px feather radius for subtle gradient
      </Label>
    </BlurBox>
  ),
}
