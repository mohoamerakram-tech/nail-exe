# Architecture

## Main areas

| Area | Responsibility |
| --- | --- |
| `app/` | Next.js routes, pages, route handlers, and UI components |
| `app/admin/` | Authenticated single-owner catalogue interface |
| `app/api/admin/` | Authenticated catalogue mutation endpoints |
| `lib/admin/` | Credential verification, signed sessions, and admin input parsing |
| `lib/catalog/` | Catalogue persistence and public read model |
| `lib/cart/` | Browser-local cart and wishlist state |
| `public/` | Static storefront media; never store secrets or customer data |
| `supabase/` | Production persistence schema |
| `docs/` | Architecture and security decisions |

## Data flow

The public storefront reads a normalized catalogue through `lib/catalog/server.ts`. In development, catalogue changes use an ignored local JSON file. Production requires Supabase and refuses local writes.

Admin mutations pass through three boundaries:

1. `lib/admin/auth.ts` validates the signed, HttpOnly session cookie.
2. Route handlers require a same-origin request and parse bounded form fields.
3. `lib/catalog/server.ts` validates image type/size and writes the complete catalogue snapshot.

The cart and wishlist are local browser state. Checkout refreshes product names, prices, and size quantities from the server catalogue before confirmation. Checkout is still a prototype and does not create a durable order.

## Trust boundaries

- Browsers and all form fields are untrusted.
- Uploaded media is untrusted even when an extension or MIME type looks valid.
- Supabase service-role credentials are server-only and bypass row-level security.
- GitHub Actions and deployment providers must receive only the minimum required secrets.
- Admin access is more sensitive than the public catalogue and must not be cached.
