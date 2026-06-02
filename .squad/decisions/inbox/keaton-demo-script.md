# Keaton Decision Inbox — Demo Script

## Decision
For the Brandsafway 45-minute demo, use the missing `/api/health` endpoint as the end-to-end story and structure the narrative around a governed workflow:
1. Open with `demo-workflow.html` to frame the 10-step journey.
2. Keep Azure DevOps as the planning system of record.
3. Use the Azure Boards GitHub App as the recommended primary ADO ↔ GitHub integration pattern.
4. Use `AB#` syntax in the GitHub issue, commits, and PR description as the visible traceability mechanism during the live demo.
5. Position GitHub Copilot Coding Agent as the autonomous implementer, with the development lead and Azure Pipelines as the final quality gates.

## Why
This gives Brandsafway a clear modernization story without implying they must abandon ADO. It also keeps the demo concrete, fast, and auditable: backlog item → issue → branch → code + tests → PR → approval → pipeline → merge/deploy.
