<!-- i18n-source: README.md@1b2eb6ac7a8d531e4b41be202de9c8bb6915a625 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="CI-Status"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="Aktuelle Version: v0.1.2"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="Sprachversion: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="Lizenz: MIT"></picture></a>
</p>

<p align="center">
<a href="#schnellstart"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-de-light.svg" alt="Loslegen"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-de-light.svg" alt="Dokumentation"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-de-light.svg" alt="Anleitungen"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-de-light.svg" alt="Beispiele"></picture></a>
</p>

> Dies ist eine Übersetzung der englischen README. Bei Abweichungen gilt die englische Fassung.

<!-- brand:end -->

CocoaPods trunk wird am 2. Dezember 2026 schreibgeschützt. Deine Builds laufen weiter, aber dort veröffentlichte Pods bekommen nie wieder ein Update. podexit zeigt dir, welche deiner Abhängigkeiten eingefroren sind, welche bereits ein Swift-Package anbieten und wie der Migrationsweg für natives iOS, Flutter und React Native/Expo aussieht. Es liest das `Podfile.lock`, das du ohnehin hast; in dein Projekt wird nichts installiert.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="podexit auf einer nativen iOS-App: Firebase-Pods auf 12.x begrenzt; Alamofire, Kingfisher, SnapKit und andere ab dem 2. Dezember eingefroren, jeweils mit einem Swift-Package"></picture>

<sub>Aufgezeichnet mit der echten CLI am <a href="fixtures/native-app/Podfile">native-app-Fixture</a>, mit den am 14. Oktober 2026 gespeicherten Antworten von trunk und GitHub (<code>npm run demo</code>).</sub>

## Highlights

- **Zwei Antworten pro Pod**: ob er keine Updates mehr bekommt (auf trunk eingefroren, vom Herausgeber früh begrenzt oder nicht betroffen) und ob sein Upstream-Repository ein `Package.swift` hat.
- **Versionsbewusst**: Prüft auch das `Package.swift` am gesperrten Tag und weist darauf hin, wenn das Swift-Package erst in neueren Versionen existiert.
- **Firebase-Obergrenze eingebaut**: Die 20 von Firebase aufgeführten Pods sind samt ihren Subabhängigkeiten auf 12.x begrenzt, belegt durch eine Datendatei mit Quellenangabe, die die Firebase-Seite zitiert.
- **Nativ, Flutter, React Native und Expo**: Findet `Podfile.lock` im Ordner selbst oder in `ios/`, `macos/`, `example/ios/` oder `example/macos/`, erkennt die Projektart und verlinkt die passende Anleitung.
- **Terminal, Markdown oder JSON**: eine Tabelle für dich, Markdown für einen Pull Request, JSON für Skripte.
- **Funktioniert offline**: Antworten werden 24 Stunden in `~/.cache/podexit` zwischengespeichert; `--offline` nutzt nur den Cache.

## Schnellstart

Du brauchst [Node.js](https://nodejs.org/) 22.12 oder neuer (`node --version` zeigt die Version an; auf dem Mac installiert `brew install node` es). Sonst nichts.

**1. Öffne ein Terminal im Ordner deiner App**, in dem das `Podfile`, der Ordner `ios/` oder (bei einem Flutter-Plugin) der Ordner `example/` liegt:

```sh
cd path/to/YourApp
```

**2. Starte podexit:**

```sh
npx @mcamdali/podexit
```

Das npm-Paket heißt `@mcamdali/podexit` (npm hat den Namen ohne Scope abgelehnt); der Befehl, den es installiert, heißt weiterhin `podexit`.

**3. Lies die Tabelle.** Zeilen mit **capped** hören zuerst auf (Firebase veröffentlicht ab Oktober 2026 nicht mehr auf CocoaPods); Zeilen mit **frozen after Dec 2** bekommen nach dem 2. Dezember keine neuen Versionen. Wo die Spalte Swift package **yes** zeigt, lässt sich der Pod schon jetzt umstellen. Die letzte Zeile verlinkt die Anleitung für deine Projektart.

## Was sich am 2. Dezember ändert (und was nicht)

Laut der [CocoaPods-Ankündigung](https://blog.cocoapods.org/CocoaPods-Specs-Repo/) und der [Firebase-Migrationsseite](https://firebase.google.com/docs/ios/cocoapods-deprecation):

1. **Builds laufen weiter.** Das Specs-Repository und das CDN bleiben online; `pod install` löst weiterhin jede bereits veröffentlichte Version auf. Ein Testlauf des Schreibschutzes findet vom 1. bis 7. November 2026 statt.
2. **Pods auf trunk bekommen nach dem 2. Dezember 2026 keine neuen Versionen mehr**, auch keine Sicherheitskorrekturen, es sei denn, sie werden anders ausgeliefert (meist als Swift-Package).
3. **Firebase 12 ist die letzte Hauptversion auf CocoaPods**, und Firebase veröffentlicht dort ab Oktober 2026 nicht mehr. Die Versionen 12 und früher bleiben installierbar.

Mehr dazu in [Was sich am 2. Dezember ändert](docs/guides/what-changes.md).

## Installation

Führe es ohne Installation aus oder füge es einem Projekt hinzu, um die Version festzulegen:

```sh
npm install --save-dev @mcamdali/podexit
npx @mcamdali/podexit
```

So installierst du den Befehl global:

```sh
npm i -g @mcamdali/podexit
podexit
```

Mit Homebrew genügt `brew install muhittincamdali/tap/podexit`; das installiert das Release-Tarball von GitHub.

## Verwendung

```text
podexit [paths...] [options]
```

| Option                  | Was sie macht                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `paths`                 | `Podfile.lock`-Dateien oder Projektordner; Standard ist der aktuelle Ordner        |
| `-f, --format <format>` | `tty` (Standard), `markdown` oder `json`                                           |
| `-o, --output <file>`   | Schreibt den Bericht in eine Datei statt ins Terminal                              |
| `-a, --all`             | Listet in der Tabelle auch Pods aus lokalen Pfaden, git und privaten Specs auf     |
| `--offline`             | Nutzt nur Antworten aus dem Cache; greift nie aufs Netzwerk zu                     |
| `--refresh`             | Ignoriert den Cache und fragt das Netzwerk erneut                                  |
| `--cache-dir <dir>`     | Cache-Ordner (Standard `$XDG_CACHE_HOME/podexit` oder `~/.cache/podexit`)          |
| `--no-color`            | Reiner Text, auch in einem Terminal (`NO_COLOR` und `FORCE_COLOR` werden beachtet) |
| `--concurrency <n>`     | Parallele Pod-Abfragen, 1 bis 64 (Standard 8)                                      |

Exit-Codes: `0` Bericht geschrieben, `2` ungültige Argumente, kein `Podfile.lock` gefunden oder eine Datei, die keines ist, `1` alles Unerwartete. podexit berichtet; es lässt keinen Build wegen seiner Funde fehlschlagen.

Ohne Pfade liest podexit jede Lockfile, die es unter `Podfile.lock`, `ios/Podfile.lock`, `macos/Podfile.lock`, `example/ios/Podfile.lock` und `example/macos/Podfile.lock` findet; ein als Pfad übergebener Ordner wird genauso durchsucht.

| Umgebungsvariable          | Was sie macht                                                              |
| -------------------------- | -------------------------------------------------------------------------- |
| `PODEXIT_CACHE_DIR`        | Cache-Ordner, wenn `--cache-dir` fehlt                                     |
| `GITHUB_TOKEN`, `GH_TOKEN` | Wird nur an GitHub-Hosts gesendet; nötig für private Upstream-Repositories |
| `NO_COLOR`, `FORCE_COLOR`  | Schaltet Terminalfarben aus oder ein                                       |

### Einen Markdown-Bericht beim Code aufbewahren

```sh
npx @mcamdali/podexit --format markdown --output podexit.md
```

Die Markdown-Version enthält dieselben Tabellen, Veröffentlichungsdaten und Links zum Repository jedes Swift-Packages; Pods aus lokalen Pfaden und git werden in einem `<details>`-Block zusammengefasst.

### Den JSON-Bericht in Skripten verwenden

```sh
npx @mcamdali/podexit --format json > podexit.json
```

Jeder Pod enthält `updates.status`, `swiftPackage.status`, die neueste Version auf trunk mit Datum und einen Satz, der jede Antwort erklärt. Das Layout ist `schemaVersion` 0 und kann sich vor 1.0 ändern. [examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) filtert ihn mit `jq`.

### In CI ausführen

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml) fügt den Bericht der Job-Zusammenfassung jedes Pull Requests hinzu, der ein `Podfile.lock` ändert.

### Rate Limits und private Repositories

podexit liest `Package.swift` über raw.githubusercontent.com, das nicht auf das Kontingent der GitHub-API angerechnet wird. Setze `GITHUB_TOKEN` (oder `GH_TOKEN`), um private Upstream-Repositories einzusehen; das Token wird nur an GitHub-Hosts gesendet.

### Aus JavaScript

```js
import {
  analyzeLockfile,
  buildReport,
  CachedFetcher,
  HttpFetcher,
  loadPublisherPolicy,
  render,
} from '@mcamdali/podexit';

const policy = loadPublisherPolicy();
const fetcher = new CachedFetcher(new HttpFetcher({ userAgent: 'my-tool' }), {
  directory: '.cache',
});
const lockfile = await analyzeLockfile(text, 'ios/Podfile.lock', { fetcher, policy });
console.log(render(buildReport([lockfile], { policy, offline: false }), 'markdown'));
```

Eine lauffähige Version ist [examples/api/summary.mjs](examples/api/summary.mjs).

## Demo

Die drei Aufnahmen stammen aus den [Fixtures](fixtures/README.md): echte Projekte, mit der jeweiligen Toolchain erstellt und mit CocoaPods 1.16.2 aufgelöst, abgespielt mit den am 14. Oktober 2026 gespeicherten Antworten.

| Projekt                                              | Aufnahme                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Native iOS-App (Firebase, Alamofire, Google Sign-In) | oben auf dieser Seite                                                                  |
| Flutter-App (FlutterFire, google_sign_in, …)         | [hell](docs/media/demo-flutter-light.svg) · [dunkel](docs/media/demo-flutter-dark.svg) |
| Expo-SDK-57-App (Sentry, RevenueCat, Lottie)         | [hell](docs/media/demo-expo-light.svg) · [dunkel](docs/media/demo-expo-dark.svg)       |

Gemessen auf einem Mac (Apple silicon, M5 Max) mit Node.js 25.9 am 14. Oktober 2026: Ein erster Lauf auf dem nativen Fixture (28 Pods) machte 112 Anfragen und dauerte 6,6 bis 7,1 Sekunden; ein zweiter Lauf antwortete in 0,3 Sekunden aus dem Cache. Die Netzwerkgeschwindigkeit bestimmt den größten Teil der ersten Zahl.

Zum erneuten Aufzeichnen: `npm run demo`.

## Status

| Funktion                                                                     | Status        |
| ---------------------------------------------------------------------------- | ------------- |
| `Podfile.lock` lesen: Pods, Subspecs, Abhängigkeitsgraph, Quelle jedes Pods  | funktioniert  |
| Neueste Version und Veröffentlichungsdaten von CocoaPods trunk               | funktioniert  |
| `Package.swift` im Standard-Branch und am gesperrten Tag                     | funktioniert  |
| Herausgeber-Obergrenzen (Firebase 12.x) und ihre Subabhängigkeiten           | funktioniert  |
| Erkennung von nativ, Flutter-App, Flutter-Plugin, React Native und Expo      | funktioniert  |
| Berichte für Terminal, Markdown und JSON; `--offline`-Cache-Wiedergabe       | funktioniert  |
| Das npm- oder pub.dev-Paket nennen, das jeden Pod mitbringt                  | geplant (0.3) |
| Produktnamen und Versionen des Swift-Packages pro Pod, `plan` → MIGRATION.md | geplant (0.5) |
| SARIF-Ausgabe, `--fail-on`, GitHub Action                                    | geplant (0.5) |
| Autorenmodus: podspec → Ausgangspunkt für `Package.swift`                    | geplant (0.8) |
| Flutter-`--fix`, statische Webseite, stabiles JSON-Schema                    | geplant (1.0) |

## Dokumentation

API-Referenz und Anleitungen: [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/).

## Anleitungen

- [Was sich am 2. Dezember ändert (und was nicht)](docs/guides/what-changes.md)
- [Natives iOS: von CocoaPods zu Swift Package Manager](docs/guides/native-ios.md)
- [Flutter-Apps und -Plugins](docs/guides/flutter.md)
- [React Native und Expo](docs/guides/react-native-expo.md)
- [Firebase nach Version 12](docs/guides/firebase.md)
- [Pod-Autoren: Ersatz für `pod trunk push`](docs/guides/pod-authors.md)

## Voraussetzungen

| Toolchain | Mindestversion |
| --------- | -------------- |
| Node.js   | 22.12          |

CI führt die Tests auf Node.js 22 und 24 (Linux) aus. Lokal laufen sie mit Node.js 22.23, 24.22 und 25.9 auf einem Mac (Apple silicon) durch.

## Architektur

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

- `src/core/` ist rein: Parsen, Versionsvergleich, Klassifizierung. Keine E/A.
- Alles aus dem Netzwerk läuft über einen `Fetcher`. `CachedFetcher` speichert pro Anfrage eine JSON-Datei; dieselben Dateien sind die aufgezeichneten Antworten, die die Tests und `--offline` abspielen.
- Eine fehlende Antwort wird mit Begründung als `unknown` gemeldet, nie als Fehler.
- Die CLI (`src/cli/`) parst nur Argumente, findet Lockfiles und schreibt die Ausgabe.

## Roadmap

Siehe die Tabelle unter [Status](#status): 0.3 ergänzt das npm- und pub.dev-Paket hinter jedem Pod, 0.5 den Migrationsplan, SARIF und eine GitHub Action, 0.8 den Autorenmodus, 1.0 ein stabiles JSON-Schema. [CHANGELOG.md](CHANGELOG.md) listet auf, was jedes Release geändert hat.

## FAQ

**Baut meine App am 2. Dezember nicht mehr?** Doch, sie baut weiter. Sowohl CocoaPods als auch Firebase sagen, dass bestehende Versionen installierbar bleiben. Bei podexit geht es um Updates, die du nicht bekommen wirst, nicht um Builds, die aufhören.

**Warum ist ein Pod „unknown“?** Sein Podspec verweist auf einen anderen Host als GitHub (zum Beispiel ein Binary auf dl.google.com), oder das Netzwerk war nicht erreichbar. Die JSON- und Markdown-Berichte nennen den Grund pro Pod.

**Warum sind Flutter-Plugins und React-Native-Module „not affected"?** Sie sind Pods mit lokalem Pfad aus `.symlinks/plugins` oder `node_modules` und werden über pub oder npm aktualisiert. Die SDKs, von denen sie abhängen, werden separat aufgelistet, und die können eingefroren sein.

**Verändert podexit mein Projekt?** Nein. Es liest `Podfile.lock` und schreibt nur seinen Cache und den Bericht, den du anforderst.

## Mitwirken

Beiträge sind willkommen. Lies vor einem Pull Request [CONTRIBUTING.md](CONTRIBUTING.md) und den [Verhaltenskodex](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md). Sicherheitsprobleme meldest du so, wie es in [SECURITY.md](SECURITY.md) beschrieben ist.

## Lizenz

Veröffentlicht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE).
