# Shopify Theme (OS 2.0) - TSN Eggroll

This folder contains a Shopify Online Store 2.0 theme port of the landing page from the original Next.js project.

## What is included

- `layout/theme.liquid`
- `templates/index.json` (homepage)
- `sections/` for header, hero, benefits, brand, features, testimonials, pricing, footer
- `assets/theme.css` + `assets/theme.js`
- Seeded image assets copied from `public/`

## Important migration notes

- Next.js API routes (`app/api/*`), Stripe checkout, and custom app logic are **not** part of a Shopify theme.
- In Shopify, purchasing should point to product pages/cart (`/products/...`, `/cart`) or use Shopify Buy Buttons.
- Set all CTA links from the Theme Editor after publishing products/pages.

## Run locally with Shopify CLI

```bash
cd shopify-theme
shopify theme dev --store YOUR_STORE.myshopify.com
```

## Push to Shopify

```bash
cd shopify-theme
shopify theme push
```

## Customize in Theme Editor

1. Open `Online Store -> Themes -> Customize`.
2. Edit each section's text, links, and images.
3. Replace fallback asset images with uploaded store images if needed.
