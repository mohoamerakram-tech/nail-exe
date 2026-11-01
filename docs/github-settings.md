# Recommended GitHub repository settings

Apply these settings before moving the repository into an organization or inviting additional maintainers. They cannot be enforced by files in the repository alone.

## General

- Keep the repository private during development.
- Add a concise description and topics such as `nextjs`, `typescript`, `ecommerce`, and `press-on-nails`.
- Disable unused features such as Wiki and Discussions until someone owns their moderation.
- Enable Issues only if the team will triage them.

## Access

- Require MFA for every organization member.
- Grant write/admin access through organization teams, not individual invitations.
- Keep at least two trusted repository administrators for recovery.
- Review outside collaborators and deploy keys quarterly.

## Ruleset for `main`

- Require pull requests and at least one approving review.
- Require review from Code Owners.
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution.
- Require the `CI` and `CodeQL` checks.
- Block force pushes and branch deletion.
- Restrict bypass permission to a small administrator team.
- Require signed commits when the organization can support key recovery and contributor onboarding.

## Security

- Enable Dependency graph, Dependabot alerts, and Dependabot security updates.
- Enable GitHub Advanced Security for a private repository if the organization plan supports it, then enable CodeQL using the committed advanced workflow. Public repositories can use CodeQL without that private-repository entitlement.
- Enable secret scanning and push protection.
- Enable private vulnerability reporting.
- Set Actions permissions to read repository contents by default and allow only selected, verified actions when possible.
- Review every repository/environment secret and scope production deployments to a protected environment with required reviewers.

## Transfer checklist

1. Create organization teams for maintainers and reviewers.
2. Transfer the repository and update `.github/CODEOWNERS` to organization teams.
3. Recheck Actions, secrets, environments, webhooks, deploy keys, branch rules, and security features; some settings can change during transfer.
4. Rotate deployment and Supabase credentials after the move.
5. Run CI and CodeQL on the default branch, then record the reviewed commit.
