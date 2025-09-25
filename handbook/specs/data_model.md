# Data Model

## Object Table
- id
- name
- artist
- date
- museum_id
- image_url
- generated_text
- generated_audio
- metadata

## User Sequence Table
- id
- user_session_id
- object_ids
- created_at

## Museum Table
- id
- name
- location
- is_licensed
- license_tier

## Request Log
- id
- user_session_id
- object_id
- timestamp
- success/fail
