import {datetime} from './datetime'

const TEST_DATE = '2024-01-15'
const TEST_TIMESTAMP = 1704153600000 // 2024-01-02 00:00:00 UTC
const TEST_DATETIME = '2024-01-15T14:30:45'

// Store original config to restore after each test
const DEFAULT_CONFIG = {
  defaultTimezone: 'UTC',
  defaultFormat: 'YYYY-MM-DD HH:mm:ss',
}

beforeEach(() => {
  // Reset to default config before each test
  datetime.configure(DEFAULT_CONFIG)
})

afterEach(() => {
  // Ensure config is reset after each test, even if test fails
  datetime.configure(DEFAULT_CONFIG)
})

describe('datetime - core functionality', () => {
  it('should create dayjs instance from various inputs', () => {
    expect(datetime()).toBeDefined()
    expect(datetime(TEST_DATE).isValid()).toBe(true)
    expect(datetime(TEST_TIMESTAMP).isValid()).toBe(true)
    expect(datetime(new Date(TEST_DATE)).isValid()).toBe(true)
  })

  it('should handle timestamp operations', () => {
    const before = Date.now()
    const timestamp = datetime.timestamp()
    const after = Date.now()
    expect(timestamp).toBeGreaterThanOrEqual(before)
    expect(timestamp).toBeLessThanOrEqual(after)
    expect(typeof timestamp).toBe('number')

    const date = datetime.fromTimestamp(TEST_TIMESTAMP)
    expect(date.isValid()).toBe(true)
    expect(date.valueOf()).toBe(TEST_TIMESTAMP)
  })

  it('should format dates correctly', () => {
    expect(datetime.format(TEST_DATE, 'MMM DD, YYYY')).toBe('Jan 15, 2024')
    expect(datetime.format(TEST_DATETIME, 'YYYY')).toBe('2024')
    expect(datetime.format(TEST_DATETIME, 'MM')).toBe('01')
    expect(datetime.format(TEST_DATETIME, 'YYYY-MM-DD')).toBe(TEST_DATE)
  })

  it('should format relative time', () => {
    const pastDate = datetime().subtract(2, 'hour')
    expect(datetime.formatRelative(pastDate)).toBe('2 hours ago')

    const futureDate = datetime().add(3, 'day')
    expect(datetime.formatRelative(futureDate)).toBe('in 3 days')
  })
})

describe('datetime - comparisons', () => {
  it('should check if dates are expired or future', () => {
    const pastDate = datetime().subtract(1, 'hour')
    expect(datetime.isExpired(pastDate)).toBe(true)
    expect(datetime.isFuture(pastDate)).toBe(false)

    const futureDate = datetime().add(1, 'hour')
    expect(datetime.isExpired(futureDate)).toBe(false)
    expect(datetime.isFuture(futureDate)).toBe(true)
  })

  it('should check if date is between two dates', () => {
    const start = '2024-01-01'
    const end = '2024-01-31'
    const middle = '2024-01-15'

    expect(datetime.isBetween(middle, start, end, '[]')).toBe(true)
    expect(datetime.isBetween('2024-02-15', start, end)).toBe(false)
    expect(datetime.isBetween(start, start, end, '()')).toBe(false)
    expect(datetime.isBetween(start, start, end, '[]')).toBe(true)
  })
})

describe('datetime - transformations', () => {
  it('should convert timezones', () => {
    const date = '2024-01-15T12:00:00Z'
    const converted = datetime.toTimezone(date, 'America/New_York')
    expect(converted.isValid()).toBe(true)

    const utc = datetime.toUTC('2024-01-15T12:00:00-05:00')
    expect(utc.isValid()).toBe(true)
  })

  it('should get start and end of time units', () => {
    const start = datetime.startOf(TEST_DATETIME, 'day')
    expect(start.format('HH:mm:ss')).toBe('00:00:00')

    const end = datetime.endOf(TEST_DATETIME, 'day')
    expect(end.format('HH:mm:ss')).toBe('23:59:59')
  })
})

describe('datetime - calculations', () => {
  it('should calculate differences', () => {
    const date1 = '2024-01-01'
    const date2 = '2024-01-15'
    expect(datetime.diff(date2, date1, 'day')).toBe(14)
    expect(datetime.diff(date1, date2, 'day')).toBe(-14)
  })

  it('should create durations', () => {
    const dur = datetime.duration(5000)
    expect(dur.asMilliseconds()).toBe(5000)

    const hourDur = datetime.duration(2, 'hour')
    expect(hourDur.asHours()).toBe(2)
    expect(hourDur.asMinutes()).toBe(120)
  })
})

describe('datetime - utilities', () => {
  it('should get current year', () => {
    const year = datetime.currentYear()
    expect(typeof year).toBe('number')
    expect(year).toBe(new Date().getFullYear())
  })

  it('should parse custom formats', () => {
    const parsed = datetime.parse('15/01/2024', 'DD/MM/YYYY')
    expect(parsed.isValid()).toBe(true)
    expect(parsed.year()).toBe(2024)
    expect(parsed.month()).toBe(0)
    expect(parsed.date()).toBe(15)
  })

  it('should validate dates', () => {
    expect(datetime.isValid(TEST_DATE)).toBe(true)
    expect(datetime.isValid(TEST_TIMESTAMP)).toBe(true)
    expect(datetime.isValid('invalid-date')).toBe(false)
    expect(datetime.isValid(undefined)).toBe(false)
  })

  it('should support configuration', () => {
    datetime.configure({defaultFormat: 'DD/MM/YYYY'})
    expect(datetime.format(TEST_DATE)).toBe('15/01/2024')
    datetime.configure({defaultFormat: 'YYYY-MM-DD HH:mm:ss'})
  })
})

describe('datetime - advanced operations', () => {
  it('should add and subtract time', () => {
    const date = datetime(TEST_DATE)
    expect(date.add(5, 'day').date()).toBe(20)
    expect(date.subtract(5, 'day').date()).toBe(10)
  })

  it('should chain operations', () => {
    const result = datetime(TEST_DATE).add(1, 'month').subtract(2, 'day').startOf('day')
    expect(result.format('YYYY-MM-DD')).toBe('2024-02-13')
  })
})

describe('datetime - edge cases', () => {
  it('should handle leap years', () => {
    const leapDate = datetime('2024-02-29')
    expect(leapDate.isValid()).toBe(true)
    expect(leapDate.date()).toBe(29)
  })

  it('should handle extreme dates', () => {
    expect(datetime('1900-01-01').isValid()).toBe(true)
    expect(datetime('2100-12-31').isValid()).toBe(true)
    expect(datetime.fromTimestamp(0).year()).toBe(1970)
  })
})
