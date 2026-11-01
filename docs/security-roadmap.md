# Security roadmap

This roadmap describes the path from an unfinished prototype to a launchable storefront. Completing a phase does not replace a security review.

## Current baseline

- [x] Server-only password hash and session secret configuration
- [x] Signed HttpOnly, Secure-in-production, SameSite Strict admin cookie
- [x] Authentication and same-origin checks on catalogue mutations
- [x] Bounded admin text, numeric, URL, and upload inputs
- [x] Production persistence fails closed when Supabase is missing
- [x] Supabase row-level security enabled with no public mutation policy
- [x] Security response headers and no-store admin responses
- [x] Dependency, build, and CodeQL automation
- [x] Responsible disclosure policy and contribution rules

## Phase 1 — before shared staging

- [ ] Require MFA for GitHub, deployment, email, and Supabase maintainers
- [ ] Enable GitHub private vulnerability reporting, secret scanning, push protection, Dependabot alerts, and GitHub Advanced Security if the private organization repository requires it for CodeQL
- [ ] Protect `main`: pull requests, one approval, required checks, conversation resolution, no force pushes
- [ ] Replace the temporary admin password and rotate the session secret
- [ ] Store staging secrets only in the deployment provider; separate staging and production projects
- [ ] Replace in-memory login throttling with a durable, trusted-IP-aware rate limiter
- [ ] Add structured security events for login failures and catalogue mutations without logging credentials or customer data
- [ ] Re-encode uploaded images with Sharp, strip metadata, enforce pixel limits, and delete orphaned objects

## Phase 2 — before real orders or payments

- [ ] Design a server-side order model with immutable price snapshots and inventory transactions
- [ ] Add server-side checkout validation, idempotency keys, and replay protection
- [ ] Use a hosted PCI-compliant payment provider; never handle raw card data
- [ ] Authenticate payment webhooks and test duplicate, delayed, and forged events
- [ ] Define retention and deletion rules for customer contact, address, order, and support data
- [ ] Add privacy notice, terms, refund policy, and incident contact process
- [ ] Encrypt backups, test restoration, and document recovery time/recovery point objectives
- [ ] Run authorization, file-upload, injection, CSRF, session, and business-logic tests

## Phase 3 — launch gate

- [ ] Threat-model admin takeover, catalogue tampering, inventory races, malicious uploads, and payment abuse
- [ ] Add a restrictive nonce- or hash-based Content Security Policy after measuring violations in report-only mode
- [ ] Review every third-party script, font, analytics tool, and outbound integration
- [ ] Run dependency, SAST, secret, and infrastructure scans on the release commit
- [ ] Complete an independent security review and close all critical/high findings
- [ ] Prepare an incident response runbook with owners, escalation, evidence preservation, and customer notification steps
- [ ] Tag the reviewed release and keep a rollback-ready deployment

## Ongoing maintenance

- Patch critical/high production dependencies immediately; review Dependabot weekly.
- Review access quarterly and remove inactive collaborators.
- Rotate sensitive credentials after personnel, provider, or incident changes.
- Test backups and the incident runbook at least twice per year.
- Record security decisions in `docs/` so later contributors understand the tradeoffs.
