/**
 * SimpleFormData
 * Form data type for the simple email form
 */
export type SimpleFormData = {
  /**
   * email
   */
  email: string
}

/**
 * ComplexFormData
 * Form data type for the complex registration form
 */
export type ComplexFormData = {
  /**
   * username
   */
  username: string
  /**
   * email
   */
  email: string
  /**
   * password
   */
  password: string
  /**
   * confirmPassword
   */
  confirmPassword: string
  /**
   * bio
   */
  bio?: string
}

/**
 * DefaultValuesFormData
 * Form data type for the form with default values
 */
export type DefaultValuesFormData = {
  /**
   * name
   */
  name: string
  /**
   * email
   */
  email: string
}
