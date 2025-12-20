/* eslint-disable no-console */
import {logger} from './logger'
import {LogLevel} from './types'

describe('logger', () => {
  beforeEach(() => {
    // Mock all console methods using jest.spyOn for automatic cleanup
    jest.spyOn(console, 'log').mockImplementation(jest.fn())
    jest.spyOn(console, 'warn').mockImplementation(jest.fn())
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
    jest.spyOn(console, 'group').mockImplementation(jest.fn())
    jest.spyOn(console, 'groupCollapsed').mockImplementation(jest.fn())
    jest.spyOn(console, 'groupEnd').mockImplementation(jest.fn())

    // Reset logger config to default (enabled in dev)
    logger.configure({
      enabled: true,
      minLevel: LogLevel.DEBUG,
      useColors: true,
    })
  })

  afterEach(() => {
    // Restore all mocks automatically
    jest.restoreAllMocks()
  })

  describe('basic logging', () => {
    it('should log debug messages', () => {
      logger.debug('Debug message')
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\[DEBUG\].*Debug message/),
      )
    })

    it('should log info messages', () => {
      logger.info('Info message')
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\[INFO\].*Info message/),
      )
    })

    it('should log success messages', () => {
      logger.success('Success message')
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\[SUCCESS\].*Success message/),
      )
    })

    it('should log warning messages', () => {
      logger.warn('Warning message')
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringMatching(/\[WARN\].*Warning message/),
      )
    })

    it('should log error messages', () => {
      logger.error('Error message')
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/\[ERROR\].*Error message/),
      )
    })
  })

  describe('logging with additional arguments', () => {
    it('should log debug with additional args', () => {
      const obj = {key: 'value'}
      logger.debug('Debug', obj, 123)
      expect(console.log).toHaveBeenCalledWith(expect.any(String), obj, 123)
    })

    it('should log info with additional args', () => {
      logger.info('Info', 'arg1', 'arg2')
      expect(console.log).toHaveBeenCalledWith(
        expect.any(String),
        'arg1',
        'arg2',
      )
    })

    it('should log error with error object', () => {
      const error = new Error('Test error')
      logger.error('Error occurred', error)
      expect(console.error).toHaveBeenCalledWith(expect.any(String), error)
    })
  })

  describe('log levels', () => {
    it('should respect minimum log level INFO', () => {
      logger.configure({minLevel: LogLevel.INFO})

      logger.debug('Debug message')
      logger.info('Info message')
      logger.warn('Warn message')

      expect(console.log).not.toHaveBeenCalledWith(
        expect.stringMatching(/\[DEBUG\].*Debug message/),
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\[INFO\].*Info message/),
      )
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringMatching(/\[WARN\].*Warn message/),
      )
    })

    it('should respect minimum log level WARN', () => {
      logger.configure({minLevel: LogLevel.WARN})

      logger.debug('Debug message')
      logger.info('Info message')
      logger.warn('Warn message')
      logger.error('Error message')

      expect(console.log).not.toHaveBeenCalled()
      expect(console.warn).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalled()
    })

    it('should respect minimum log level ERROR', () => {
      logger.configure({minLevel: LogLevel.ERROR})

      logger.debug('Debug message')
      logger.info('Info message')
      logger.warn('Warn message')
      logger.error('Error message')

      expect(console.log).not.toHaveBeenCalled()
      expect(console.warn).not.toHaveBeenCalled()
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('configuration', () => {
    it('should disable all logging when enabled is false', () => {
      logger.configure({enabled: false})

      logger.debug('Debug')
      logger.info('Info')
      logger.warn('Warn')
      logger.error('Error')

      expect(console.log).not.toHaveBeenCalled()
      expect(console.warn).not.toHaveBeenCalled()
      expect(console.error).not.toHaveBeenCalled()
    })

    it('should disable colors when useColors is false', () => {
      logger.configure({useColors: false})

      logger.info('Test message')

      const call = (console.log as jest.Mock).mock.calls[0][0]
      // Should not contain ANSI color codes
      expect(call).not.toContain('\x1b')
    })

    it('should allow partial configuration updates', () => {
      logger.configure({minLevel: LogLevel.WARN})

      logger.info('Info message')
      logger.warn('Warn message')

      expect(console.log).not.toHaveBeenCalled()
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe('table logging', () => {
    it('should log table with array of objects', () => {
      const data = [
        {name: 'Alice', age: 30},
        {name: 'Bob', age: 25},
      ]

      logger.table(data)

      expect(console.log).toHaveBeenCalled()
      const output = (console.log as jest.Mock).mock.calls
        .map(call => call[0])
        .join('\n')
      expect(output).toContain('Alice')
      expect(output).toContain('Bob')
    })

    it('should log table with single object', () => {
      const data = {name: 'Alice', age: 30}

      logger.table(data)

      expect(console.log).toHaveBeenCalled()
      const output = (console.log as jest.Mock).mock.calls
        .map(call => call[0])
        .join('\n')
      expect(output).toContain('Alice')
    })

    it('should log table with title', () => {
      const data = [{name: 'Test'}]

      logger.table(data, 'User Data')

      expect(console.log).toHaveBeenCalled()
      const firstCall = (console.log as jest.Mock).mock.calls[0][0]
      expect(firstCall).toContain('User Data')
    })

    it('should handle empty array', () => {
      logger.table([])

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Empty table'),
      )
    })

    it('should not log table when disabled', () => {
      logger.configure({enabled: false})

      logger.table([{name: 'Test'}])

      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('grouping', () => {
    it('should create a log group', () => {
      logger.group('Test Group')

      expect(console.group).toHaveBeenCalled()
    })

    it('should create a collapsed log group', () => {
      logger.groupCollapsed('Test Collapsed Group')

      expect(console.groupCollapsed).toHaveBeenCalled()
    })

    it('should end a log group', () => {
      logger.groupEnd()

      expect(console.groupEnd).toHaveBeenCalled()
    })

    it('should not group when disabled', () => {
      logger.configure({enabled: false})

      logger.group('Test')
      logger.groupEnd()

      expect(console.group).not.toHaveBeenCalled()
      expect(console.groupEnd).not.toHaveBeenCalled()
    })
  })

  describe('additional utilities', () => {
    it('should log colored message', () => {
      logger.colored('Colored text', 'red')

      expect(console.log).toHaveBeenCalled()
    })

    it('should log separator', () => {
      logger.separator()

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('─'))
    })

    it('should log separator with custom character', () => {
      logger.separator('*', 10)

      const call = (console.log as jest.Mock).mock.calls[0][0]
      expect(call).toContain('*')
    })

    it('should log JSON', () => {
      const obj = {key: 'value', nested: {prop: 123}}

      logger.json(obj)

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('"key"'))
    })

    it('should log JSON with title', () => {
      const obj = {key: 'value'}

      logger.json(obj, 'JSON Data')

      const calls = (console.log as jest.Mock).mock.calls
      expect(calls[0][0]).toContain('JSON Data')
      expect(calls[1][0]).toContain('"key"')
    })

    it('should not log utilities when disabled', () => {
      logger.configure({enabled: false})

      logger.colored('Test', 'red')
      logger.separator()
      logger.json({key: 'value'})

      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('edge cases', () => {
    it('should handle undefined and null in messages', () => {
      logger.info('Test', undefined, null)

      expect(console.log).toHaveBeenCalledWith(
        expect.any(String),
        undefined,
        null,
      )
    })

    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(10000)

      logger.info(longMessage)

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(longMessage),
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringMatching(/\[INFO\].*/),
      )
    })

    it('should handle special characters', () => {
      logger.info('Special chars: \n\t\r"\'\\')

      expect(console.log).toHaveBeenCalled()
    })

    it('should handle multiple rapid calls', () => {
      for (let i = 0; i < 100; i++) {
        logger.info(`Message ${i}`)
      }

      expect(console.log).toHaveBeenCalledTimes(100)
    })

    it('should handle circular references in JSON', () => {
      const obj: {self?: unknown} = {}
      obj.self = obj

      // JSON.stringify will throw on circular references
      expect(() => logger.json(obj)).toThrow()
    })
  })
})
