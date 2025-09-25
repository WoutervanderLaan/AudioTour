# Dynamic Audio Tour App

## Overview

This project is an AI-powered app that generates **dynamic audio tours** based on museum objects photographed by users.  
The system recognizes objects, generates contextual narratives, and creates personalized story sequences.

A **business model** is integrated via museum licensing:

- **Licensed Museums** → unlimited/enhanced requests for visitors
- **Unlicensed Museums** → limited requests (teaser experience)

---

## 📂 Documentation

- [`/specs/project_overview.md`](./specs/project_overview.md)
- [`/specs/product_spec.md`](./specs/product_spec.md)
- [`/specs/business_plan.md`](./specs/business_plan.md)
- [`/specs/data_model.md`](./specs/data_model.md)
- [`/specs/api_spec.md`](./specs/api_spec.md)
- [`/specs/roadmap.md`](./specs/roadmap.md)
- [`/specs/research_notes.md`](./specs/research_notes.md)

---

## 🔌 Local Development

- Backend (FastAPI): `backend/` → see `backend/README.md`
- Frontend (Expo): `frontend/` → see `frontend/README.md`

---

## 🔧 Tech Stack (Planned)

- **Frontend**: React Native / Expo
- **Backend**: FastAPI (Python) or Node.js
- **Database**: PostgreSQL + Vector Store (Chroma/Weaviate)
- **AI**: Vision (CLIP/BLIP/YOLO), LLM, TTS
- **Infra**: Cloud-hosted (AWS/GCP/Azure)
- **Location**: Geofencing via Expo Location

---

## 📈 Business Model (Summary)

- **Museum Licensing Fee**: €25k–40k/year depending on size
- **Unlicensed Museums**: limited requests
- **Licensed Museums**: unlimited/enhanced requests
