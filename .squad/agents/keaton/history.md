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
- Created `demo-script.md`, a 45-minute Brandsafway walkthrough covering pre-demo setup, timing, step-by-step talk track, value propositions, fallback paths, hard questions, and follow-up actions.
- Key demo-flow decision: lead with `demo-workflow.html`, use the missing `/api/health` endpoint as the business request, position Azure Boards App as the primary ADO↔GitHub path, and use `AB#` syntax as the visible traceability artifact throughout the demo.
