#!/bin/sh
set -e

# Create superuser when credentials are provided (idempotent upsert).
if [ -n "${PB_ADMIN_EMAIL:-}" ] && [ -n "${PB_ADMIN_PASSWORD:-}" ]; then
  /app/pocketbase superuser upsert "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" || true
fi

exec /app/pocketbase "$@"
