import 'fast-text-encoding'
import 'react-native-url-polyfill/auto'

/**
 * defineMockGlobal
 * TODO: describe what it does.
 *
 * @param {*} name
 * @returns {*} describe return value
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
