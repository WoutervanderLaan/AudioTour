# User Story Task Breakdown: Audio Tour Feature

## User Story Summary
Create a complete audio tour flow where users can:
1. Start a new tour from a landing screen
2. Capture photos of museum objects
3. Submit photos with optional metadata
4. Receive AI-generated audio narratives
5. View object details

## Current State Analysis

### Already Implemented ✅
- **State Management**: `tourStore`, `museumStore`, `userSessionStore`
- **Location Services**: `useUserLocation` hook with museum proximity detection
- **API Schema**: All endpoint types defined (`/process-artwork`, `/generate-narrative`, `/generate-audio`)
- **Museum Data**: `KNOWN_MUSEUMS` constant with coordinates
- **Components**: Form controls, AudioPlayer (stub), basic UI components
- **Old Screens**: Legacy Capture, ObjectDetail, Narrative screens in `src/modules/old/`

### Needs Implementation 🔨
- New tour module with proper architecture
- Complete user flow from landing to detail view
- Multi-photo support
- Real audio playback (expo-av integration)
- Feed-style interface
- Camera integration with proper permissions

---

## Task Breakdown

### **Phase 1: Module Structure & Foundation**

#### Task 1.1: Create Tour Module Structure
**Complexity**: Low | **Estimated time**: 15 min
- Create `src/modules/tour/` directory
- Add subdirectories: `api/`, `hooks/`, `screens/`, `components/`, `types/`
- Create `routes.types.ts` with route definitions
- Create `index.ts` for module configuration
- Create `DOCS.md` for module documentation
- Add `tour` to `src/modules/slugs.ts` enum

**Acceptance Criteria**:
- Module folder structure follows existing patterns (auth, profile)
- All required files created
- Module slug added to enum

---

#### Task 1.2: Define Tour Navigation Types
**Complexity**: Low | **Estimated time**: 15 min
- Define route names enum in `routes.types.ts`
- Define stack params types for all tour screens
- Define modal params types
- Create route type exports

**Routes needed**:
- `TourHome` - Landing screen
- `TourFeed` - Main tour feed
- `TourCamera` - Camera capture screen
- `TourPhotoSubmit` (modal) - Photo submission form
- `TourObjectDetail` - Object detail view

**Acceptance Criteria**:
- All route types defined with TypeScript
- Params properly typed for navigation safety

---

### **Phase 2: Landing/Home Screen**

#### Task 2.1: Create Tour Home Screen
**Complexity**: Low | **Estimated time**: 30 min
- Create `src/modules/tour/screens/TourHomeScreen.tsx`
- Add app title display
- Add call-to-action text
- Add "Start new tour" button
- Implement navigation to tour initialization
- Style according to design system

**Acceptance Criteria**:
- Screen displays title and CTA
- Button navigates to tour feed on press
- Uses theme tokens for styling
- Follows component patterns (Screen.Default wrapper)

---

#### Task 2.2: Implement Tour Initialization Logic
**Complexity**: Medium | **Estimated time**: 45 min
- Create `src/modules/tour/hooks/useTourInitialization.ts`
- Trigger location permission request
- Get user's current location
- Calculate distances to known museums
- Find nearest museum (if any)
- Set current museum in store
- Initialize new tour session

**Acceptance Criteria**:
- Location permissions requested on initialization
- Nearest museum detected (within reasonable radius)
- Museum set in museumStore
- New session ID generated
- Error handling for permission denial

---

### **Phase 3: Feed Screen Interface**

#### Task 3.1: Create Basic Feed Screen
**Complexity**: Medium | **Estimated time**: 45 min
- Create `src/modules/tour/screens/TourFeedScreen.tsx`
- Add FlatList or ScrollView for feed items
- Add empty state (no items yet)
- Add camera button at bottom (instead of text input)
- Implement navigation to camera screen
- Style feed container

**Acceptance Criteria**:
- Feed displays empty state initially
- Camera button prominently displayed
- Button navigates to camera screen
- Uses theme styling

---

#### Task 3.2: Create Feed Item Component
**Complexity**: Medium | **Estimated time**: 1 hour
- Create `src/modules/tour/components/FeedItem.tsx`
- Display photo thumbnail(s)
- Show loading indicator during audio generation
- Display audio player when ready
- Add pressable area to navigate to detail
- Handle multiple photos in single item

**Acceptance Criteria**:
- Component displays photos in feed
- Shows loading state appropriately
- Navigates to detail on press
- Supports multiple photos

---

#### Task 3.3: Implement Feed State Management
**Complexity**: Medium | **Estimated time**: 30 min
- Enhance `src/store/slices/tourStore.ts`
- Add feed items array to state
- Add actions: `addFeedItem`, `updateFeedItem`, `setFeedLoading`
- Define FeedItem type with photos, metadata, audio, status

**Acceptance Criteria**:
- Feed items stored in tour store
- Actions work correctly
- Type-safe with TypeScript

---

### **Phase 4: Camera Functionality**

#### Task 4.1: Create Camera Screen
**Complexity**: Medium | **Estimated time**: 1 hour
- Create `src/modules/tour/screens/TourCameraScreen.tsx`
- Request camera permissions on mount
- Integrate expo-image-picker camera launch
- Handle permission denial gracefully
- Capture photo and get URI
- Navigate to photo submission modal with photo URI
- Add cancel/back button

**Acceptance Criteria**:
- Camera permissions requested on mount
- Camera interface launches
- Photo captured and URI obtained
- Navigates to submission modal with photo data
- Permission errors handled with user feedback

---

### **Phase 5: Photo Submission Modal**

#### Task 5.1: Create Photo Submission Modal Screen
**Complexity**: High | **Estimated time**: 2 hours
- Create `src/modules/tour/screens/TourPhotoSubmitScreen.tsx`
- Display photo thumbnail with delete option
- Show "add more photos" box (empty bordered with plus icon)
- Allow adding up to N photos (e.g., 5)
- Create form with fields: title, artist, year, material, description
- Add submit and cancel buttons
- Implement Zod schema for validation
- Use react-hook-form for form handling

**Form Fields**:
```typescript
{
  photos: string[] // URIs
  title?: string
  artist?: string
  year?: string
  material?: string
  description?: string
}
```

**Acceptance Criteria**:
- Photos displayed as thumbnails
- Can delete individual photos
- Can add multiple photos (up to limit)
- Form fields optional but validated if filled
- Submit only enabled when at least one photo
- Cancel returns to camera or feed

---

#### Task 5.2: Implement Photo Management in Modal
**Complexity**: Medium | **Estimated time**: 45 min
- Add state for multiple photos in modal
- Implement add photo functionality (reopens camera/picker)
- Implement delete photo functionality
- Show photo count (e.g., "3/5 photos")
- Reorder photos (optional enhancement)

**Acceptance Criteria**:
- Multiple photos can be added
- Photos can be deleted individually
- Photo count displayed
- UI updates correctly

---

### **Phase 6: API Integration**

#### Task 6.1: Create Tour API Hooks
**Complexity**: Medium | **Estimated time**: 1 hour
- Create `src/modules/tour/api/useTourMutations.ts`
- Implement `useProcessArtwork` mutation (upload photos)
- Implement `useGenerateNarrative` mutation
- Implement `useGenerateAudio` mutation
- Chain mutations properly (artwork → narrative → audio)
- Handle loading and error states

**Acceptance Criteria**:
- All mutations implemented with TanStack Query
- Proper error handling
- Loading states exposed
- Type-safe with API schema types

---

#### Task 6.2: Integrate Photo Submission API
**Complexity**: Medium | **Estimated time**: 1 hour
- On modal submit, convert photos to FormData
- Call process-artwork endpoint with photos + metadata
- Store object ID from response
- Trigger narrative generation
- Trigger audio generation
- Add feed item with loading state
- Navigate back to feed

**Acceptance Criteria**:
- Photos uploaded successfully
- Metadata included in request
- Object ID returned and stored
- Feed updated with new item
- Loading state shown in feed
- Navigation works correctly

---

#### Task 6.3: Handle API Responses and Update Feed
**Complexity**: Medium | **Estimated time**: 45 min
- Update feed item when narrative returns
- Update feed item when audio returns
- Handle API errors (show error in feed item)
- Retry mechanism for failed requests
- Update feed item status

**Acceptance Criteria**:
- Feed item updates as API responses arrive
- Errors displayed appropriately
- Retry works for failures
- Feed item status reflects current state

---

### **Phase 7: Audio Playback**

#### Task 7.1: Implement Real Audio Player
**Complexity**: Medium | **Estimated time**: 1.5 hours
- Install `expo-av` dependency
- Enhance `src/shared/components/features/audio-player/AudioPlayer.tsx`
- Load audio from URL
- Implement play/pause
- Show playback progress
- Add seek functionality
- Handle audio errors
- Cleanup on unmount

**Acceptance Criteria**:
- Audio loads from URL
- Play/pause works correctly
- Progress bar shows playback position
- Can seek to position
- Audio cleaned up on unmount
- Errors handled gracefully

---

#### Task 7.2: Integrate Audio Player in Feed
**Complexity**: Low | **Estimated time**: 30 min
- Add AudioPlayer component to FeedItem
- Show only when audio URL available
- Handle audio loading state
- Auto-play option (optional)

**Acceptance Criteria**:
- Audio player appears when audio ready
- Player works within feed item
- Multiple players managed correctly (pause others)

---

#### Task 7.3: Implement Feed Disabling During Generation
**Complexity**: Low | **Estimated time**: 20 min
- Add loading state to feed
- Disable camera button while processing
- Show global loading indicator
- Prevent new submissions during processing

**Acceptance Criteria**:
- Camera button disabled during processing
- Visual feedback for disabled state
- Loading indicator visible
- Re-enables after completion/error

---

### **Phase 8: Object Detail Screen**

#### Task 8.1: Create Object Detail Screen
**Complexity**: Medium | **Estimated time**: 1 hour
- Create `src/modules/tour/screens/TourObjectDetailScreen.tsx`
- Display photo gallery (swipeable for multiple photos)
- Show all metadata fields
- Display narrative text
- Add audio player
- Show recognition confidence (if available)
- Add back navigation

**Acceptance Criteria**:
- All photos displayed (swipeable if multiple)
- Metadata shown in structured format
- Narrative text displayed
- Audio player works
- Back button returns to feed

---

#### Task 8.2: Implement Navigation from Feed to Detail
**Complexity**: Low | **Estimated time**: 15 min
- Make feed item pressable
- Navigate to detail screen with object data
- Pass necessary params (object ID or full data)
- Handle back navigation

**Acceptance Criteria**:
- Tapping feed item navigates to detail
- Detail screen receives correct data
- Back navigation works

---

### **Phase 9: Module Registration & Navigation**

#### Task 9.1: Create Module Screen Configuration
**Complexity**: Low | **Estimated time**: 30 min
- Create `src/modules/tour/screenConfig.ts`
- Register all tour screens (stacks and modals)
- Configure navigation options (headers, etc.)
- Export screen configurations

**Acceptance Criteria**:
- All screens registered
- Navigation options configured
- Follows existing pattern (auth module)

---

#### Task 9.2: Register Tour Module with App
**Complexity**: Low | **Estimated time**: 20 min
- Complete `src/modules/tour/index.ts` module config
- Add module to app registry
- Set up module lifecycle hooks (onRegister, onAppStart)
- Define module dependencies

**Acceptance Criteria**:
- Module registered with app
- Lifecycle hooks implemented
- Module loads on app start
- Navigation working

---

#### Task 9.3: Update App Navigation Structure
**Complexity**: Low | **Estimated time**: 30 min
- Add tour home to tab navigator (or main stack)
- Set as initial route (if desired)
- Update deep linking configuration
- Test navigation flows

**Acceptance Criteria**:
- Tour home accessible from main navigation
- Deep links work
- All navigation flows tested

---

### **Phase 10: State Management Enhancement**

#### Task 10.1: Enhance Tour Store for Multi-Photo Support
**Complexity**: Low | **Estimated time**: 30 min
- Update tour store types to support arrays of photos
- Update actions to handle multiple photos
- Add current tour session state
- Add tour history (optional)

**Acceptance Criteria**:
- Store handles multiple photos per object
- Tour session tracked
- Type-safe

---

#### Task 10.2: Implement Tour Session Persistence (Optional)
**Complexity**: Medium | **Estimated time**: 1 hour
- Add zustand persist middleware
- Save tour history to async storage
- Restore tour on app restart
- Clear old tours

**Acceptance Criteria**:
- Tours persist across app restarts
- Old tours cleared appropriately
- Performance acceptable

---

### **Phase 11: Polish & Error Handling**

#### Task 11.1: Add Error Handling Throughout Flow
**Complexity**: Medium | **Estimated time**: 1 hour
- Add error boundaries
- Handle API errors with user-friendly messages
- Handle permission denials
- Handle network errors
- Add retry mechanisms
- Show error states in UI

**Acceptance Criteria**:
- All error cases handled
- User sees helpful error messages
- Can recover from errors
- App doesn't crash

---

#### Task 11.2: Add Loading States and User Feedback
**Complexity**: Low | **Estimated time**: 45 min
- Add loading indicators throughout
- Add success messages (toast/alert)
- Add confirmation dialogs where needed
- Improve button states (loading, disabled)

**Acceptance Criteria**:
- Loading states clear to user
- Success feedback provided
- Destructive actions confirmed
- Buttons show correct states

---

#### Task 11.3: Test Complete User Flow
**Complexity**: Medium | **Estimated time**: 1.5 hours
- Test entire flow end-to-end
- Test edge cases (no permissions, no network, etc.)
- Test with multiple photos
- Test error recovery
- Test navigation flows
- Test on iOS and Android

**Acceptance Criteria**:
- Complete flow works end-to-end
- Edge cases handled
- Works on both platforms
- No critical bugs

---

### **Phase 12: Cleanup & Migration**

#### Task 12.1: Remove Deprecated Code from Old Module
**Complexity**: Medium | **Estimated time**: 1 hour
- Identify screens in `src/modules/old/` that are now replaced by tour module
- Remove or deprecate `Capture.tsx` (replaced by TourCamera + TourPhotoSubmit)
- Remove or deprecate `ObjectDetail.tsx` (replaced by TourObjectDetail)
- Remove or deprecate `Narrative.tsx` (replaced by TourFeed + FeedItem)
- Update old module's screenConfig to remove deprecated screens
- Update old module's route types

**Acceptance Criteria**:
- Deprecated screens removed or marked as deprecated
- No broken imports or references
- Old module still functional for any remaining screens
- No duplicate functionality

---

#### Task 12.2: Move Tour-Specific Global Code to Tour Module
**Complexity**: Medium | **Estimated time**: 1 hour
- Move tour-specific logic from global stores to tour module
- Review `src/store/slices/tourStore.ts` - keep or move to module
- Review `src/store/slices/museumStore.ts` - keep or move to module
- Move any tour-specific utilities to tour module
- Update imports throughout codebase
- Ensure proper module boundaries maintained

**Files to Review**:
- `src/store/slices/tourStore.ts` (might stay global or move)
- `src/store/slices/museumStore.ts` (might stay global or move)
- `src/shared/schema.ts` (objectSchema might belong in tour module)

**Acceptance Criteria**:
- Tour-specific code lives in tour module where appropriate
- Global code is truly app-wide and not tour-specific
- Module boundaries respected (ESLint passing)
- All imports updated correctly

---

#### Task 12.3: Clean Up Unused Dependencies and Imports
**Complexity**: Low | **Estimated time**: 30 min
- Remove any unused imports from refactored files
- Run linter and fix any issues
- Run typecheck and ensure no errors
- Remove any dead code
- Update any outdated comments or documentation

**Acceptance Criteria**:
- Linter passes with no errors
- TypeScript compilation successful
- No unused imports
- No dead code
- Documentation up to date

---

## Task Summary

**Total Tasks**: 36 individual tasks
**Estimated Total Time**: ~24.5-27.5 hours

### Tasks by Phase:
1. **Module Structure**: 2 tasks (~30 min)
2. **Landing Screen**: 2 tasks (~1.25 hours)
3. **Feed Screen**: 3 tasks (~2.25 hours)
4. **Camera**: 1 task (~1 hour)
5. **Photo Submission**: 2 tasks (~2.75 hours)
6. **API Integration**: 3 tasks (~2.75 hours)
7. **Audio Playback**: 3 tasks (~2.25 hours)
8. **Object Detail**: 2 tasks (~1.25 hours)
9. **Module Registration**: 3 tasks (~1.25 hours)
10. **State Enhancement**: 2 tasks (~1.5 hours)
11. **Polish & Testing**: 3 tasks (~3.25 hours)
12. **Cleanup & Migration**: 3 tasks (~2.5 hours)

### Priority Order:
1. Phase 1 (Foundation) - **Must do first**
2. Phase 2 (Landing) - **Core flow**
3. Phase 3 (Feed) - **Core flow**
4. Phase 4 (Camera) - **Core flow**
5. Phase 5 (Submission) - **Core flow**
6. Phase 6 (API) - **Core flow**
7. Phase 9 (Navigation) - **Integration**
8. Phase 8 (Detail) - **Core flow**
9. Phase 7 (Audio) - **Enhancement**
10. Phase 10 (State) - **Enhancement**
11. Phase 11 (Polish) - **Final**
12. Phase 12 (Cleanup) - **Final cleanup**

---

## Dependencies

- **expo-av**: For audio playback (install with `npx expo install expo-av`)
- **expo-camera** (optional): If preferring expo-camera over expo-image-picker
- All other dependencies already installed

---

## Notes

- Some tasks can be done in parallel (e.g., feed components while working on camera)
- Consider creating reusable components for common patterns
- Follow existing ESLint rules strictly (max 300 lines/file, function docs, etc.)
- Use TypeScript strictly (no `any` types)
- All API calls should use TanStack Query
- State management should use Zustand
- Follow the module architecture boundaries

---

## Migration from Old Module

Several screens in `src/modules/old/` have similar functionality:
- `Capture.tsx` - Photo upload logic (can be referenced)
- `ObjectDetail.tsx` - Detail view pattern (can be referenced)
- `Narrative.tsx` - Audio narrative pattern (can be referenced)

These should be **referenced** for patterns but **not directly migrated**. The new tour module should be built fresh following the new architecture.
