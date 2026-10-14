# Changelog

All notable changes to podexit are listed here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). The data in `data/` has its own
`dataVersion` (the date of its last change), shown in every report.

## [Unreleased]

### Fixed

- The terminal and Markdown reports replace control characters (C0, DEL and C1, escape sequences
  included) in pod names, versions, paths and registry answers with U+FFFD instead of printing
  them. A crafted `Podfile.lock` could otherwise recolour or rewrite the terminal.
- The JSON report does the same. `JSON.stringify` escapes only U+0000 to U+001F, so DEL and C1
  controls such as U+009B (8-bit CSI) reached stdout as is.
- Messages on stderr replace control characters too. A `Podfile.lock` entry quoted in
  "Unexpected PODS entry" could send escape sequences to the terminal (OSC 52 clipboard writes,
  OSC 8 links, screen clears), and so could a folder name in the "Checking" line.
- The Markdown report puts pod names, versions, latest versions and the lockfile path in code
  spans sized to the backticks they contain, and percent-encodes repository URLs in links. A
  crafted `Podfile.lock` or podspec could otherwise add images, links, HTML and @mentions to a
  pull request comment. Versions now show in code spans.

## [0.1.0] - 2026-10-14

### Added

- `podexit [paths...]` finds `Podfile.lock`, `ios/Podfile.lock`, `macos/Podfile.lock`,
  `example/ios/Podfile.lock` and `example/macos/Podfile.lock`, and reports each pod's update
  status (`frozen-on-trunk`, `capped`, `not-affected`, `unknown`) and Swift package status
  (`spm-available`, `no-spm`, `unknown`, `not-checked`).
- Lookups on cdn.cocoapods.org (versions, podspec), trunk.cocoapods.org (release dates) and
  raw.githubusercontent.com (`Package.swift` on the default branch and at the locked tag).
- Publisher policy data with Firebase capped at 12.x from October 2026, including the
  subdependencies of the listed pods, each entry citing its source.
- Project detection for native iOS, Flutter apps, Flutter plugins, React Native and Expo, with a
  link to the matching guide.
- Terminal, Markdown and JSON reports (`schemaVersion` 0); `--all`, `--output`, `--no-color`.
- A disk cache with a 24-hour lifetime in `--cache-dir` or `PODEXIT_CACHE_DIR`, `--offline` and
  `--refresh`; `GITHUB_TOKEN` or `GH_TOKEN` is sent to GitHub hosts only.
- Programmatic API: `analyzeLockfile`, `buildReport`, `render` and the building blocks behind them.
- Five fixtures from real native, Flutter app, Flutter plugin, Expo and React Native projects
  with recorded answers, snapshot tests and terminal demos recorded from the CLI.
- Guides for native iOS, Flutter, React Native and Expo, Firebase and pod authors, and an API
  reference site.

[Unreleased]: https://github.com/muhittincamdali/podexit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/muhittincamdali/podexit/releases/tag/v0.1.0
