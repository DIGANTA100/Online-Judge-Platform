# API Contracts

The Next.js route handlers in `src/app/api/v1` mirror the Spring Boot backend contract in `backend/src/main/java/com/nimblejudge`.

## Authentication

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`

Production behavior:

- Validate input.
- Apply per-IP and per-account rate limits.
- Hash passwords with Argon2id or BCrypt.
- Issue short-lived JWT access tokens.
- Rotate refresh tokens and store only token hashes.
- Audit failed login, reset, and verification attempts.

## Problems

- `GET /api/v1/problems`
- `GET /api/v1/problems/{slug}`

Production behavior:

- Public users see only public problems.
- Authors and admins can access drafts through admin endpoints.
- Hidden test metadata never includes raw input or output.

## Submissions And Judge

- `POST /api/v1/submissions`
- `GET /api/v1/submissions/{id}/events`

Production behavior:

- Store source in object storage.
- Create a queued submission row.
- Push Redis judge job.
- Stream verdict updates through SSE or WebSocket.

## Contests

- `GET /api/v1/contests/{slug}/standings`

Production behavior:

- Scoreboard uses accepted submissions, penalties, and freeze state.
- Virtual contests shift time windows per participant.
- Team contests aggregate users into one standing row.

## Admin And AI

- `POST /api/v1/admin/test-cases`
- `POST /api/v1/ai/code-review`

Production behavior:

- Admin routes require elevated roles and audit logs.
- AI routes must not receive hidden tests.
- AI output is advisory and never changes verdicts.
