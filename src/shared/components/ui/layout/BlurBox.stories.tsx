// import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
// import {View, ImageBackground} from 'react-native'

// import {BlurBox} from './BlurBox'

// import {Text} from '@/shared/components/ui/typography/Text.Label'
// import {Text.Title} from '@/shared/components/ui/typography/Text.Title'

// const meta = {
//   title: 'Layout/BlurBox',
//   component: BlurBox,
//   tags: ['autodocs'],
//   decorators: [
//     Story => (
//       <ImageBackground
//         source={{
//           uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
//         }}
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: 400,
//         }}>
//         <Story />
//       </ImageBackground>
//     ),
//   ],
// } satisfies Meta<typeof BlurBox>

// export default meta

// /**
//  * Story
//  * Type definition for BlurBox component Storybook stories.
//  */
// type Story = StoryObj<typeof meta>

// export const Default: Story = {
//   args: {
//     tint: 'default',
//     intensity: 80,
//     padding: 'xxl',
//     style: {
//       borderRadius: 16,
//       overflow: 'hidden',
//       borderWidth: 1,
//       borderColor: 'rgba(255, 255, 255, 0.2)',
//     },
//   },
//   render: args => (
//     <BlurBox {...args}>
//       <Text.Title>Blurred Container</Text.Title>
//       <Text.Label style={{marginTop: 8}}>
//         This is a BlurBox with glassmorphism effect
//       </Text.Label>
//     </BlurBox>
//   ),
// }

// export const Light: Story = {
//   args: {
//     tint: 'light',
//     intensity: 80,
//     padding: 'xxl',
//     style: {
//       borderRadius: 16,
//       overflow: 'hidden',
//       borderWidth: 1,
//       borderColor: 'rgba(255, 255, 255, 0.3)',
//     },
//   },
//   render: args => (
//     <BlurBox {...args}>
//       <Text.Title>Light Blur</Text.Title>
//       <Text.Label style={{marginTop: 8}}>Light tint with high intensity</Text.Label>
//     </BlurBox>
//   ),
// }

// export const Dark: Story = {
//   args: {
//     tint: 'dark',
//     intensity: 80,
//     padding: 'xxl',
//     style: {
//       borderRadius: 16,
//       overflow: 'hidden',
//       borderWidth: 1,
//       borderColor: 'rgba(0, 0, 0, 0.3)',
//     },
//   },
//   render: args => (
//     <BlurBox {...args}>
//       <Text.Title>Dark Blur</Text.Title>
//       <Text.Label style={{marginTop: 8}}>Dark tint with high intensity</Text.Label>
//     </BlurBox>
//   ),
// }

// export const ExtraLight: Story = {
//   args: {
//     tint: 'extraLight',
//     intensity: 100,
//     padding: 'xxl',
//     style: {
//       borderRadius: 16,
//       overflow: 'hidden',
//       borderWidth: 1,
//       borderColor: 'rgba(255, 255, 255, 0.4)',
//     },
//   },
//   render: args => (
//     <BlurBox {...args}>
//       <Text.Title>Extra Light</Text.Title>
//       <Text.Label style={{marginTop: 8}}>Extra light tint with max intensity</Text.Label>
//     </BlurBox>
//   ),
// }

// export const LowIntensity: Story = {
//   args: {
//     tint: 'default',
//     intensity: 30,
//     padding: 'xxl',
//     style: {
//       borderRadius: 16,
//       overflow: 'hidden',
//       borderWidth: 1,
//       borderColor: 'rgba(255, 255, 255, 0.2)',
//     },
//   },
//   render: args => (
//     <BlurBox {...args}>
//       <Text.Title>Low Intensity</Text.Title>
//       <Text.Label style={{marginTop: 8}}>Subtle blur effect</Text.Label>
//     </BlurBox>
//   ),
// }

// export const SystemMaterial: Story = {
//   args: {
//     tint: 'systemMaterial',
//     intensity: 80,
//     padding: 'xxl',
//     style: {
//       borderRadius: 16,
//       overflow: 'hidden',
//       borderWidth: 1,
//       borderColor: 'rgba(255, 255, 255, 0.2)',
//     },
//   },
//   render: args => (
//     <BlurBox {...args}>
//       <Text.Title>System Material</Text.Title>
//       <Text.Label style={{marginTop: 8}}>iOS system material blur</Text.Label>
//     </BlurBox>
//   ),
// }

// export const WithLayout: Story = {
//   args: {
//     tint: 'default',
//     intensity: 80,
//     padding: 'xl',
//     row: true,
//     gap: 'md',
//     centerY: true,
//     style: {
//       borderRadius: 16,
//       overflow: 'hidden',
//       borderWidth: 1,
//       borderColor: 'rgba(255, 255, 255, 0.2)',
//     },
//   },
//   render: args => (
//     <BlurBox {...args}>
//       <View
//         style={{
//           width: 50,
//           height: 50,
//           borderRadius: 25,
//           backgroundColor: 'rgba(255, 255, 255, 0.3)',
//         }}
//       />
//       <View>
//         <Text.Title>With Layout Props</Text.Title>
//         <Text.Label style={{marginTop: 4}}>Supports all Box layout features</Text.Label>
//       </View>
//     </BlurBox>
//   ),
// }
