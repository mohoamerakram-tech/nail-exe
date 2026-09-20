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
| `/custom-studio` | Legacy link that redirects to `/shop` |

The root layout in `app/layout.tsx` owns the navigation and the cart/wishlist providers. Route pages stay in `app/`; reusable UI stays in `app/components/`; catalog data and state stay in `lib/`.

## Changing the catalog

Add products to `PRODUCTS` in `lib/products.ts`. Their slugs become detail pages through `generateStaticParams` in `app/shop/[slug]/page.tsx`. Add a new aesthetic to the `NailVibe` type in `lib/types.ts` and to `SHOP_VIBES` in `lib/products.ts`; both the homepage cards and shop filters use that list. `parseShopVibe` validates URL values, and `getShopProducts` applies vibe and search filters.

The homepage animations use `app/components/home/HomeAnimation.tsx`. Its sequence number selects an asset folder under `public/images/home-animations/`; the loop ranges are defined beside the frame constants. The hero kitten has separate two-sequence behavior in `app/components/home/AnimatedCat.tsx`.

## State and checks

The cart and wishlist providers in `lib/cart/` persist browser state in `localStorage`. Wishlist content is therefore specific to the current browser, not an account.

Run `npm run lint`, `npm run typecheck`, and `npm run build` before shipping changes. Asset generation scripts are in `scripts/` and are separate from runtime page rendering.

## Integration still needed

Checkout is currently a client-side prototype: it does not save orders to a server or process card payments. The WhatsApp option opens a prefilled message, but opening that message is not proof that an order was sent. Connect an order service and payment provider before accepting real orders. The footer mailing-list control also needs a subscription service before it can collect signups.
