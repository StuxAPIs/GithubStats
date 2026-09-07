# Changelog

All notable changes made in the StuxAPIs fork of GitHub Stats Extended are
documented here. Versions follow [Semantic Versioning](https://semver.org/)
(MAJOR.MINOR.PATCH) and track this fork independently of upstream's own
release history. For upstream history, see
[stats-organization/github-stats-extended](https://github.com/stats-organization/github-stats-extended).

Started at v3.0.0 rather than v1.0.0 — this fork's git history carries
upstream's own release tags up through v2.1.5, so anything in the v1.x/v2.x
range would collide with an existing tag.

## v3.0.0

### Added
- `VERSION.md`, `CHANGELOG.md`, `commit.sh`/`commit.bat` — brought the fork onto the standard StuxAPIs release flow (bump `VERSION.md`, update this changelog, run `commit.sh`/`commit.bat` to commit and tag `vX.Y.Z`)

### Changed
- Switched this fork's upstream from the now-deprecated [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats) to its actively maintained TypeScript successor, [stats-organization/github-stats-extended](https://github.com/stats-organization/github-stats-extended)
- Re-added the "Hosted by stuxapis.net" branding line to `README.md`'s header, lost when the codebase was replaced by the new upstream
