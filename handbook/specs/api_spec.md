# API Specification (Draft)

## Endpoints

### POST /upload-photo
- Input: photo, metadata
- Output: object ID, recognition confidence

### POST /generate-narrative
- Input: object_id, user_session_id
- Output: text narrative

### POST /generate-audio
- Input: text narrative
- Output: audio file

### GET /museum-objects/:museum_id
- Output: list of objects

### GET /recommendations
- Input: user_session_id, current_museum_id
- Output: suggested objects
