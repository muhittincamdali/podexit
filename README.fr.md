<!-- i18n-source: README.md@6b52e4ff2b2559a02d15a2812908fb01983dac2d status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="État de la CI"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="Dernière version: v0.1.1"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="Version du langage: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="Licence: MIT"></picture></a>
</p>

<p align="center">
<a href="#démarrage-rapide"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-fr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-fr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-fr-light.svg" alt="Commencer"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-fr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-fr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-fr-light.svg" alt="Documentation"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-fr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-fr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-fr-light.svg" alt="Guides"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-fr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-fr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-fr-light.svg" alt="Exemples"></picture></a>
</p>

> Ceci est une traduction du README anglais. En cas de différence, la version anglaise fait foi.

<!-- brand:end -->

CocoaPods trunk passera en lecture seule le 2 décembre 2026. Vos builds continueront de fonctionner, mais les pods publiés sur trunk ne recevront plus jamais de mise à jour. podexit vous montre lesquelles de vos dépendances sont figées, lesquelles proposent déjà un paquet Swift, et le chemin de migration pour iOS natif, Flutter et React Native/Expo. Il lit le `Podfile.lock` que vous avez déjà ; rien n’est installé dans votre projet.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="podexit exécuté sur une application iOS native : pods Firebase plafonnés à 12.x ; Alamofire, Kingfisher, SnapKit et d’autres figés après le 2 décembre, chacun avec un paquet Swift"></picture>

<sub>Enregistré avec la vraie CLI sur le <a href="fixtures/native-app/Podfile">fixture native-app</a>, avec les réponses de trunk et de GitHub sauvegardées le 14 octobre 2026 (<code>npm run demo</code>).</sub>

## Points forts

- **Deux réponses par pod** : s’il cesse de recevoir des mises à jour (figé sur trunk, plafonné plus tôt par son éditeur, ou non concerné) et si son dépôt amont contient un `Package.swift`.
- **Attentif aux versions** : vérifie aussi le `Package.swift` au tag que vous avez verrouillé et signale quand le paquet Swift n’existe que dans des versions plus récentes.
- **Plafond Firebase intégré** : les 20 pods listés par Firebase sont plafonnés à 12.x, ainsi que leurs sous-dépendances, à partir d’un fichier de données sourcé qui cite la page de Firebase.
- **Natif, Flutter, React Native et Expo** : trouve `Podfile.lock` dans le dossier ou dans `ios/`, `macos/`, `example/ios/` ou `example/macos/`, reconnaît le type de projet et renvoie vers le guide correspondant.
- **Terminal, Markdown ou JSON** : un tableau pour vous, du Markdown pour une pull request, du JSON pour les scripts.
- **Fonctionne hors ligne** : les réponses sont mises en cache 24 heures dans `~/.cache/podexit` ; `--offline` n’utilise que le cache.

## Démarrage rapide

Il vous faut [Node.js](https://nodejs.org/) 22.12 ou plus récent (`node --version` affiche la version ; sur un Mac, `brew install node` l’installe). Rien d’autre.

**1. Ouvrez un terminal dans le dossier de votre application**, celui qui contient le `Podfile`, le dossier `ios/` ou (pour un plugin Flutter) le dossier `example/` :

```sh
cd path/to/YourApp
```

**2. Lancez podexit :**

```sh
npx https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
```

podexit n’est pas encore sur npm (sa publication est prévue), donc `npx podexit` ne fonctionne pas encore. La commande ci-dessus exécute la version 0.1.1 depuis GitHub ; utilisez-la partout où ce README indique `npx podexit`.

**3. Lisez le tableau.** Les lignes marquées **capped** s’arrêtent en premier (Firebase cesse de publier sur CocoaPods en octobre 2026) ; celles marquées **frozen after Dec 2** ne reçoivent plus de nouvelles versions après le 2 décembre. Quand la colonne Swift package indique **yes**, le pod peut être migré dès maintenant. La dernière ligne renvoie vers le guide correspondant à votre type de projet.

## Ce qui change le 2 décembre (et ce qui ne change pas)

D’après l'[annonce de CocoaPods](https://blog.cocoapods.org/CocoaPods-Specs-Repo/) et la [page de migration de Firebase](https://firebase.google.com/docs/ios/cocoapods-deprecation) :

1. **Les builds continuent de fonctionner.** Le dépôt Specs et le CDN restent en ligne ; `pod install` continue de résoudre toutes les versions déjà publiées. Un essai du mode lecture seule a lieu du 1er au 7 novembre 2026.
2. **Les pods sur trunk ne reçoivent plus de nouvelles versions** après le 2 décembre 2026, correctifs de sécurité compris, sauf s’ils sont distribués autrement (le plus souvent sous forme de paquet Swift).
3. **Firebase 12 est la dernière version majeure sur CocoaPods**, et Firebase cesse d’y publier en octobre 2026. Les versions 12 et antérieures restent installables.

Pour en savoir plus, lisez [Ce qui change le 2 décembre](docs/guides/what-changes.md).

## Installation

podexit n’est pas encore sur npm ; sa publication y est prévue. En attendant, exécutez la version 0.1.1 depuis GitHub comme ci-dessus, ou ajoutez-la à un projet :

```sh
npm install --save-dev https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
npx podexit
```

Une fois podexit sur npm, `npx podexit` téléchargera et exécutera la dernière version sans rien installer. Pour figer une version dans un projet ou en CI :

```sh
npm install --save-dev podexit
npx podexit
```

ou installez-le globalement avec `npm install --global podexit`. Le workflow de publication prépare une formule Homebrew pour `muhittincamdali/tap` (prévue avec la première version du tap).

## Utilisation

```text
podexit [paths...] [options]
```

| Option                  | Effet                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `paths`                 | Fichiers `Podfile.lock` ou dossiers de projet ; par défaut, le dossier courant          |
| `-f, --format <format>` | `tty` (par défaut), `markdown` ou `json`                                                |
| `-o, --output <file>`   | Écrit le rapport dans un fichier au lieu du terminal                                    |
| `-a, --all`             | Liste aussi dans le tableau les pods issus de chemins locaux, de git et de specs privés |
| `--offline`             | N’utilise que les réponses en cache ; ne touche jamais au réseau                        |
| `--refresh`             | Ignore le cache et interroge de nouveau le réseau                                       |
| `--cache-dir <dir>`     | Dossier de cache (par défaut `$XDG_CACHE_HOME/podexit` ou `~/.cache/podexit`)           |
| `--no-color`            | Texte brut même dans un terminal (`NO_COLOR` et `FORCE_COLOR` sont respectés)           |
| `--concurrency <n>`     | Requêtes de pods en parallèle, de 1 à 64 (par défaut 8)                                 |

Codes de sortie : `0` rapport écrit, `2` arguments invalides, aucun `Podfile.lock` trouvé ou fichier qui n’en est pas un, `1` tout le reste. podexit rapporte ; il ne fait pas échouer un build à cause de ce qu’il trouve.

Sans chemin, podexit lit chaque lockfile trouvé parmi `Podfile.lock`, `ios/Podfile.lock`, `macos/Podfile.lock`, `example/ios/Podfile.lock` et `example/macos/Podfile.lock` ; un dossier passé comme chemin est parcouru de la même façon.

| Variable d’environnement   | Effet                                                                        |
| -------------------------- | ---------------------------------------------------------------------------- |
| `PODEXIT_CACHE_DIR`        | Dossier de cache quand `--cache-dir` n’est pas indiqué                       |
| `GITHUB_TOKEN`, `GH_TOKEN` | Envoyé uniquement aux hôtes GitHub ; nécessaire pour les dépôts amont privés |
| `NO_COLOR`, `FORCE_COLOR`  | Désactive ou active les couleurs du terminal                                 |

### Conserver un rapport Markdown avec le code

```sh
npx podexit --format markdown --output podexit.md
```

La version Markdown contient les mêmes tableaux, les dates de publication et les liens vers le dépôt de chaque paquet Swift ; les pods issus de chemins locaux et de git sont regroupés dans un bloc `<details>`.

### Utiliser le rapport JSON dans des scripts

```sh
npx podexit --format json > podexit.json
```

Chaque pod porte `updates.status`, `swiftPackage.status`, la dernière version sur trunk avec sa date, et une phrase qui explique chaque réponse. La structure est `schemaVersion` 0 et peut changer avant la 1.0. [examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) la filtre avec `jq`.

### L’exécuter en CI

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml) ajoute le rapport au résumé du job de chaque pull request qui modifie un `Podfile.lock`.

### Limites de débit et dépôts privés

podexit lit `Package.swift` via raw.githubusercontent.com, qui ne consomme pas le quota de l’API GitHub. Définissez `GITHUB_TOKEN` (ou `GH_TOKEN`) pour consulter des dépôts amont privés ; le jeton n’est envoyé qu’aux hôtes GitHub.

### Depuis JavaScript

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

Une version exécutable se trouve dans [examples/api/summary.mjs](examples/api/summary.mjs).

## Démo

Les trois enregistrements proviennent des [fixtures](fixtures/README.md) : de vrais projets créés avec chaque toolchain et résolus par CocoaPods 1.16.2, rejoués avec les réponses sauvegardées le 14 octobre 2026.

| Projet                                                       | Enregistrement                                                                          |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Application iOS native (Firebase, Alamofire, Google Sign-In) | en haut de cette page                                                                   |
| Application Flutter (FlutterFire, google_sign_in, …)         | [clair](docs/media/demo-flutter-light.svg) · [sombre](docs/media/demo-flutter-dark.svg) |
| Application Expo SDK 57 (Sentry, RevenueCat, Lottie)         | [clair](docs/media/demo-expo-light.svg) · [sombre](docs/media/demo-expo-dark.svg)       |

Mesuré sur un Mac (Apple silicon, M5 Max) avec Node.js 25.9 le 14 octobre 2026 : une première exécution sur le fixture natif (28 pods) a envoyé 112 requêtes et pris de 6,6 à 7,1 secondes ; une seconde exécution a répondu depuis le cache en 0,3 seconde. La vitesse du réseau détermine l’essentiel du premier chiffre.

Pour les enregistrer de nouveau : `npm run demo`.

## État

| Fonctionnalité                                                                          | État        |
| --------------------------------------------------------------------------------------- | ----------- |
| Lecture de `Podfile.lock` : pods, subspecs, graphe de dépendances, source de chaque pod | fonctionne  |
| Dernière version et dates de publication depuis CocoaPods trunk                         | fonctionne  |
| `Package.swift` sur la branche par défaut et au tag verrouillé                          | fonctionne  |
| Plafonds des éditeurs (Firebase 12.x) et leurs sous-dépendances                         | fonctionne  |
| Détection de natif, application Flutter, plugin Flutter, React Native et Expo           | fonctionne  |
| Rapports terminal, Markdown et JSON ; rejeu du cache avec `--offline`                   | fonctionne  |
| Nommer le paquet npm ou pub.dev qui apporte chaque pod                                  | prévu (0.3) |
| Noms de produits et versions du paquet Swift par pod, `plan` → MIGRATION.md             | prévu (0.5) |
| Sortie SARIF, `--fail-on`, GitHub Action                                                | prévu (0.5) |
| Mode auteur : podspec → point de départ de `Package.swift`                              | prévu (0.8) |
| `--fix` pour Flutter, page web statique, schéma JSON stable                             | prévu (1.0) |

## Documentation

Référence de l’API et guides : [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/).

## Guides

- [Ce qui change le 2 décembre (et ce qui ne change pas)](docs/guides/what-changes.md)
- [iOS natif : de CocoaPods à Swift Package Manager](docs/guides/native-ios.md)
- [Applications et plugins Flutter](docs/guides/flutter.md)
- [React Native et Expo](docs/guides/react-native-expo.md)
- [Firebase après la version 12](docs/guides/firebase.md)
- [Auteurs de pods : remplacer `pod trunk push`](docs/guides/pod-authors.md)

## Prérequis

| Toolchain | Version minimale |
| --------- | ---------------- |
| Node.js   | 22.12            |

La CI exécute les tests sur Node.js 22 et 24 (Linux). En local, ils passent sur Node.js 22.23, 24.22 et 25.9, sur un Mac (Apple silicon).

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

- `src/core/` est pur : analyse, comparaison de versions, classification. Aucune E/S.
- Tout ce qui vient du réseau passe par un `Fetcher`. `CachedFetcher` stocke un fichier JSON par requête ; ces mêmes fichiers sont les réponses enregistrées que rejouent les tests et `--offline`.
- Une réponse manquante est signalée comme `unknown`, avec la raison, jamais comme une erreur.
- La CLI (`src/cli/`) ne fait qu’analyser les arguments, trouver les lockfiles et écrire la sortie.

## Feuille de route

Voir le tableau [État](#état) : la 0.3 ajoute le paquet npm et pub.dev derrière chaque pod, la 0.5 le plan de migration, SARIF et une GitHub Action, la 0.8 le mode auteur, la 1.0 un schéma JSON stable. [CHANGELOG.md](CHANGELOG.md) liste ce que chaque version a changé.

## FAQ

**Mon application cessera-t-elle de compiler le 2 décembre ?** Non. CocoaPods comme Firebase indiquent que les versions existantes restent installables. podexit s’intéresse aux mises à jour que vous ne recevrez pas, pas aux builds qui s’arrêteraient.

**Pourquoi un pod est-il « unknown » ?** Son podspec pointe vers un hôte autre que GitHub (par exemple un binaire sur dl.google.com), ou le réseau n’était pas disponible. Les rapports JSON et Markdown donnent la raison pour chaque pod.

**Pourquoi les plugins Flutter et les modules React Native sont-ils « not affected » ?** Ce sont des pods à chemin local issus de `.symlinks/plugins` ou de `node_modules` ; ils se mettent à jour avec pub ou npm. Les SDK dont ils dépendent sont listés séparément, et ceux-là peuvent être figés.

**podexit modifie-t-il mon projet ?** Non. Il lit `Podfile.lock` et n’écrit que son cache et le rapport que vous demandez.

## Contribuer

Les contributions sont les bienvenues. Lisez [CONTRIBUTING.md](CONTRIBUTING.md) et le [code de conduite](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) avant d’ouvrir une pull request. Signalez les problèmes de sécurité comme indiqué dans [SECURITY.md](SECURITY.md).

## Licence

Publié sous licence MIT. Voir [LICENSE](LICENSE).
