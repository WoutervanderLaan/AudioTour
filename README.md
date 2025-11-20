# Dynamic Audio Tour App

## Overview

This repository hosts an AI-powered app that generates **dynamic audio tours** based on museum objects photographed by users. The app combines object recognition, contextual narrative generation, and personalized story sequences to offer engaging and interactive tours.

## Features

- **AI-Powered Object Recognition**
- **Personalized Narratives** for each object
- **Customizable Story Sequences**
- Integration with museum licensing for enhanced or limited user experiences

## Documentation

Comprehensive documentation for the project can be found in the repository. Refer to these key sections:

- [Project Overview](./handbook/specs/project_overview.md)
- [Product Specification](./handbook/specs/product_spec.md)
- [Business Plan](./handbook/specs/business_plan.md)
- [Data Model](./handbook/specs/data_model.md)
- [API Specification](./handbook/specs/api_spec.md)
- [Roadmap](./handbook/specs/roadmap.md)
- [Research Notes](./handbook/specs/research_notes.md)

## Getting Started

Instructions for setting up local development environments and project details are available in their respective directories:

- **Backend (FastAPI)**: [See `backend/README.md`](./backend/README.md)
- **Frontend (Expo)**: [See `frontend/README.md`](./frontend/README.md)

## Planned Tech Stack

- **Frontend**: React Native / Expo
- **Backend**: FastAPI (Python) or Node.js
- **Database**: PostgreSQL + Vector Store (Chroma/Weaviate)
- **AI**: Vision (CLIP/BLIP/YOLO), LLM, TTS
- **Infrastructure**: Cloud-hosted on AWS/GCP/Azure
- **Location Services**: Geofencing via Expo Location

---

For additional resources and support, consult the documentation and handbook provided in this repository.