# Changelog

All notable changes made in the StuxAPIs fork of GitHub Stats Extended are
documented here, tracking this fork independently of upstream's own release
history. For upstream history, see
[stats-organization/github-stats-extended](https://github.com/stats-organization/github-stats-extended).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Started at v3.0.0 rather than v1.0.0 — this fork's git history carries
upstream's own release tags up through v2.1.5, so anything in the v1.x/v2.x
range would collide with an existing tag.

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
