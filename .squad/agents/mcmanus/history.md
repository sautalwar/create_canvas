# McManus — History

## Core Context
- **Project:** Brandsafway Inventory API — Node.js/TypeScript/Express
- **User:** Saurabh
- **CI:** GitHub Actions (Node 18.x + 20.x matrix) + Azure Pipelines
- **ADO Sync:** GitHub Action using ADO REST API, triggered on issue events with `sync-ado` label
- **Pipeline:** Build → Test → Deploy stages, PR validation + main branch deployment

## Learnings
- ADO sync workflow uses `actions/github-script@v7` with ADO PAT from GitHub Secrets
- Azure Pipelines has JUnit test result publishing
- Three integration approaches demoed: Azure Boards App, GH Actions API, AB# syntax
