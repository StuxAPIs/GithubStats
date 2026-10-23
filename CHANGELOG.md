# Changelog

All notable changes made in the StuxAPIs fork of GitHub Stats Extended are
documented here, tracking this fork independently of upstream's own release
history. For upstream history, see
[stats-organization/github-stats-extended](https://github.com/stats-organization/github-stats-extended).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Date Versioning](https://datevers.ing) since v26.10.23 (`YY.MM.DD`, the UTC release date, with `-1`, `-2`… for later releases the same day); earlier releases used [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Started at v3.0.0 rather than v1.0.0 — this fork's git history carries
upstream's own release tags up through v2.1.5, so anything in the v1.x/v2.x
range would collide with an existing tag.

## v26.10.23

### Added

- A Discord component embed (custom link preview) in the `<head>` of the card wizard and docs pages, left out of 404 pages, with `discordEmbed.test.ts` covering it
- A full favicon set: `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` with 192, 512 and maskable icons, linked on every page through one shared list
- `tests/version.sh`, which checks that `VERSION.md` is a valid Date Version, a real calendar date not in the future, and the same as the newest entry in this changelog

### Changed

- Switched from Semantic Versioning to [Date Versioning](https://datevers.ing): releases are numbered by their UTC release date as `YY.MM.DD`, with `-1`, `-2`… for later releases the same day. This release follows v3.0.6
- `commit.sh` and `commit.bat` refuse a `VERSION.md` that isn't a valid Date Version or is dated in the future (UTC), and warn when it's dated before today
- Replaced the old `logo192.png`, `logo512.png` and `manifest.json` with the new icon files
- `README.md` and `CONTRIBUTING.md` describe Date Versioning and the release steps

## v3.0.6

### Changed

- The logos and icons in the Markdown docs (README and the like) follow GitHub's light or dark theme, using each brand's `logo-light`/`logo-dark` and `icon-light`/`icon-dark` files

## v3.0.5

### Security
- The WakaTime card's `api_domain` query parameter was used as-is to build the server-side request URL, letting anyone make the backend fetch arbitrary hosts (SSRF). It's now restricted to an allowlist — `wakatime.com`, `wakapi.dev`, `hackatime.hackclub.com` — and anything else (other hosts, IPs, `localhost`, embedded credentials, custom ports) is rejected with a "Supported api_domain values" error card; the WakaTime card docs list the allowed values
- The WakaTime `username` is now URL-encoded in the request path, so values like `../../admin?x=` can't rewrite the API path or query

## v3.0.4

### Fixed
- `README.md`'s Stux.Group brand icon URL had a leftover duplicated `/global/` path segment (`global.media.stux.group/global/icon.png`) — corrected to `https://global.media.stux.group/icon.png`

## v3.0.3

### Changed
- `README.md`'s footer "Built & Maintained by StuxAPIs" icon now uses StuxAPIs' own logo (`https://global.media.stuxapis.net/icon.png`) instead of the GitHub org avatar (`github.com/StuxAPIs.png`), now that StuxAPIs has real branding of its own

## v3.0.2

### Changed
- `README.md`'s footer brand-attribution block updated to the new two-line format (Built & Maintained by StuxAPIs, Hosted by Stuxedo / StuxAPIs is a part of the Stux.Group brand of businesses), replacing the older single-line disclaimer

## v3.0.1

### Changed
- `README.md`'s "StuxAPIs is part of the Stux.Group Brand of Companies" line now includes the Stux.Group icon inline
- This changelog's preamble now uses the standard Keep a Changelog wording

## v3.0.0

### Added
- `VERSION.md`, `CHANGELOG.md`, `commit.sh`/`commit.bat` — brought the fork onto the standard StuxAPIs release flow (bump `VERSION.md`, update this changelog, run `commit.sh`/`commit.bat` to commit and tag `vX.Y.Z`)

### Changed
- Switched this fork's upstream from the now-deprecated [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats) to its actively maintained TypeScript successor, [stats-organization/github-stats-extended](https://github.com/stats-organization/github-stats-extended)
- Re-added the "Hosted by stuxapis.net" branding line to `README.md`'s header, lost when the codebase was replaced by the new upstream
