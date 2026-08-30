# FileHog

Homelab photo dump: open één URL op telefoon én desktop. Maak of kies een foto, geef een tag, upload — en zie 'm realtime binnenkomen. Geen mappenhiërarchie, wel snelle tagging, compressie en een tijdlijn.

## Stack

- **Backend:** [PocketBase](https://pocketbase.io) in Docker (`photos` + `tags`)
- **Frontend:** single-file app in `pb_public/index.html` (Tailwind + Alpine.js + PocketBase JS SDK + exifr)

## Snel starten

```bash
cp .env.example .env
# optioneel: PB_ADMIN_EMAIL / PB_ADMIN_PASSWORD zetten

docker compose up -d --build
```

Open:

- App: http://localhost:8090
- Admin UI: http://localhost:8090/_/

Eerste keer zonder env-credentials: maak een admin via de UI, of:

```bash
docker compose exec pocketbase /app/pocketbase superuser upsert jij@example.com 'sterk-wachtwoord'
```

Op je homelab: map poort 8090 door (of via Tailscale/VPN) en open dezelfde URL op telefoon + desktop.

## Collecties (via migratie)

| Collectie | Velden |
|-----------|--------|
| `tags` | `name` (uniek), `color` |
| `photos` | `image` (file), `original` (optioneel), `title`, `tags` (relation), `taken_at`, `latitude`/`longitude`, `width`/`height`, `file_size`, `compressed` |

API-regels staan open (`""`) zodat telefoon/desktop zonder login kunnen uploaden/bekijken — bedoeld voor een **privé netwerk**. Zet later auth of een reverse proxy ervoor als je het publiek maakt.

## Features

- **Snelle tagging** tijdens upload + globale tags aanmaken
- **Batch bewerken** op desktop: selecteer meerdere foto's → hernoemen of tags toevoegen
- **Client-side compressie** (standaard max 1920px), optioneel origineel meespeuren
- **Instant filters** op tag, zoekterm en datum; raster- of tijdlijnweergave
- **EXIF** datum/tijd/GPS uitgelezen in de browser en opgeslagen op het record
- **Realtime**: PocketBase subscribe — nieuwe uploads verschijnen zonder refresh

## Config in de app

Rechtsboven **Server**: PocketBase-URL (leeg = zelfde origin) en max compressiebreedte. Opgeslagen in `localStorage`.

## Development zonder Docker

```bash
# binary van https://github.com/pocketbase/pocketbase/releases
./pocketbase serve --http=0.0.0.0:8090
```

`pb_migrations/` en `pb_public/` worden automatisch meegenomen vanuit de werkdirectory.
