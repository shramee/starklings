# Starklings App Lite

A frontend-only version of the Starklings web app for learning Cairo and Starknet — **no backend required**.

## What's different from the full app

- **No server, no database.** Everything runs in the browser.
- **Exercise data is embedded.** The 55 exercises (code, descriptions, hints, anti-cheat rules) are generated into `src/data/` at build time from the repo's `info.toml`, the `.cairo` sources, and `app/api/anti-cheat.json`. The initial page load only fetches the lightweight `exercises.json` index; each exercise's full content is loaded on demand as a separate chunk.
- **Progress is stored in localStorage only.** Completed exercises, saved code, current exercise, and GitHub/wallet identity all live in the browser.
- **Compile/test still works** via the shared Cairo WASM runner (`https://cairo-runner1.leastimperfect.com`).
- GitHub login, the wallet drawer, and all pages (Home, Workspace, FinalScreen, Check, Evaluate) keep their UI; the backend-dependent parts (graduates list, student evaluation) show an explanatory note since there is no database.

## Getting started

```bash
cd app-lite
npm install
npm run start        # http://localhost:4000
```

The `start` script regenerates the exercise data before launching.

## Scripts

| Script | Description |
|---|---|
| `npm run generate` | Regenerate `src/data/exercises.json` + `src/data/exercises/*.json` from the repo sources |
| `npm run start` | Run the dev server on port 4000 |
| `npm run build` | Production build |
| `npm test` | Run tests |
| `npm run deploy` | Build and publish to the `gh-pages` branch of `origin` (shramee/starklings) → https://shramee.github.io/starklings |

## Configuration

`.env` (or `.env-example` to copy):

```
REACT_APP_RUNNER_API_URL=https://cairo-runner1.leastimperfect.com
```

Override it if you run a local Cairo runner.
