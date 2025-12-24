/**
 * TestProps
 * Required test ID props for core components with type-safe naming patterns.
 * The testID must end with the component's native element name for easy e2e test identification.
 *
 * @example
 * ```tsx
 * // Correct usage:
 * <Button testID="LoginScreenSubmitButton" />
 * <TextInput testID="ProfileFormEmailTextInput" />
 * <Switch testID="SettingsNotificationsSwitch" />
 *
 * // TypeScript errors - testID doesn't end with component name:
 * <Button testID="LoginScreenSubmit" /> // ❌ Must end with "Button"
 * <TextInput testID="ProfileFormEmail" /> // ❌ Must end with "TextInput"
 * ```
 *
 * @template Suffix - The component name suffix (e.g., "Button", "TextInput")
 */
export type TestProps<Suffix extends string> = {
  /**
   * testID - Required test identifier for e2e testing.
   * Must end with the component's element name.
   */
  testID: `${string}${Suffix}`
}
