# Keaton — History

## Core Context
- **Project:** Brandsafway Inventory API — Node.js/TypeScript/Express
- **User:** Saurabh
- **Purpose:** 45-minute demo for Brandsafway showing ADO ↔ GitHub ↔ Copilot Agent workflow
- **Demo flow:** ADO work item → GitHub issue (AB#) → @copilot assigned → branch → code+tests → PR → lead review → ADO pipeline → merge+deploy

## Learnings
- Project initialized with Express API, CRUD endpoints for inventory items
- Intentional gap: no health check endpoint — this is what the ADO work item will request during demo
- Three integration approaches in demo: Azure Boards GitHub App, GitHub Actions + ADO REST API, AB# syntax
- Tests use Jest + Supertest with `createTestApp()` pattern
