# Shopify Links Template

This branch is a Shopify theme template. It does not contain app code.

## 1) What this branch contains

Core files you should care about:

- `layout/theme.liquid`
- `assets/theme.css`
- `sections/main-links.liquid`
- `templates/page.links.json`
- `templates/index.json`
- `templates/page.json`
- `config/settings_schema.json`
- `locales/en.default.json`
- `locales/ja.json`

## 2) Set up and preview locally

Run these commands in this repo directory:

```bash
npm i -g @shopify/cli @shopify/theme
shopify login --store your-store.myshopify.com
shopify theme dev --store your-store.myshopify.com
```

What to do:

1. Open the local preview URL shown by `shopify theme dev`.
2. Edit files in `sections/`, `templates/`, `assets/`, `config/`, and `locales/`.
3. Save, and the preview updates automatically.
4. In Shopify admin, create or edit a Page and set its template to `page.links`.

## 3) Push updates manually with CLI

Use this when you want immediate deploy from your machine:

```bash
shopify theme push \
  --store your-store.myshopify.com \
  --password YOUR_ADMIN_API_TOKEN \
  --theme YOUR_THEME_ID \
  --path . \
  --nodelete
```

- `--theme` is required only if you want to target a specific theme.
- `--nodelete` removes files from the theme that were deleted here.

If you have multiple environments, run the same command with the target store and theme ID for each.

## 4) Set up GitHub Action auto deploy

A workflow exists at `.github/workflows/deploy-shopify-template.yml`.

### 4.1 Required GitHub secrets

- `SHOPIFY_STORE`
  - Example: `your-store.myshopify.com`
- `SHOPIFY_ADMIN_API_TOKEN`
  - A private app token with theme write access
- `SHOPIFY_THEME_ID`
  - Theme ID in your target store

Add them in GitHub: `Settings -> Secrets and variables -> Actions -> New repository secret`.

### 4.2 When it deploys

The workflow deploys automatically on push to `shopify-links-template`.
You can also run it manually with `workflow_dispatch`.

### 4.3 Full command used by CI

```bash
shopify theme push \
  --store "$SHOPIFY_STORE" \
  --password "$SHOPIFY_ADMIN_API_TOKEN" \
  --theme "$SHOPIFY_THEME_ID" \
  --path . \
  --nodelete
```

## 5) How to get token and theme id

1. In Shopify admin, create/prepare a private app and grant theme read/write scope.
2. In the app settings, generate an access token and save it as `SHOPIFY_ADMIN_API_TOKEN`.
3. Get theme IDs:

```bash
shopify theme list --store your-store.myshopify.com
```

4. Copy the target theme ID and set it as `SHOPIFY_THEME_ID`.

## 6) Optional local helper script

Create and run one command from terminal for repeated deploys:

```bash
cat > scripts/deploy-shopify-template.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail

shopify theme push \
  --store "$SHOPIFY_STORE" \
  --password "$SHOPIFY_ADMIN_API_TOKEN" \
  --theme "$SHOPIFY_THEME_ID" \
  --path . \
  --nodelete
SH

chmod +x scripts/deploy-shopify-template.sh
SHOPIFY_STORE=your-store.myshopify.com \
SHOPIFY_ADMIN_API_TOKEN=shpat_xxx \
SHOPIFY_THEME_ID=1234567890 \
./scripts/deploy-shopify-template.sh
```

Set `scripts/deploy-shopify-template.sh` only if you want a one-step local deploy workflow.
