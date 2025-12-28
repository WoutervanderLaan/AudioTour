import type {TourSummary} from '../types'

/**
 * matchesSearchQuery
 * Checks if a tour matches the given search query.
 * Performs case-insensitive search on title, description, and museum name.
 *
 * @param tour - Tour summary to check
 * @param query - Search query string
 * @returns Whether the tour matches the query
 */
export const matchesSearchQuery = (
  tour: TourSummary,
  query: string,
): boolean => {
  const normalizedQuery = query.toLowerCase().trim()

  if (normalizedQuery.length === 0) {
    return true
  }

  const searchableFields = [tour.title, tour.description, tour.museumName]

  return searchableFields.some(field =>
    field.toLowerCase().includes(normalizedQuery),
  )
}
