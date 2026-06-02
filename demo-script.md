# Brandsafway Demo Script — ADO → GitHub → Copilot Agent Workflow

## Demo Objective
Show Brandsafway how a backlog request in Azure DevOps becomes a governed code change in GitHub, is implemented by GitHub Copilot Coding Agent, validated by existing quality gates, and merged with full traceability.

## Audience + Storyline
- **Audience:** Delivery leaders, engineering managers, architects, platform owners, and development leads
- **Story:** A simple but realistic production-readiness gap exists in the Brandsafway inventory API: there is no `/api/health` endpoint. We will show how that request flows from ADO to GitHub to Copilot to PR to validation to deployment.
- **Primary message:** AI accelerates delivery, but human review and enterprise controls stay in place.

## Pre-Demo Setup Checklist

### Environment readiness
- Confirm access to the correct **Azure DevOps project**, **GitHub repository**, and **Copilot Coding Agent** experience.
- Confirm the repo default branch is `main` and branch protections are enabled for PR review + status checks.
- Confirm GitHub Copilot Coding Agent is available for issue assignment.
- Confirm Azure Pipelines is connected to the repository and can run PR validation.
- Confirm the sample app context is understood:
  - Express + TypeScript inventory API
  - Existing routes under `/api/items`
  - Intentional gap: no `/api/health` endpoint yet
- Have a pre-created backlog item template ready in case live ADO creation is slow.
- Have a pre-created GitHub issue draft ready in case issue creation or linking is slow.

### Browser tabs to open before the meeting
1. `demo-workflow.html` overview page
2. Azure DevOps backlog / Boards view
3. Azure DevOps work item details page
4. GitHub repo main page
5. GitHub Issues tab
6. GitHub Pull Requests tab
7. Copilot agent issue view / assignment UI
8. PR checks page
9. Azure Pipelines run results
10. Optional deployed app or staging validation page

### Local / repo assets to have ready
- `README.md` for architecture and workflow references
- `src/routes/index.ts` showing the intentional missing health route
- `src/routes/items.ts` showing the existing route pattern Copilot should follow
- `tests/items.test.ts` showing the expected Jest + Supertest test style
- `.github/copilot-instructions.md` showing team conventions
- `.github/workflows/ci.yml` and `azure-pipelines.yml` showing validation gates

### Presenter readiness
- Sign in to both ADO and GitHub before starting.
- Increase browser zoom for readability.
- Disable notifications, popups, and unrelated tabs.
- Prepare work item wording:
  - **Title:** Add health check endpoint to the API
  - **Acceptance criteria:** `GET /api/health` returns HTTP 200 with `ApiResponse`, includes service status and timestamp, and has automated tests.
- Prepare a fallback narrative for every live click path.

## 45-Minute Timing Breakdown

| Segment | Time | Notes |
|---|---:|---|
| Opening, objectives, workflow overview | 3 min | Use `demo-workflow.html` to orient the audience |
| Step 1: ADO work item created | 4 min | Define the business request |
| Step 2: GitHub issue linked to ADO | 4 min | Show traceability options |
| Step 3: Assign Copilot agent | 3 min | Show autonomous start |
| Step 4: Agent creates branch | 2 min | Keep this quick |
| Step 5: Agent develops enhancement | 6 min | Biggest value moment |
| Step 6: Agent commits code + tests | 4 min | Emphasize test generation |
| Step 7: Agent raises PR | 4 min | Show AB# linkage |
| Step 8: Lead review / approve | 4 min | Human governance moment |
| Step 9: ADO pipeline validates | 4 min | Existing controls remain |
| Step 10: Merge + deployment | 3 min | Close the loop |
| Buffer + Q&A | 4 min | Use for delays or deeper questions |

**Pacing note:** If the live agent takes longer than expected, compress Steps 4-7 into a narrated walkthrough using pre-opened tabs and spend more time on review, governance, and Q&A.

## Demo Flow Overview
Start with `demo-workflow.html` and say that the audience is about to see a full delivery loop: request, implementation, review, validation, and deployment. Position the workflow as a modernization layer on top of Brandsafway's existing ADO and GitHub practices, not a rip-and-replace.

---

## Step 1 — ADO work item / backlog item created
**Target time:** 4 minutes

**[DO]** Create or open a Product Backlog Item in Azure DevOps.

**[CLICK]** Boards → Backlogs → New Work Item → Product Backlog Item.

**[SHOW]**
- Title: **Add health check endpoint to the API**
- Description tying the request to production readiness and supportability
- Acceptance criteria for `GET /api/health`
- Priority / sprint placement

**[SAY]**
"We start where Brandsafway already plans work: Azure DevOps. The request is intentionally small but real — production teams need a health endpoint for monitoring, load balancers, and operational readiness. That makes this a good example of how AI handles routine engineering work inside your existing process."

**[EXPECT]**
A clearly scoped work item exists with enough detail for GitHub and Copilot to act on.

**Value proposition for Brandsafway**
- Preserves ADO as the planning system of record
- Converts a business request into an engineer-ready artifact quickly
- Creates clear acceptance criteria before AI starts coding

**Fallback plan**
- Open a pre-created work item and say: "To keep time tight, I prepared the same backlog item in advance."
- If ADO is slow, show the work item details page screenshot or saved tab and continue.

---

## Step 2 — GitHub issue linked to ADO
**Target time:** 4 minutes

**[DO]** Create or open the matching GitHub issue and link it back to the ADO work item.

**[CLICK]** GitHub → Issues → New issue.

**[SHOW]**
- Issue title matching the ADO backlog item
- Body referencing the requested `/api/health` endpoint
- The ADO work item ID using **`AB#<id>`** syntax
- Explain the three integration options:
  1. **Azure Boards GitHub App** (primary demo path)
  2. **GitHub Actions → ADO API sync**
  3. **AB# syntax in commits/PRs**

**[SAY]**
"There are three ways to connect ADO and GitHub. For a live enterprise workflow, I recommend the Azure Boards GitHub App as the cleanest default. The visible artifact in this demo is `AB#` syntax, because it gives us lightweight, bidirectional traceability in commits and PRs without changing how developers work."

**[EXPECT]**
The issue is visibly associated with the ADO item, or the audience understands exactly how the link is established.

**Value proposition for Brandsafway**
- End-to-end traceability from backlog to code
- Minimal process change for developers already using GitHub
- Flexible integration path based on governance preferences

**Fallback plan**
- Use a pre-created issue already linked to the work item.
- If the Azure Boards link is not live, narrate the linkage using the `AB#` reference and show the configured workflow files.

---

## Step 3 — Copilot agent assigned issue
**Target time:** 3 minutes

**[DO]** Assign the GitHub issue to **GitHub Copilot Coding Agent**.

**[CLICK]** Issue → Assignees → `@copilot` (or the Copilot agent UI).

**[SHOW]**
- The issue assignee becoming Copilot
- Repo context files that guide the agent:
  - `.github/copilot-instructions.md`
  - existing route and test patterns

**[SAY]**
"This is the handoff point. Instead of a human developer pulling the ticket, Copilot becomes the first implementer. It reads the repo, follows the local conventions, and works within the boundaries we define."

**[EXPECT]**
The issue is assigned and the agent begins processing.

**Value proposition for Brandsafway**
- Reduces wait time between backlog grooming and implementation
- Standardizes how routine enhancements get started
- Lets engineers focus on exceptions, architecture, and review

**Fallback plan**
- If the assignment UI is unavailable, show a pre-assigned issue.
- If agent startup lags, narrate the expected next actions and move to a prepared branch/PR state.

---

## Step 4 — Agent creates branch
**Target time:** 2 minutes

**[DO]** Show that Copilot creates a working branch from the issue.

**[CLICK]** Issue development panel / branches view / PR preview.

**[SHOW]**
- Newly created Copilot branch
- Naming convention such as `copilot/fix-...` or issue-based branch
- Separation from `main`

**[SAY]**
"The agent does not work on main. It follows the same branch-based workflow as a human developer. That means isolation, auditability, and clean review boundaries remain intact."

**[EXPECT]**
A new branch appears and becomes the workspace for the change.

**Value proposition for Brandsafway**
- Keeps AI work inside normal GitHub controls
- Supports branch protection and PR review requirements
- Makes rollback and audit straightforward

**Fallback plan**
- Use a pre-created Copilot branch tab.
- If branch creation is not yet visible, explain that branch creation is automatic once the issue is picked up and continue to the code diff.

---

## Step 5 — Agent develops enhancement
**Target time:** 6 minutes

**[DO]** Walk through the code the agent produced for the health endpoint.

**[CLICK]** Open changed files in the branch or PR diff.

**[SHOW]**
- `src/routes/index.ts` currently lacks `/health`
- Existing pattern in `src/routes/items.ts`
- New route file or updated route registration following project conventions
- Response shape using `ApiResponse<T>`
- Endpoint under `/api/health`

**[SAY]**
"This is where autonomy matters. Copilot is not generating random code from scratch; it is reading the local architecture and extending it consistently. In this repo, that means Express route modules, `/api/` conventions, strict TypeScript, and the shared `ApiResponse` wrapper."

**[EXPECT]**
The audience sees that the agent followed the repository's structure instead of inventing a new pattern.

**Value proposition for Brandsafway**
- Accelerates common enhancements without bypassing standards
- Preserves consistency across APIs and services
- Shortens lead time for low-risk production-readiness work

**Fallback plan**
- Use pre-opened source files with the expected diff.
- If code is still generating, show the target files and explain exactly what Copilot is expected to add.

---

## Step 6 — Agent commits code + tests
**Target time:** 4 minutes

**[DO]** Show the commit(s) and the generated automated tests.

**[CLICK]** Commits tab / files changed / test file.

**[SHOW]**
- New or updated test file such as `tests/health.test.ts`
- Test style matching `tests/items.test.ts`
- Success and error-path coverage where relevant
- Commit message referencing the work item with `AB#<id>`

**[SAY]**
"The important point is not just that AI wrote code — it also wrote tests in the house style. For Brandsafway, that means adoption can start with low-risk changes while still reinforcing test discipline and traceability back to the originating work item."

**[EXPECT]**
Commits show both implementation and test coverage, with visible ADO linkage.

**Value proposition for Brandsafway**
- Promotes test-backed changes, not just code generation
- Creates a stronger audit trail from work item to commit
- Helps teams scale routine engineering work without lowering quality

**Fallback plan**
- Show a prepared commit history or local diff screenshot.
- If tests are not yet visible, explain that test creation is required by repo instructions and show `tests/items.test.ts` as the pattern Copilot follows.

---

## Step 7 — Agent raises PR
**Target time:** 4 minutes

**[DO]** Open the Copilot-created pull request.

**[CLICK]** Pull Requests → open draft PR.

**[SHOW]**
- Draft PR created by Copilot
- PR summary of what changed and why
- `AB#<id>` in the PR description
- Changed files, checks, and review readiness

**[SAY]**
"Now the work becomes reviewable. Copilot has done the first-pass engineering, but nothing ships automatically. The pull request is the control point where humans, policy, and pipeline automation come together."

**[EXPECT]**
A PR exists with clear traceability and enough context for review.

**Value proposition for Brandsafway**
- Preserves the pull-request operating model teams already trust
- Improves documentation quality in PRs with consistent summaries
- Provides a clean handoff from AI implementation to human governance

**Fallback plan**
- Open a pre-created draft PR.
- If the PR has not appeared yet, narrate the expected PR contents using the branch diff and issue link.

---

## Step 8 — Development lead reviews / approves
**Target time:** 4 minutes

**[DO]** Review the PR as the development lead and approve it.

**[CLICK]** Files changed → add comments if desired → Review changes → Approve.

**[SHOW]**
- Review of route design, response structure, and test completeness
- Optional comment asking for a small refinement
- Approval once satisfied

**[SAY]**
"This is the key governance message: AI is not replacing engineering accountability. The lead still reviews the architecture, the edge cases, and the business fit. Copilot speeds up execution, but approval authority remains with the team."

**[EXPECT]**
The PR receives approval, or a comment path is shown for iterative refinement.

**Value proposition for Brandsafway**
- Keeps development leads in control
- Makes AI adoption compatible with existing approval workflows
- Reinforces that human expertise is applied where it matters most

**Fallback plan**
- Use a prepared approved PR state.
- If live review is slow, verbally summarize the exact checks you would perform: route placement, `ApiResponse` compliance, test coverage, and AB# traceability.

---

## Step 9 — ADO pipeline validates
**Target time:** 4 minutes

**[DO]** Show the PR checks running and the Azure Pipeline validating the change.

**[CLICK]** PR checks tab → Azure Pipelines run → logs/results.

**[SHOW]**
- GitHub Actions CI and/or Azure Pipelines status
- Azure Pipeline stages for lint, build, test
- Evidence that merge is blocked until checks pass

**[SAY]**
"Nothing about AI bypasses your enterprise controls. The same pipeline that validates human code validates AI-generated code. For Brandsafway, that means you can adopt Copilot inside your current governance model instead of creating a parallel process."

**[EXPECT]**
Checks run successfully and the PR becomes mergeable.

**Value proposition for Brandsafway**
- Reuses existing ADO quality gates
- Demonstrates governed AI adoption, not shadow automation
- Provides confidence for security, compliance, and release management teams

**Fallback plan**
- Show a completed successful pipeline run from a prepared tab.
- If a live run is still pending, open `azure-pipelines.yml` and explain the exact stages: install, lint, build, test, publish results.

---

## Step 10 — Merge + deployment
**Target time:** 3 minutes

**[DO]** Merge the PR and show the deployment path.

**[CLICK]** Merge pull request → confirm merge → open post-merge pipeline or environment page.

**[SHOW]**
- Merge to `main`
- Deployment stage triggered from Azure Pipelines
- End-to-end traceability: work item → issue → branch → commit → PR → pipeline → deployment

**[SAY]**
"The story ends where delivery teams care most: a change that started as a backlog item is now merged and moving through deployment with full traceability. That is the real promise here — faster cycle time without sacrificing review, testing, or operational control."

**[EXPECT]**
The audience sees the merge event and the deployment handoff to staging.

**Value proposition for Brandsafway**
- Shorter path from request to value
- Clear audit trail for engineering and platform teams
- Practical modernization using tools Brandsafway already owns

**Fallback plan**
- Show a previously merged PR and completed deployment run.
- If deployment is placeholder-only, say clearly: "In this demo repo the deploy step is simplified, but in production this would point to your existing staging or release target."

---

## Key Messages to Repeat Throughout the Demo
- Copilot accelerates implementation; it does **not** replace planning, review, or release governance.
- Brandsafway can keep Azure DevOps for planning while using GitHub for code and Copilot for execution.
- The best early use cases are **small, well-scoped, repetitive enhancements** like health checks, validation improvements, and internal API updates.
- Existing pipelines, approvals, and branch protections remain the safety net.

## Hard Questions Brandsafway May Ask — With Prepared Answers

### 1) Security
**Question:** "How do we know Copilot is safe to use with our codebase?"

**Answer:**
"The safe operating model is the same one you already trust: least-privilege repo access, branch isolation, pull-request review, and pipeline validation. Copilot proposes changes inside GitHub; it does not bypass approvals or push directly to production. For sensitive environments, we start with lower-risk repositories and governed scopes first."

### 2) Cost / ROI
**Question:** "Why pay for Copilot agents if we already have developers and ADO?"

**Answer:**
"The ROI case is not headcount replacement; it is cycle-time compression. Copilot removes waiting time on routine tasks, drafts code and tests faster, and lets senior engineers spend more time on architecture, risk, and throughput. In teams with heavy backlog volume, even small reductions in lead time can compound quickly."

### 3) Adoption model
**Question:** "Will developers trust this, or will they fight it?"

**Answer:**
"Adoption works best when Copilot starts with boring but important tasks: health endpoints, validation changes, test generation, small API enhancements, and documentation updates. Those are low-risk, easy-to-review tasks that build confidence. The lead retains approval authority, so trust is earned through results rather than mandated."

### 4) Timeline
**Question:** "How long would it take Brandsafway to pilot this?"

**Answer:**
"A focused pilot can start in days, not months, if the repo is already in GitHub and basic CI is present. The first phase is usually one or two repositories, a small set of issue types, and a clear review policy. From there, the rollout expands based on measured outcomes like PR cycle time, review effort, and test pass rate."

### 5) Compliance / auditability
**Question:** "How does this hold up under compliance and audit requirements?"

**Answer:**
"The audit story is actually one of the strengths: backlog item, linked issue, branch, commits, PR review, status checks, and deployment records are all preserved. Using `AB#` references and protected branches creates a visible chain of custody from request to release. That is often easier to audit than ad hoc delivery workflows."

### 6) Existing ADO workflows
**Question:** "Do we need to abandon Azure DevOps to use GitHub and Copilot well?"

**Answer:**
"No. The most practical model for many enterprises is exactly what this demo shows: ADO remains the planning and work-management layer, while GitHub becomes the code, automation, and AI execution layer. The integration can be lightweight through the Azure Boards app and `AB#` syntax, or more customized through APIs if needed."

### 7) Quality concerns
**Question:** "What if Copilot writes the wrong thing?"

**Answer:**
"Then it fails the same way a junior engineer's first draft can fail: in review or in CI. That is why the operating model matters. We do not ask Copilot to be infallible; we ask it to produce a faster first draft inside a process that already catches mistakes."

### 8) Tooling lock-in
**Question:** "Are we locking ourselves into one workflow or vendor?"

**Answer:**
"No single part of this flow is all-or-nothing. ADO can remain the planning system, GitHub can remain the source-control and PR system, and the AI layer can be introduced gradually. The important architectural decision is preserving standard artifacts — work items, issues, branches, PRs, and pipelines — so the workflow remains understandable and portable."

## Recommended Next Steps to Propose After the Demo
1. Run a **2-4 week pilot** on one Brandsafway service with low-risk backlog items.
2. Define a shortlist of **agent-suitable issue types**:
   - health and readiness endpoints
   - validation and error-handling enhancements
   - CRUD-style API extensions
   - unit/integration test additions
3. Confirm the preferred **ADO ↔ GitHub integration approach**:
   - Azure Boards App as default
   - `AB#` as mandatory traceability convention
   - GitHub Actions / ADO API only where extra automation is needed
4. Establish the **governance baseline**:
   - branch protection
   - required PR approval
   - required CI + Azure Pipeline checks
   - approved environments for pilot use
5. Measure pilot success using:
   - PR cycle time
   - review time
   - test pass rate
   - backlog throughput for routine enhancements
6. Expand gradually from one repo to a broader engineering workflow once governance and outcomes are proven.

## Closing Statement
"What Brandsafway just saw is not AI replacing delivery discipline. It is AI operating inside delivery discipline: ADO defines the work, GitHub manages the code lifecycle, Copilot accelerates implementation, and your existing leads and pipelines remain the quality gate. That is the model I would recommend for a practical, low-risk pilot."
