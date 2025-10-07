# Contributing

Thanks for wanting to contribute to **Starklings**!  
This repository contains interactive exercises for Cairo / StarkNet.

## Quick start (browser)
1. Fork the repo (top-right **Fork**).
2. In your fork, click **Add file → Create new file**.
3. Put the file path (e.g. `CONTRIBUTING.md`) and paste content.
4. Commit to a new branch and open a Pull Request (PR) against `shramee/starklings:main`.

## Development (local)
- See `EXERCISE_CONTRIBUTION_GUIDE.md` for how to add exercises and the expected `info.toml` metadata.
- Tests:
  - Cairo related tests: `cargo test cairo`
  - All tests: `cargo test`
  - Run an exercise: `cargo run -r --bin starklings run <exercise_name>`

## Good first contributions
- small docs fixes (typos, broken links)
- small improvements to `info.toml` metadata for exercises
- add or improve exercise hints
- add missing tests or update `Cargo.toml` metadata when necessary

## Before submitting a PR
- Add a clear commit message (what changed and why).
- If you change exercises, ensure solutions in `./solutions` still compile.
- Link to any related issue in your PR description.

For the full exercise format / examples see `EXERCISE_CONTRIBUTION_GUIDE.md`.
