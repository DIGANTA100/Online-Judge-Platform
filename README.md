# NimbleJudge

A premium competitive programming platform foundation inspired by Codeforces, LeetCode, AtCoder, HackerRank, and VS Code.

This build follows the requested order: UI/UX first, then product modules, then backend contracts. It includes a Next.js landing page, full platform app surfaces, reusable Monaco editor module, dark-first design system, API route handlers, Spring Boot backend scaffold, PostgreSQL/Redis infrastructure, and software architecture documentation for the full online judge roadmap.

## Stack

- Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- Monaco Editor
- Planned backend: Spring Boot, PostgreSQL, Redis, Docker sandbox workers
- Backend scaffold: Spring Boot 3.5, PostgreSQL, Redis

## Run

```bash
npm.cmd install
npm.cmd run generate:assets
npm.cmd run dev
```

Open `http://127.0.0.1:3000`, then use `/platform` to navigate every module.

## Implemented Product Surfaces

- `/auth` - authentication flows
- `/problems` - problem management
- `/contests` - contest engine
- `/workspace` - Monaco editor, compiler console, judge flow
- `/dashboard` - analytics dashboard
- `/ratings` - Codeforces-like rating system
- `/ai` - AI learning assistant
- `/admin` - admin studio
- `/architecture` - service, API, security, and judge architecture

## Backend And Infrastructure

- `src/app/api/v1/**` - Next.js API contract handlers for demo integration
- `backend/` - Spring Boot API scaffold matching the same contract
- `infra/docker-compose.yml` - PostgreSQL and Redis local infrastructure

## Important Files

- `src/app/page.tsx` - landing page route
- `src/components/landing/landing-page.tsx` - premium landing UI
- `src/components/editor/monaco-code-editor.tsx` - reusable Monaco editor module
- `docs/architecture-blueprint.md` - complete platform architecture
- `docs/design-system.md` - visual identity and component design system
- `docs/database-design.md` - PostgreSQL schema and index strategy
- `docs/api-contracts.md` - API behavior and security expectations
- `docs/production-readiness-review.md` - final polish review and launch risks
