#!/usr/bin/env bash
set -euo pipefail

# Simple curl helpers to test the backend. Usage:
#   ./scripts/curl-examples.sh health
#   ./scripts/curl-examples.sh create-intent

BASE_URL=${BASE_URL:-http://localhost:${PORT:-8080}}

cmd=${1:-}

health() {
  echo "GET $BASE_URL/healthcheck"
  curl -sS -X GET "$BASE_URL/healthcheck" | jq .
}

create_intent() {
  echo "POST $BASE_URL/api/v1/payment/stripe/create-payment-intent"
  payload='{"items":[{"id":"demo-item","amount":123}]}'
  curl -sS -H "Content-Type: application/json" \
       -X POST "$BASE_URL/api/v1/payment/stripe/create-payment-intent" \
       -d "$payload" | jq .
}

case "$cmd" in
  health)
    health ;;
  create-intent)
    create_intent ;;
  *)
    echo "Usage: $0 {health|create-intent}" >&2
    exit 1 ;;
esac

