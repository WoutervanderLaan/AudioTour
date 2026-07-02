const IS_DEV = process.env.APP_VARIANT === 'development'
const IS_PREVIEW = process.env.APP_VARIANT === 'preview'

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.example.app.dev'
  }

  if (IS_PREVIEW) {
    return 'com.example.app.preview'
  }

  return 'com.example.app'
}

const getAppName = () => {
  if (IS_DEV) {
    return 'ExpoTemplate (Dev)'
  }

  if (IS_PREVIEW) {
    return 'ExpoTemplate (Preview)'
  }

  return 'ExpoTemplate'
}

export default ({config}) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
})
