FROM caddy:builder-alpine AS builder

RUN xcaddy build \
    --with github.com/caddyserver/cache-handler \
    --with github.com/ueffel/caddy-brotli

FROM caddy:latest

COPY --from=builder /usr/bin/caddy /usr/bin/caddy