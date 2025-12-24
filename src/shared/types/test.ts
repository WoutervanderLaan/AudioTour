/**
 * TestProps
 * Required test ID props for core components with type-safe naming patterns.
 * The testId must end with the component's native element name for easy e2e test identification.
 *
 * @example
 * ```tsx
 * // Correct usage:
 * <Button testId="LoginScreenSubmitButton" />
 * <TextInput testId="ProfileFormEmailTextInput" />
 * <Switch testId="SettingsNotificationsSwitch" />
 *
 * // TypeScript errors - testId doesn't end with component name:
 * <Button testId="LoginScreenSubmit" /> // ❌ Must end with "Button"
 * <TextInput testId="ProfileFormEmail" /> // ❌ Must end with "TextInput"
 * ```
 *
 * @template Suffix - The native component name suffix (e.g., "Button", "TextInput")
 */
export type TestProps<Suffix extends string> = {
  /**
   * testId - Required test identifier for e2e testing.
   * Must end with the component's native element name.
   */
  testId: `${string}${Suffix}`
}
