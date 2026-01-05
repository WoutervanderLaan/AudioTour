import type {HistorySortOption, TourSummary} from '../types'

/**
 * sortTours
 * Sorts tours based on the specified sort option.
 *
 * @param tours - Array of tour summaries to sort
 * @param sortBy - Sort option
 * @returns Sorted array of tour summaries
 */
export const sortTours = (
  tours: TourSummary[],
  sortBy: HistorySortOption,
): TourSummary[] => {
  const sorted = [...tours]

  switch (sortBy) {
    case 'date-desc':
      return sorted.sort((a, b) => b.createdAt - a.createdAt)
    case 'date-asc':
      return sorted.sort((a, b) => a.createdAt - b.createdAt)
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}
