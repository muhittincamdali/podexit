<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="Latest version: v0.1.1"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="Language version: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="License: MIT"></picture></a>
</p>

<p align="center">
<a href="#quick-start"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-en-light.svg" alt="Get started"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-en-light.svg" alt="Documentation"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-en-light.svg" alt="Guides"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-en-light.svg" alt="Examples"></picture></a>
</p>

<!-- brand:end -->

CocoaPods trunk goes read-only on December 2, 2026. Your builds keep working, but pods published
there will never get another update. podexit shows which of your dependencies are frozen, which
already ship a Swift package, and the migration path for native iOS, Flutter and React
Native/Expo. It reads the `Podfile.lock` you already have; nothing is installed into your project.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="podexit run on a native iOS app: Firebase pods capped at 12.x, Alamofire, Kingfisher, SnapKit and others frozen after December 2, each with a Swift package"></picture>

<sub>Recorded from the real CLI on the <a href="fixtures/native-app/Podfile">native-app fixture</a>
with the trunk and GitHub answers saved on 14 October 2026 (<code>npm run demo</code>).</sub>

## Highlights

- **Two answers per pod**: whether it stops getting updates (frozen on trunk, capped early by its
  publisher, or not affected) and whether its upstream repository has a `Package.swift`.
- **Version-aware**: checks `Package.swift` at the tag you have locked too, and says when the
  Swift package only exists in newer versions.
- **Firebase cap built in**: Firebase's 20 listed pods are capped at 12.x and their
  subdependencies with them, from a sourced data file that cites the Firebase page.
- **Native, Flutter, React Native and Expo**: finds `Podfile.lock` in the folder or in `ios/`,
  `macos/`, `example/ios/` or `example/macos/`, recognises the project kind and links the matching
  guide.
- **Terminal, Markdown or JSON**: a table for you, Markdown for a pull request, JSON for scripts.
- **Works offline**: answers are cached for 24 hours in `~/.cache/podexit`; `--offline` uses only
  the cache.

## Quick start

You need [Node.js](https://nodejs.org/) 22.12 or later (`node --version` prints it; on a Mac,
`brew install node` installs it). Nothing else.

**1. Open a terminal in your app's folder**, the one with the `Podfile`, the `ios/` folder or (for
a Flutter plugin) the `example/` folder:

```sh
cd path/to/YourApp
```

**2. Run podexit:**

```sh
npx https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
```

podexit is not on npm yet (publishing it there is planned), so `npx podexit` does not work for
now. The command above runs the 0.1.1 release from GitHub; use it wherever this README says
`npx podexit`.

**3. Read the table.** Rows marked **capped** stop first (Firebase stops publishing to CocoaPods in
October 2026); rows marked **frozen after Dec 2** get no new versions after December 2. Where the
Swift package column says **yes**, the pod can be moved now. The last line links the guide for
your kind of project.

## What changes on December 2 (and what doesn't)

From the [CocoaPods announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/) and the
[Firebase migration page](https://firebase.google.com/docs/ios/cocoapods-deprecation):

1. **Builds keep working.** The Specs repository and CDN stay online; `pod install` keeps
   resolving every version already published. A trial run of read-only mode happens on
   November 1–7, 2026.
2. **Pods on trunk get no new versions** after December 2, 2026, security fixes included, unless
   they ship another way (usually a Swift package).
3. **Firebase 12 is the last major version on CocoaPods**, and Firebase stops publishing there in
   October 2026. Versions 12 and earlier stay installable.

Read more in [What changes on December 2](docs/guides/what-changes.md).

## Installation

podexit is not on npm yet; publishing it there is planned. Until then, run the 0.1.1 release
from GitHub as shown above, or add it to a project:

```sh
npm install --save-dev https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
npx podexit
```

Once podexit is on npm, `npx podexit` downloads and runs the latest version without installing
anything. To pin a version in a project or CI:

```sh
npm install --save-dev podexit
npx podexit
```

or install it globally with `npm install --global podexit`. A Homebrew formula for
`muhittincamdali/tap` is prepared by the release workflow (planned with the first release of the
tap).

## Usage

```text
podexit [paths...] [options]
```

| Option                  | What it does                                                               |
| ----------------------- | -------------------------------------------------------------------------- |
| `paths`                 | `Podfile.lock` files or project folders; default is the current folder     |
| `-f, --format <format>` | `tty` (default), `markdown` or `json`                                      |
| `-o, --output <file>`   | Write the report to a file instead of the terminal                         |
| `-a, --all`             | Also list pods from local paths, git and private specs in the table        |
| `--offline`             | Use cached answers only; never touch the network                           |
| `--refresh`             | Ignore the cache and ask the network again                                 |
| `--cache-dir <dir>`     | Cache folder (default `$XDG_CACHE_HOME/podexit` or `~/.cache/podexit`)     |
| `--no-color`            | Plain text even in a terminal (`NO_COLOR` and `FORCE_COLOR` are respected) |
| `--concurrency <n>`     | Parallel pod lookups, 1 to 64 (default 8)                                  |

Exit codes: `0` report written, `2` bad arguments, no `Podfile.lock` found or a file that is not
one, `1` anything unexpected. podexit reports; it does not fail a build because of what it finds.

Without paths, podexit reads every lockfile it finds at `Podfile.lock`, `ios/Podfile.lock`,
`macos/Podfile.lock`, `example/ios/Podfile.lock` and `example/macos/Podfile.lock`; a folder given
as a path is searched the same way.

| Environment variable       | What it does                                                        |
| -------------------------- | ------------------------------------------------------------------- |
| `PODEXIT_CACHE_DIR`        | Cache folder when `--cache-dir` is not given                        |
| `GITHUB_TOKEN`, `GH_TOKEN` | Sent to GitHub hosts only; needed for private upstream repositories |
| `NO_COLOR`, `FORCE_COLOR`  | Turn terminal colours off or on                                     |

### Keep a Markdown report with the code

```sh
npx podexit --format markdown --output podexit.md
```

The Markdown version has the same tables, release dates and links to each Swift package
repository; pods from local paths and git are folded into a `<details>` block.

### Use the JSON report in scripts

```sh
npx podexit --format json > podexit.json
```

Each pod carries `updates.status`, `swiftPackage.status`, the latest version on trunk and its
date, and a sentence explaining each answer. The layout is `schemaVersion` 0 and may change before
1.0. [examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) filters it with `jq`.

### Run it in CI

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml) adds the report to the
job summary of every pull request that changes a `Podfile.lock`.

### Rate limits and private repositories

podexit reads `Package.swift` through raw.githubusercontent.com, which does not use the GitHub API
quota. Set `GITHUB_TOKEN` (or `GH_TOKEN`) to look into private upstream repositories; the token is
sent to GitHub hosts only.

### From JavaScript

```js
import {
  analyzeLockfile,
  buildReport,
  CachedFetcher,
  HttpFetcher,
  loadPublisherPolicy,
  render,
} from 'podexit';

const policy = loadPublisherPolicy();
const fetcher = new CachedFetcher(new HttpFetcher({ userAgent: 'my-tool' }), {
  directory: '.cache',
});
const lockfile = await analyzeLockfile(text, 'ios/Podfile.lock', { fetcher, policy });
console.log(render(buildReport([lockfile], { policy, offline: false }), 'markdown'));
```

A runnable version is [examples/api/summary.mjs](examples/api/summary.mjs).

## Demo

The three recordings come from the [fixtures](fixtures/README.md): real projects created with
each toolchain and resolved by CocoaPods 1.16.2, replayed with the answers saved on
14 October 2026.

| Project                                              | Recording                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Native iOS app (Firebase, Alamofire, Google Sign-In) | top of this page                                                                      |
| Flutter app (FlutterFire, google_sign_in, …)         | [light](docs/media/demo-flutter-light.svg) · [dark](docs/media/demo-flutter-dark.svg) |
| Expo SDK 57 app (Sentry, RevenueCat, Lottie)         | [light](docs/media/demo-expo-light.svg) · [dark](docs/media/demo-expo-dark.svg)       |

Measured on a Mac (Apple silicon, M5 Max) with Node.js 25.9 on 14 October 2026: a first run on the
native fixture (28 pods) made 112 requests and took 6.6 to 7.1 seconds; a second run answered from
the cache in 0.3 seconds. Network speed decides most of the first number.

To record them again: `npm run demo`.

## Status

| Feature                                                                   | Status        |
| ------------------------------------------------------------------------- | ------------- |
| Read `Podfile.lock`: pods, subspecs, dependency graph, source of each pod | works         |
| Latest version and release dates from CocoaPods trunk                     | works         |
| `Package.swift` on the default branch and at the locked tag               | works         |
| Publisher caps (Firebase 12.x) and their subdependencies                  | works         |
| Native, Flutter app, Flutter plugin, React Native and Expo detection      | works         |
| Terminal, Markdown and JSON reports; `--offline` cache replay             | works         |
| Name the npm or pub.dev package that brings each pod                      | planned (0.3) |
| Swift package product names and versions per pod, `plan` → MIGRATION.md   | planned (0.5) |
| SARIF output, `--fail-on`, GitHub Action                                  | planned (0.5) |
| Author mode: podspec → `Package.swift` starting point                     | planned (0.8) |
| Flutter `--fix`, static web page, stable JSON schema                      | planned (1.0) |

## Documentation

API reference and guides: [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/).

## Guides

- [What changes on December 2 (and what doesn't)](docs/guides/what-changes.md)
- [Native iOS: CocoaPods to Swift Package Manager](docs/guides/native-ios.md)
- [Flutter apps and plugins](docs/guides/flutter.md)
- [React Native and Expo](docs/guides/react-native-expo.md)
- [Firebase after version 12](docs/guides/firebase.md)
- [Pod authors: replacing `pod trunk push`](docs/guides/pod-authors.md)

## Requirements

| Toolchain | Minimum version |
| --------- | --------------- |
| Node.js   | 22.12           |

CI runs the tests on Node.js 22 and 24 (Linux). Locally they pass on Node.js 22.23, 24.22 and
25.9 on a Mac (Apple silicon).

## Architecture

```text
Podfile.lock ─► parseLockfile          pods, subspecs, dependency graph, source per pod
             ─► classifyLockfile       frozen-on-trunk | capped | not-affected | unknown
                  data/publisher-policy.json (sourced; Firebase 12.x)
             ─► analyzeLockfile        per trunk pod, through a Fetcher:
                  cdn.cocoapods.org    versions and podspec (GitHub repository and tag)
                  trunk.cocoapods.org  release dates
                  raw.githubusercontent.com  Package.swift at HEAD and at the locked tag
             ─► buildReport ─► render  tty | markdown | json
```

- `src/core/` is pure: parsing, version comparison, classification. No I/O.
- Everything from the network goes through a `Fetcher`. `CachedFetcher` stores one JSON file per
  request; the same files are the recorded answers that the tests and `--offline` replay.
- A missing answer is reported as `unknown` with the reason, never as an error.
- The CLI (`src/cli/`) only parses arguments, finds lockfiles and writes output.

## Roadmap

See the [Status](#status) table: 0.3 adds the npm and pub.dev package behind each pod, 0.5 the
migration plan, SARIF and a GitHub Action, 0.8 the author mode, 1.0 a stable JSON schema.
[CHANGELOG.md](CHANGELOG.md) lists what each release changed.

## FAQ

**Will my app stop building on December 2?** No. Both CocoaPods and Firebase say existing versions
stay installable. podexit is about updates you will not get, not builds that stop.

**Why is a pod "unknown"?** Its podspec points to a host other than GitHub (for example a binary
on dl.google.com), or the network was not available. The JSON and Markdown reports give the
reason per pod.

**Why are Flutter plugins and React Native modules "not affected"?** They are local path pods from
`.symlinks/plugins` or `node_modules`; they update with pub or npm. The SDKs they depend on are
listed separately, and those can be frozen.

**Does podexit change my project?** No. It reads `Podfile.lock` and writes only its cache and the
report you ask for.

## Contributing

Contributions are welcome: read [CONTRIBUTING.md](CONTRIBUTING.md) and the
[code of conduct](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) before
opening a pull request, and report security issues as described in [SECURITY.md](SECURITY.md).

## License

Released under the MIT license. See [LICENSE](LICENSE).
