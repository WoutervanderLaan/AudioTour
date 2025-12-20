/**
 * Formats data as a table string
 *
 * @param data - Array of objects or single object to format as table
 * @returns Formatted table string
 */
export const formatTable = (
  data: Record<string, unknown>[] | Record<string, unknown>,
): string => {
  const rows = Array.isArray(data) ? data : [data]

  if (rows.length === 0) {
    return 'Empty table'
  }

  // Get all unique keys
  const keys = Array.from(new Set(rows.flatMap(row => Object.keys(row))))

  if (keys.length === 0) {
    return 'Empty table'
  }

  // Calculate column widths
  const columnWidths: Record<string, number> = {}
  keys.forEach(key => {
    const maxContentWidth = Math.max(
      ...rows.map(row => String(row[key] ?? '').length),
    )
    columnWidths[key] = Math.max(key.length, maxContentWidth, 3)
  })

  // Create table border
  /**
   * createBorder
   * Creates a table border string by repeating a character for each column.
   * The border length for each column matches its calculated width plus padding.
   *
   * @param char - The character to repeat for the border (e.g., '-' or '=')
   * @returns A formatted border string with '+' separators between columns
   */
  const createBorder = (char: string): string => {
    return keys.map(key => char.repeat(columnWidths[key] + 2)).join('+')
  }

  // Create header row
  const header = keys.map(key => ` ${key.padEnd(columnWidths[key])} `).join('|')

  // Create data rows
  const dataRows = rows.map(row =>
    keys
      .map(key => {
        const value = row[key]
        const stringValue =
          value === undefined || value === null ? '' : String(value)
        return ` ${stringValue.padEnd(columnWidths[key])} `
      })
      .join('|'),
  )

  // Assemble table
  const topBorder = createBorder('─')
  const middleBorder = createBorder('─')
  const bottomBorder = createBorder('─')

  return [
    `┌${topBorder}┐`,
    `│${header}│`,
    `├${middleBorder}┤`,
    ...dataRows.map(row => `│${row}│`),
    `└${bottomBorder}┘`,
  ].join('\n')
}
