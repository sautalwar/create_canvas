# Copilot Instructions — Brandsafway Inventory API

## Project Overview
This is a Node.js/TypeScript REST API for inventory management. It uses Express, and tests are written with Jest + Supertest.

## Coding Conventions
- Use TypeScript strict mode
- All API responses use the `ApiResponse<T>` wrapper type from `src/types.ts`
- Route handlers go in `src/routes/` as separate files, then register in `src/routes/index.ts`
- Tests go in `tests/` and follow the naming pattern `{feature}.test.ts`
- Use `createTestApp()` from `tests/setup.ts` for test app instances

## Test Patterns
- Group tests by HTTP method using nested `describe` blocks
- Test both success and error cases (400, 404)
- Check `res.body.success` and `res.status` in every test
- Use `supertest` for HTTP assertions

## PR Description Format
- Reference Azure DevOps work items using `AB#{id}` syntax in PR descriptions
- Example: `Resolves AB#1234`
- Include a summary of what changed and why

## API Design
- All endpoints are under `/api/`
- Use RESTful conventions: GET (list/read), POST (create), PUT (update), DELETE (remove)
- Return proper HTTP status codes: 200, 201, 400, 404
- Validate required fields and return descriptive error messages
