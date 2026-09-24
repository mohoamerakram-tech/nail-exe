# nail.exe

A Next.js storefront for handmade press-on nails.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, featured products, and cat animations |
| `/shop` | Catalog, with optional `vibe` and `q` filters |
| `/shop/[slug]` | Product detail; unknown slugs return 404 |
| `/wishlist` | Saved products from browser storage |
| `/checkout` | Checkout UI (see limitation below) |
| `/custom-studio` | Customer custom-set preview using admin-managed logos |
| `/admin/login` | Single-owner administrator login |
| `/admin` | Catalogue, stock, logo, and promotion overview |
| `/admin/products` | Create, edit, draft, restock, or remove nail sets |
| `/admin/logos` | Manage custom-studio artwork |
| `/admin/promotions` | Manage the homepage campaign carousel |

The root layout in `app/layout.tsx` owns the navigation and the cart/wishlist providers. Route pages stay in `app/`; reusable UI stays in `app/components/`; catalog data and state stay in `lib/`.

## Admin catalogue

The single-owner admin controls products, per-size quantities, draft status, studio logos, and homepage promotions. Customer routes read the same catalogue through `lib/catalog/server.ts`, so changes appear in the homepage, shop, product pages, wishlist, checkout, and custom studio. A quantity of zero disables that size; zero across all sizes marks the whole product sold out.

Local development stores changes in ignored `data/admin-catalog.json` and uploads in ignored `public/uploads/catalog`. Production intentionally refuses local writes. Run `supabase/catalog.sql`, create a Supabase project, and configure:

```env
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD_HASH=scrypt\$<salt>\$<hex digest>
ADMIN_SESSION_SECRET=<at least 32 random characters>
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only service role key>
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` through a `NEXT_PUBLIC_` variable. Admin sessions are signed HttpOnly cookies, expire after eight hours, and mutation routes require authentication and same-origin requests. Login attempts are rate limited.

`PRODUCTS` in `lib/products.ts`, `PROMOTIONS` in `lib/promotions.ts`, and the built-in logos in `lib/catalog/server.ts` are seed data used until the first admin save. Add a new aesthetic to `NailVibe` and `SHOP_VIBES` only when introducing a new permanent shop category.

The homepage animations use `app/components/home/HomeAnimation.tsx`. Its sequence number selects an asset folder under `public/images/home-animations/`; the loop ranges are defined beside the frame constants. The hero kitten has separate two-sequence behavior in `app/components/home/AnimatedCat.tsx`.

## State and checks

The cart and wishlist providers in `lib/cart/` persist browser state in `localStorage`. Wishlist content is therefore specific to the current browser, not an account.

Run `npm run lint`, `npm run typecheck`, and `npm run build` before shipping changes. Asset generation scripts are in `scripts/` and are separate from runtime page rendering.

## Integration still needed

Checkout validates cart quantities against the current managed catalogue before confirmation, but it still does not save orders to a server or process card payments. The WhatsApp option opens a prefilled message, but opening that message is not proof that an order was sent. Connect an order service and payment provider before accepting real orders. The footer mailing-list control also needs a subscription service before it can collect signups.
