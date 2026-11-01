# Contributing

This repository is an unfinished storefront. Keep changes small, reviewable, and safe to run without production credentials.

## Local setup

1. Install the Node.js version declared in `.nvmrc`.
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and use development-only values.
4. Run `npm run dev`.

Never use real customer data or production keys in local development, test fixtures, screenshots, or pull requests.

## Branches and pull requests

- Create a short-lived branch from `main`.
- Use focused commits and explain the customer-facing behavior.
- Link the relevant issue or roadmap item.
- Include screenshots for visual changes and describe security impact for auth, uploads, checkout, catalogue, or infrastructure changes.
- Request review from a code owner before merging.

## Required checks

Run these commands before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
```

Pull requests must not weaken authentication, input validation, security headers, audit logging plans, or secret handling without a documented reason and reviewer approval.

## Security-sensitive changes

Changes to `app/api/admin`, `lib/admin`, `lib/catalog`, `supabase`, deployment configuration, or checkout require a threat-focused review. Document trust boundaries, failure behavior, data retention, and rollback steps when applicable.
