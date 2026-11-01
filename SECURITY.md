# Security policy

## Project status

`nail.exe` is under active development and is **not production-ready**. The current checkout is a prototype and does not process real card payments or create durable orders. Do not use the development credentials, local catalogue storage, or sample configuration in production.

## Reporting a vulnerability

Do not publish suspected vulnerabilities, secrets, customer data, or exploit details in a public issue.

Use GitHub's **Private vulnerability reporting** feature for this repository. Include:

- the affected route, component, or commit;
- steps to reproduce with a minimal proof of concept;
- the security impact and conditions required;
- any suggested mitigation;
- whether the issue has been disclosed elsewhere.

Maintainers should acknowledge a complete report within five business days. Response and remediation dates depend on severity and project maturity. No bug bounty is currently offered.

## Supported versions

Only the latest commit on the default branch is supported while the project is pre-release. Older commits, forks, preview deployments, and local development servers are unsupported.

## Security expectations

- Never commit `.env*` files, service-role keys, session secrets, passwords, customer information, or production catalogue exports.
- Rotate a credential immediately if it appears in Git history, logs, screenshots, issues, or chat.
- Use least-privilege GitHub and Supabase access with MFA required for maintainers.
- Treat uploaded files, catalogue content, and checkout data as untrusted input.
- Review [the security roadmap](docs/security-roadmap.md) before any public launch.
