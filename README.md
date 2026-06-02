# Brandsafway Inventory API

A Node.js/TypeScript REST API for inventory management — built to demonstrate the end-to-end GitHub + Azure DevOps developer workflow.

## Quick Start

```bash
npm install
npm run build
npm start        # http://localhost:3000
npm test         # Run tests
npm run dev      # Development mode with ts-node
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | List all inventory items |
| GET | `/api/items/:id` | Get a single item |
| POST | `/api/items` | Create a new item |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

## Tech Stack

- **Runtime:** Node.js 20.x
- **Language:** TypeScript 5.x
- **Framework:** Express 4.x
- **Testing:** Jest + Supertest
- **CI:** GitHub Actions + Azure Pipelines

## Azure DevOps Integration

### Azure Boards GitHub App
1. Install the [Azure Boards GitHub App](https://github.com/marketplace/azure-boards) on this repo
2. Connect to your ADO project
3. Use `AB#<work-item-id>` in commit messages and PR descriptions to link

### GitHub Actions → ADO Sync
The `.github/workflows/ado-sync.yml` workflow automatically creates ADO work items when GitHub issues with the `sync-ado` label are created.

### Azure Pipelines
The `azure-pipelines.yml` validates PRs (build + test) and deploys on merge to `main`.

## Branch Protection (Recommended)

Configure these branch protection rules on `main`:
- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass (CI, Azure Pipelines)
- ✅ Require branches to be up to date
- ✅ Require linear history

## GitHub Copilot Agent

This repo is configured for the [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-the-copilot-coding-agent). Assign issues to `@copilot` and it will:
1. Create a branch
2. Implement the change following `.github/copilot-instructions.md`
3. Write tests matching existing patterns
4. Open a draft PR with `AB#` references

## Demo Workflow

```
ADO Work Item Created → GitHub Issue Linked (AB#) → @copilot Assigned
→ Branch Created → Code + Tests Written → PR Opened
→ Lead Reviews → ADO Pipeline Validates → Merge & Deploy
```
