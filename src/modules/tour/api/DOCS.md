# src/modules/tour/api

This folder contains TanStack Query mutation hooks for tour-related API operations.

## Files

### mutations.ts

Exports three mutation hooks for the tour workflow:

#### useProcessArtwork

Mutation hook for uploading photos and processing artwork recognition. Converts photo URIs to FormData and sends to `/process-artwork` endpoint.

**Parameters**:

- `photos`: Array of photo URIs to upload
- `metadata`: Optional metadata about the object (title, artist, year, material, description)

**Returns**: `ProcessArtworkResponse` containing:

- `object_id`: Recognized object identifier
- `recognition_confidence`: Confidence score of recognition

**Usage**:

```typescript
const processArtwork = useProcessArtwork()
processArtwork.mutate({photos, metadata})
```

#### useGenerateNarrative

Mutation hook for generating narrative text for a recognized object. Calls `/generate-narrative` endpoint with object ID.

**Parameters**:

- `objectId`: Object ID from recognition
- `context`: Optional context or user preferences

**Returns**: `GenerateNarrativeResponse` containing:

- `text`: Generated narrative text

**Usage**:

```typescript
const generateNarrative = useGenerateNarrative()
generateNarrative.mutate({objectId})
```

#### useGenerateAudio

Mutation hook for generating audio from narrative text. Calls `/generate-audio` endpoint with text content.

**Parameters**:

- `text`: Narrative text to convert to audio
- `voice`: Optional voice/style preferences

**Returns**: `GenerateAudioResponse` containing:

- `audio_url`: URL to the generated audio file

**Usage**:

```typescript
const generateAudio = useGenerateAudio()
generateAudio.mutate({text})
```

## Integration

These hooks are orchestrated by `usePhotoSubmit` in the hooks folder to create the complete tour generation pipeline.
