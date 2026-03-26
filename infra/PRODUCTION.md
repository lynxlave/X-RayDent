# Production deployment

Domains:

- `x-raydent.ru` -> `landing`
- `app.x-raydent.ru` -> `frontend`
- `api.x-raydent.ru` -> `api-gateway`

Stack:

- `infra/docker-compose.prod.yml`
- `infra/Caddyfile`
- automatic Let's Encrypt certificates via Caddy

Preparation:

1. Copy `infra/.env.prod.example` to `infra/.env.prod`.
2. Fill in `ACME_EMAIL`, `JWT_SECRET`, database password, and MinIO password.
3. Point DNS A records for `x-raydent.ru`, `app.x-raydent.ru`, and `api.x-raydent.ru` to your server IP.
4. Open inbound ports `80/tcp` and `443/tcp`.

Start:

```powershell
docker compose --env-file infra/.env.prod -f infra/docker-compose.prod.yml up -d --build
```

Stop:

```powershell
docker compose --env-file infra/.env.prod -f infra/docker-compose.prod.yml down
```

Notes:

- Caddy stores issued certificates in the Docker volume `infra_caddy_data`.
- Certificate issuance and renewal are automatic after the stack starts and DNS resolves to the server.
- For first issuance, the server must be reachable from the internet on ports `80` and `443`.
