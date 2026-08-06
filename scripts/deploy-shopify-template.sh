#!/usr/bin/env bash
set -euo pipefail

: "${SHOPIFY_STORE:?SHOPIFY_STORE is required. Example: your-store.myshopify.com}"
: "${SHOPIFY_ADMIN_API_TOKEN:?SHOPIFY_ADMIN_API_TOKEN is required.}"
: "${SHOPIFY_THEME_ID:?SHOPIFY_THEME_ID is required.}"

shopify theme push \
  --store "$SHOPIFY_STORE" \
  --password "$SHOPIFY_ADMIN_API_TOKEN" \
  --theme "$SHOPIFY_THEME_ID" \
  --path . \
  --nodelete
