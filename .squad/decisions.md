# Decisions

_Team decisions are recorded here. Append-only._

---

## Demo Script Narrative Structure (2026-06-02T02:34:00Z)

**Decision**: For the Brandsafway 45-minute demo, use the missing `/api/health` endpoint as the end-to-end story and structure the narrative around a governed workflow:

1. Open with `demo-workflow.html` to frame the 10-step journey
2. Keep Azure DevOps as the planning system of record
3. Use the Azure Boards GitHub App as the recommended primary ADO ↔ GitHub integration pattern
4. Use `AB#` syntax in GitHub issue, commits, and PR description as visible traceability during live demo
5. Position GitHub Copilot Coding Agent as autonomous implementer, with development lead and Azure Pipelines as quality gates

**Rationale**: Gives Brandsafway clear modernization story without implying they must abandon Azure DevOps. Keeps demo concrete, fast, and auditable: backlog item → issue → branch → code + tests → PR → approval → pipeline → merge/deploy.

---
