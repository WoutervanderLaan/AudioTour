import 'fast-text-encoding'
import 'react-native-url-polyfill/auto'

/**
 * Defines a mock global class if it doesn't already exist.
 *
 * This polyfill function creates minimal mock implementations of browser APIs
 * that are required by MSW (Mock Service Worker) but are not available in
 * React Native's JavaScript environment. Each mock class accepts a type and
 * event initialization dictionary.
 *
 * @param {string} name - The name of the global class to mock (e.g., 'MessageEvent', 'Event')
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function defineMockGlobal(name) {
  if (typeof global[name] === 'undefined') {
    global[name] = class {
      constructor(type, eventInitDict) {
        this.type = type
        Object.assign(this, eventInitDict)
      }
    }
  }
}

;['MessageEvent', 'Event', 'EventTarget', 'BroadcastChannel'].forEach(
  defineMockGlobal,
)
