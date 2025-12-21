// Mock AsyncStorage for Jest
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons')

// import { server } from '../src/core/api/mocks/server.node'

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

