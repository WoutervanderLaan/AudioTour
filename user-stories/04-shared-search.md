# User Story: Shared Search Functionality

## Overview

**As a** user
**I want** to search and filter tours quickly
**So that** I can find specific tours in my history or the community

## Description

This shared feature provides a reusable search component and filtering logic that can be used by both the History and Community Tours modules. The component includes a search input, optional filter chips, and debounced query handling.

## Acceptance Criteria

- [ ] Search input with clear button and search icon
- [ ] Debounced search to prevent excessive queries
- [ ] Optional filter chips for quick filtering
- [ ] Works with both local (history) and remote (community) data
- [ ] Accessible with proper labels and keyboard navigation
- [ ] Consistent styling across modules

---

## Tasks

### TASK-4.1: Create Search Input Component

**Description:** Build a reusable search input component with icon, clear button, and debounce.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/shared/components/ui/form/TextInput.tsx`
- `src/shared/components/ui/pressable/IconButton.tsx`

**Location:** `src/shared/components/ui/form/SearchInput.tsx`

**Subtasks:**
- [ ] Create `src/shared/components/ui/form/SearchInput.tsx`
- [ ] Props interface:
```typescript
type SearchInputProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  debounceMs?: number          // Default: 300ms
  onClear?: () => void
  autoFocus?: boolean
  testID?: string
}
```
- [ ] Implement with:
  - Search icon on left (magnifying glass)
  - Clear button on right (appears when text present)
  - Debounced `onChangeText` using `useDebouncedCallback`
- [ ] Use `useStyles` with theme tokens
- [ ] Add accessibility labels
- [ ] Add JSDoc documentation
- [ ] Export from `src/shared/components/ui/form/index.ts`
- [ ] Write unit tests

**Implementation:**
```tsx
export const SearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  debounceMs = 300,
  onClear,
  autoFocus = false,
  testID,
}: SearchInputProps): ReactElement => {
  const { styles } = useStyles(stylesheet)

  const debouncedOnChange = useDebouncedCallback(
    (text: string) => onChangeText(text),
    debounceMs
  )

  const [localValue, setLocalValue] = useState(value)

  const handleChange = (text: string): void => {
    setLocalValue(text)
    debouncedOnChange(text)
  }

  const handleClear = (): void => {
    setLocalValue('')
    onChangeText('')
    onClear?.()
  }

  return (
    <View style={styles.container}>
      <Icon name="search" style={styles.searchIcon} />
      <TextInput
        value={localValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={styles.input}
        testID={testID}
        accessibilityLabel={placeholder}
      />
      {localValue.length > 0 && (
        <IconButton
          icon="close"
          onPress={handleClear}
          accessibilityLabel="Clear search"
        />
      )}
    </View>
  )
}
```

📐 **Pattern:** Controlled input with internal debounce

---

### TASK-4.2: Create Filter Chips Component

**Description:** Build a horizontal scrollable row of filter chips for quick filtering.

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/shared/components/ui/pressable/Button.tsx`
- `src/shared/components/ui/layout/Row.tsx`

**Location:** `src/shared/components/ui/form/FilterChips.tsx`

**Subtasks:**
- [ ] Create `src/shared/components/ui/form/FilterChips.tsx`
- [ ] Props interface:
```typescript
type FilterChip = {
  id: string
  label: string
  icon?: string              // Optional Material Icon name
}

type FilterChipsProps = {
  chips: FilterChip[]
  selectedIds: string[]
  onSelectionChange: (selectedIds: string[]) => void
  multiSelect?: boolean      // Default: true
  testID?: string
}
```
- [ ] Implement with:
  - Horizontal `ScrollView` for overflow
  - Chip components with selected/unselected states
  - Multi-select or single-select mode
- [ ] Style with theme tokens (primary color for selected)
- [ ] Add accessibility labels
- [ ] Add JSDoc documentation
- [ ] Export from `src/shared/components/ui/form/index.ts`
- [ ] Write unit tests

📐 **Pattern:** Chip-based selection with scrollable container

---

### TASK-4.3: Create Search Bar Composite Component

**Description:** Combine search input and filter chips into a reusable search bar.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- TASK-4.1 (SearchInput)
- TASK-4.2 (FilterChips)

**Location:** `src/shared/components/features/search-bar/SearchBar.tsx`

**Subtasks:**
- [ ] Create folder `src/shared/components/features/search-bar/`
- [ ] Create `SearchBar.tsx`:
```typescript
type SearchBarProps = {
  searchValue: string
  onSearchChange: (text: string) => void
  placeholder?: string
  debounceMs?: number

  // Optional filter chips
  filterChips?: FilterChip[]
  selectedFilters?: string[]
  onFilterChange?: (selectedIds: string[]) => void

  testID?: string
}
```
- [ ] Layout: SearchInput on top, FilterChips below (if provided)
- [ ] Add DOCS.md for the folder
- [ ] Export from `src/shared/components/features/index.ts`
- [ ] Add JSDoc documentation

📐 **Pattern:** Composite component with optional sections

🔗 **Dependency:** TASK-4.1, TASK-4.2

---

### TASK-4.4: Create useSearch Hook

**Description:** Create a reusable hook for search state management and filtering logic.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/shared/hooks/` (hook patterns)

**Location:** `src/shared/hooks/useSearch.ts`

**Subtasks:**
- [ ] Create `src/shared/hooks/useSearch.ts`
- [ ] Hook interface:
```typescript
type UseSearchOptions<T> = {
  data: T[]
  searchFields: (keyof T)[]         // Fields to search
  initialQuery?: string
  caseSensitive?: boolean           // Default: false
}

type UseSearchResult<T> = {
  query: string
  setQuery: (query: string) => void
  results: T[]
  isSearching: boolean              // True while query is non-empty
  clearSearch: () => void
}

function useSearch<T extends Record<string, unknown>>(
  options: UseSearchOptions<T>
): UseSearchResult<T>
```
- [ ] Implement filtering logic:
  - Case-insensitive by default
  - Match any of the specified fields
  - Partial string matching (contains)
- [ ] Memoize results with `useMemo`
- [ ] Handle empty query (return all data)
- [ ] Add JSDoc documentation
- [ ] Write comprehensive unit tests

📐 **Pattern:** Generic hook with options object

---

### TASK-4.5: Create useSearchWithFilters Hook

**Description:** Extended search hook that combines text search with filter chip selections.

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**
- TASK-4.4 (useSearch)

**Location:** `src/shared/hooks/useSearchWithFilters.ts`

**Subtasks:**
- [ ] Create `src/shared/hooks/useSearchWithFilters.ts`
- [ ] Hook interface:
```typescript
type FilterConfig<T> = {
  id: string
  label: string
  predicate: (item: T) => boolean   // Filter function
}

type UseSearchWithFiltersOptions<T> = {
  data: T[]
  searchFields: (keyof T)[]
  filters: FilterConfig<T>[]
  initialQuery?: string
  initialFilters?: string[]
}

type UseSearchWithFiltersResult<T> = {
  query: string
  setQuery: (query: string) => void
  selectedFilters: string[]
  setSelectedFilters: (ids: string[]) => void
  toggleFilter: (id: string) => void
  results: T[]
  isFiltering: boolean
  clearAll: () => void
}
```
- [ ] Implement combined filtering:
  - Apply text search first
  - Then apply selected filter predicates (AND logic)
- [ ] Memoize results
- [ ] Add JSDoc documentation
- [ ] Write unit tests

📐 **Pattern:** Composable hook building on useSearch

🔗 **Dependency:** TASK-4.4

---

### TASK-4.6: Integrate Search in History Module

**Description:** Use the shared search components in the History module.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- [02-history-module.md#TASK-2.4] (HistoryScreen)
- TASK-4.3 (SearchBar)
- TASK-4.4 (useSearch)

**Subtasks:**
- [ ] Import `SearchBar` component in `HistoryScreen.tsx`
- [ ] Use `useSearch` hook with history data:
```typescript
const { tours } = useTourHistoryStore()
const { query, setQuery, results } = useSearch({
  data: tours,
  searchFields: ['title', 'description', 'museumName'],
})
```
- [ ] Pass `results` to the FlatList instead of raw `tours`
- [ ] Add optional filter chips:
  - "This Week", "This Month", "Older"
  - Or museum-based filters
- [ ] Test search functionality

📐 **Pattern:** Consume shared component in module

⚠️ **SHARED:** This same pattern applies to Community module

🔗 **Dependency:** TASK-4.3, TASK-4.4, [02-history-module.md#TASK-2.4]

---

### TASK-4.7: Integrate Search in Community Module

**Description:** Use the shared search components in the Community Tours module.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- [03-community-tours-module.md#TASK-3.6] (CommunityScreen)
- TASK-4.3 (SearchBar)
- TASK-4.5 (useSearchWithFilters)

**Subtasks:**
- [ ] Import `SearchBar` component in `CommunityScreen.tsx`
- [ ] Use `useSearchWithFilters` hook:
```typescript
const filters: FilterConfig<CommunityTourSummary>[] = [
  { id: '3-stars', label: '3+ Stars', predicate: t => t.communityRating >= 3 },
  { id: '4-stars', label: '4+ Stars', predicate: t => t.communityRating >= 4 },
  { id: '5-stars', label: '5 Stars', predicate: t => t.communityRating === 5 },
  { id: 'official', label: 'Official', predicate: t => t.isOfficial },
]

const { query, setQuery, selectedFilters, setSelectedFilters, results } =
  useSearchWithFilters({
    data: tours,
    searchFields: ['title', 'description', 'museumName'],
    filters,
  })
```
- [ ] Pass `results` to the tour list
- [ ] Include filter chips in SearchBar
- [ ] For API-based filtering, pass filters to query params instead

📐 **Pattern:** Consume shared component with filters

🔗 **Dependency:** TASK-4.3, TASK-4.5, [03-community-tours-module.md#TASK-3.6]

---

## Testing Requirements

- Unit tests for SearchInput with debounce behavior
- Unit tests for FilterChips selection logic
- Unit tests for useSearch hook with various data types
- Unit tests for useSearchWithFilters with combined filtering
- Component tests for SearchBar composite
- Integration tests in both History and Community modules

## Related Stories

- → [02-history-module.md](./02-history-module.md) - Uses search functionality
- → [03-community-tours-module.md](./03-community-tours-module.md) - Uses search with filters
