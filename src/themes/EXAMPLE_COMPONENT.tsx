/**
 * Example component demonstrating style token usage
 *
 * This file shows how to use the new style combination tokens in a real component.
 * You can copy patterns from this example into your own components.
 *
 * @example
 * ```tsx
 * import ExampleStyleTokens from '@/themes/EXAMPLE_COMPONENT'
 *
 * // Use in your app to see the different styles
 * <ExampleStyleTokens />
 * ```
 */

import React, {useState} from 'react'
import type {FC} from 'react'
import {ScrollView, Text, TextInput, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

/**
 * Example component showcasing all style token variants
 *
 * @returns React component displaying various style token examples
 */
const ExampleStyleTokens: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Style Tokens Examples</Text>

      {/* Border Examples */}
      <Text style={styles.sectionTitle}>Border Styles</Text>
      <View style={styles.borderDefault}>
        <Text>Default Border</Text>
      </View>
      <View style={styles.borderSharp}>
        <Text>Sharp Border (no radius)</Text>
      </View>
      <View style={styles.borderRounded}>
        <Text>Rounded Border (pill shape)</Text>
      </View>
      <View style={styles.borderThick}>
        <Text>Thick Border</Text>
      </View>

      {/* Card Examples */}
      <Text style={styles.sectionTitle}>Card Styles</Text>
      <View style={styles.cardDefault}>
        <Text>Default Card (subtle shadow + border)</Text>
      </View>
      <View style={styles.cardElevated}>
        <Text>Elevated Card (strong shadow, no border)</Text>
      </View>
      <View style={styles.cardOutlined}>
        <Text>Outlined Card (border, no shadow)</Text>
      </View>
      <View style={styles.cardFlat}>
        <Text>Flat Card (no border or shadow)</Text>
      </View>

      {/* Shadow Examples */}
      <Text style={styles.sectionTitle}>Shadow Styles</Text>
      <View style={styles.shadowSm}>
        <Text>Small Shadow</Text>
      </View>
      <View style={styles.shadowMd}>
        <Text>Medium Shadow</Text>
      </View>
      <View style={styles.shadowLg}>
        <Text>Large Shadow</Text>
      </View>

      {/* Input Examples */}
      <Text style={styles.sectionTitle}>Input Styles</Text>
      <TextInput
        style={isFocused ? styles.inputFocused : styles.input}
        placeholder="Focus me to see focused style"
        value={inputValue}
        onChangeText={setInputValue}
        onFocus={(): void => setIsFocused(true)}
        onBlur={(): void => setIsFocused(false)}
      />
      <TextInput
        style={styles.inputError}
        placeholder="Input with error style"
      />

      {/* Custom Combinations */}
      <Text style={styles.sectionTitle}>Custom Combinations</Text>
      <View style={styles.customCombination}>
        <Text>Flat card + Large shadow + Thick border</Text>
      </View>
      <View style={styles.overriddenBorder}>
        <Text>Default border with warning color override</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    padding: theme.size.lg,
    backgroundColor: theme.color.screen.background.default,
  },

  title: {
    fontSize: theme.text.fontSize.h2,
    fontFamily: theme.text.fontFamily.headingBold,
    color: theme.color.text.default,
    marginBottom: theme.size.lg,
  },

  sectionTitle: {
    fontSize: theme.text.fontSize.h4,
    fontFamily: theme.text.fontFamily.headingSemiBold,
    color: theme.color.text.default,
    marginTop: theme.size.lg,
    marginBottom: theme.size.md,
  },

  // Border Examples
  borderDefault: {
    ...theme.styles.border.default,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },

  borderSharp: {
    ...theme.styles.border.sharp,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },

  borderRounded: {
    ...theme.styles.border.rounded,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },

  borderThick: {
    ...theme.styles.border.thick,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },

  // Card Examples
  cardDefault: {
    ...theme.styles.card.default,
    padding: theme.size.lg,
    marginBottom: theme.size.sm,
  },

  cardElevated: {
    ...theme.styles.card.elevated,
    padding: theme.size.lg,
    marginBottom: theme.size.sm,
  },

  cardOutlined: {
    ...theme.styles.card.outlined,
    padding: theme.size.lg,
    marginBottom: theme.size.sm,
  },

  cardFlat: {
    ...theme.styles.card.flat,
    padding: theme.size.lg,
    marginBottom: theme.size.sm,
  },

  // Shadow Examples
  shadowSm: {
    ...theme.styles.shadow.sm,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },

  shadowMd: {
    ...theme.styles.shadow.md,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },

  shadowLg: {
    ...theme.styles.shadow.lg,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },

  // Input Examples
  input: {
    ...theme.styles.input.default,
    marginBottom: theme.size.sm,
  },

  inputFocused: {
    ...theme.styles.input.focused,
    marginBottom: theme.size.sm,
  },

  inputError: {
    ...theme.styles.input.error,
    marginBottom: theme.size.sm,
  },

  // Custom Combinations
  customCombination: {
    ...theme.styles.card.flat,
    ...theme.styles.shadow.lg,
    ...theme.styles.border.thick,
    padding: theme.size.lg,
    marginBottom: theme.size.sm,
  },

  overriddenBorder: {
    ...theme.styles.border.default,
    borderColor: theme.color.text.warning,
    borderWidth: 2,
    padding: theme.size.md,
    marginBottom: theme.size.sm,
    backgroundColor: theme.color.screen.background.default,
  },
}))

export default ExampleStyleTokens
