const IS_DEV = process.env.APP_VARIANT === 'development'
const IS_PREVIEW = process.env.APP_VARIANT === 'preview'

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.woutervanderlaan.audiotour.dev'
  }

  if (IS_PREVIEW) {
    return 'com.woutervanderlaan.audiotour.preview'
  }

  return 'com.woutervanderlaan.audiotour'
}

const getAppName = () => {
  if (IS_DEV) {
    return 'AudioTour (Dev)'
  }

  if (IS_PREVIEW) {
    return 'AudioTour (Preview)'
  }

  return 'AudioTour'
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
