// Mock AsyncStorage for Jest
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mock MaterialIcons
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons')

// Mock expo-crypto
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'test-uuid-123'),
}))

// Mock @notifee/react-native
jest.mock('@notifee/react-native', () => {
  const mockNotifee = {
    createChannels: jest.fn(),
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn(),
    requestPermission: jest.fn(),
    getNotificationSettings: jest.fn(),
    openNotificationSettings: jest.fn(),
    displayNotification: jest.fn(),
    cancelNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
    setBadgeCount: jest.fn(),
    getBadgeCount: jest.fn(),
    getInitialNotification: jest.fn(),
  }

  return {
    __esModule: true,
    default: mockNotifee,
    AndroidImportance: {
      DEFAULT: 3,
      HIGH: 4,
      LOW: 2,
    },
    AuthorizationStatus: {
      AUTHORIZED: 2,
      DENIED: 1,
      NOT_DETERMINED: 0,
    },
    EventType: {
      PRESS: 1,
      DISMISSED: 2,
      DELIVERED: 0,
    },
  }
})



