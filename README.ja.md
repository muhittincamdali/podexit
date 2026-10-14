<!-- i18n-source: README.md@6b52e4ff2b2559a02d15a2812908fb01983dac2d status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="CI ステータス"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="最新バージョン: v0.1.1"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="言語バージョン: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="ライセンス: MIT"></picture></a>
</p>

<p align="center">
<a href="#クイックスタート"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ja-light.svg" alt="はじめる"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ja-light.svg" alt="ドキュメント"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ja-light.svg" alt="ガイド"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ja-light.svg" alt="サンプル"></picture></a>
</p>

> このドキュメントは英語版 README の翻訳です。内容が異なる場合は英語版が最新です。

<!-- brand:end -->

CocoaPods trunk は 2026年12月2日に読み取り専用になります。ビルドはそのまま動作しますが、trunk に公開されている pod には今後アップデートが提供されません。podexit は、依存関係のうちどれが凍結されるか、どれがすでに Swift パッケージを提供しているかを示し、ネイティブ iOS、Flutter、React Native/Expo それぞれの移行手順を案内します。すでにある `Podfile.lock` を読み取るだけで、プロジェクトには何もインストールしません。

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="ネイティブ iOS アプリで実行した podexit: Firebase の pod は 12.x に制限され、Alamofire、Kingfisher、SnapKit などは 12月2日以降に凍結され、それぞれに Swift パッケージがあることを示している"></picture>

<sub>実際の CLI で <a href="fixtures/native-app/Podfile">native-app fixture</a> を実行して録画しました。trunk と GitHub の応答は 2026年10月14日に保存したものです（<code>npm run demo</code>）。</sub>

## 主な特長

- **pod ごとに 2 つの答え**: アップデートが止まるかどうか（trunk で凍結、公開元によって早期に上限が設定、または影響なし）と、上流リポジトリに `Package.swift` があるかどうか。
- **バージョンを考慮**: ロックしているタグ時点の `Package.swift` も確認し、Swift パッケージが新しいバージョンにしかない場合はそのことを知らせます。
- **Firebase の上限を内蔵**: Firebase が挙げる 20 個の pod とその下位依存関係は 12.x に制限されます。根拠は Firebase のページを出典として示すデータファイルです。
- **ネイティブ、Flutter、React Native、Expo**: フォルダ直下と `ios/`、`macos/`、`example/ios/`、`example/macos/` から `Podfile.lock` を探し、プロジェクトの種類を判別して、対応するガイドへのリンクを表示します。
- **ターミナル、Markdown、JSON**: 自分で読むための表、pull request 用の Markdown、スクリプト用の JSON。
- **オフラインでも動作**: 応答は `~/.cache/podexit` に 24 時間キャッシュされ、`--offline` ではキャッシュだけを使います。

## クイックスタート

[Node.js](https://nodejs.org/) 22.12 以降が必要です（`node --version` で確認できます。Mac では `brew install node` でインストールできます）。ほかに必要なものはありません。

**1. アプリのフォルダでターミナルを開きます。** `Podfile` がある場所、`ios/` フォルダがある場所、または（Flutter プラグインの場合）`example/` フォルダがある場所です。

```sh
cd path/to/YourApp
```

**2. podexit を実行します。**

```sh
npx https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
```

podexit はまだ npm に公開されていないため（公開予定）、`npx podexit` は現時点では動きません。上のコマンドは GitHub から 0.1.1 リリースを実行します。この README で `npx podexit` と書かれている箇所では、このコマンドを使ってください。

**3. 表を読みます。** **capped** と表示された行が最初に止まります（Firebase は 2026年10月に CocoaPods への公開を終了します）。**frozen after Dec 2** と表示された行は、12月2日以降は新しいバージョンが出ません。Swift package 列が **yes** の pod は、今すぐ移行できます。最後の行には、お使いのプロジェクトの種類に合ったガイドへのリンクが表示されます。

## 12月2日に何が変わるか（変わらないこと）

[CocoaPods の告知](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)と [Firebase の移行ページ](https://firebase.google.com/docs/ios/cocoapods-deprecation)によると、次のとおりです。

1. **ビルドは動作し続けます。** Specs リポジトリと CDN はオンラインのままで、`pod install` は公開済みのすべてのバージョンを引き続き解決します。読み取り専用モードの試行は 2026年11月1日から7日に実施されます。
2. **trunk 上の pod** は、別の方法（多くは Swift パッケージ）で配布されない限り、2026年12月2日以降、セキュリティ修正を含めて新しいバージョンが出ません。
3. **Firebase 12 は CocoaPods での最後のメジャーバージョンです。** Firebase は 2026年10月にそこでの公開を終了します。12 以前のバージョンは引き続きインストールできます。

詳しくは[12月2日に何が変わるか](docs/guides/what-changes.md)をご覧ください。

## インストール

podexit はまだ npm に公開されていません（公開予定）。それまでは、上のように GitHub から 0.1.1 リリースを実行するか、プロジェクトに追加します。

```sh
npm install --save-dev https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
npx podexit
```

npm に公開されたら、`npx podexit` はインストールなしで最新バージョンをダウンロードして実行します。プロジェクトや CI でバージョンを固定するには、次のようにします。

```sh
npm install --save-dev podexit
npx podexit
```

または `npm install --global podexit` でグローバルにインストールすることもできます。`muhittincamdali/tap` 用の Homebrew formula はリリースワークフローが準備します（tap の最初のリリースと合わせて公開予定）。

## 使い方

```text
podexit [paths...] [options]
```

| オプション              | 動作                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------- |
| `paths`                 | `Podfile.lock` ファイルまたはプロジェクトのフォルダ。デフォルトはカレントフォルダ      |
| `-f, --format <format>` | `tty`（デフォルト）、`markdown`、`json`                                                |
| `-o, --output <file>`   | レポートをターミナルではなくファイルに書き出す                                         |
| `-a, --all`             | ローカルパス、git、プライベート spec の pod も表に表示する                             |
| `--offline`             | キャッシュした応答だけを使い、ネットワークには一切アクセスしない                       |
| `--refresh`             | キャッシュを無視して、ネットワークに問い合わせ直す                                     |
| `--cache-dir <dir>`     | キャッシュフォルダ（デフォルトは `$XDG_CACHE_HOME/podexit` または `~/.cache/podexit`） |
| `--no-color`            | ターミナルでもプレーンテキストにする（`NO_COLOR` と `FORCE_COLOR` に従う）             |
| `--concurrency <n>`     | pod の並列問い合わせ数。1 から 64（デフォルトは 8）                                    |

終了コード: `0` はレポートを書き出した場合、`2` は引数が不正、`Podfile.lock` が見つからない、または `Podfile.lock` ではないファイルを指定した場合、`1` はそれ以外の予期しないエラーです。podexit はレポートを出すだけで、検出結果を理由にビルドを失敗させることはありません。

パスを指定しない場合、podexit は `Podfile.lock`、`ios/Podfile.lock`、`macos/Podfile.lock`、`example/ios/Podfile.lock`、`example/macos/Podfile.lock` で見つかったロックファイルをすべて読み込みます。パスとして渡したフォルダも同じ方法で探します。

| 環境変数                   | 動作                                                                      |
| -------------------------- | ------------------------------------------------------------------------- |
| `PODEXIT_CACHE_DIR`        | `--cache-dir` を指定しないときのキャッシュフォルダ                        |
| `GITHUB_TOKEN`, `GH_TOKEN` | GitHub のホストにのみ送信されます。プライベートな上流リポジトリに必要です |
| `NO_COLOR`, `FORCE_COLOR`  | ターミナルの色をオフまたはオンにする                                      |

### Markdown レポートをコードと一緒に保存する

```sh
npx podexit --format markdown --output podexit.md
```

Markdown 版にも同じ表、リリース日、各 Swift パッケージのリポジトリへのリンクが含まれます。ローカルパスや git の pod は `<details>` ブロックにまとめられます。

### JSON レポートをスクリプトで使う

```sh
npx podexit --format json > podexit.json
```

各 pod には、`updates.status`、`swiftPackage.status`、trunk 上の最新バージョンとその日付、そして各答えを説明する一文が含まれます。レイアウトは `schemaVersion` 0 で、1.0 より前に変更される可能性があります。[examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) は `jq` でこれを絞り込みます。

### CI で実行する

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml) は、`Podfile.lock` を変更するすべての pull request のジョブサマリーにレポートを追加します。

### レート制限とプライベートリポジトリ

podexit は raw.githubusercontent.com 経由で `Package.swift` を読み取るため、GitHub API のクォータは消費しません。プライベートな上流リポジトリを調べるには `GITHUB_TOKEN`（または `GH_TOKEN`）を設定します。トークンは GitHub のホストにのみ送信されます。

### JavaScript から使う

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

実行できるサンプルは [examples/api/summary.mjs](examples/api/summary.mjs) です。

## デモ

3 つの録画は [fixtures](fixtures/README.md) から作成したものです。それぞれのツールチェーンで作成し、CocoaPods 1.16.2 で解決した実際のプロジェクトを、2026年10月14日に保存した応答で再生しています。

| プロジェクト                                                 | 録画                                                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| ネイティブ iOS アプリ（Firebase、Alamofire、Google Sign-In） | このページの冒頭                                                                         |
| Flutter アプリ（FlutterFire、google_sign_in など）           | [ライト](docs/media/demo-flutter-light.svg) · [ダーク](docs/media/demo-flutter-dark.svg) |
| Expo SDK 57 アプリ（Sentry、RevenueCat、Lottie）             | [ライト](docs/media/demo-expo-light.svg) · [ダーク](docs/media/demo-expo-dark.svg)       |

計測環境は Mac（Apple silicon、M5 Max）、Node.js 25.9、2026年10月14日です。ネイティブ fixture（28 個の pod）での初回実行は 112 件のリクエストを送り、6.6 から 7.1 秒かかりました。2 回目はキャッシュから 0.3 秒で応答しました。初回の時間はほとんどがネットワーク速度で決まります。

録画をやり直すには `npm run demo` を実行します。

## ステータス

| 機能                                                                         | ステータス    |
| ---------------------------------------------------------------------------- | ------------- |
| `Podfile.lock` の読み取り: pod、subspec、依存グラフ、各 pod の取得元         | 動作          |
| CocoaPods trunk からの最新バージョンとリリース日                             | 動作          |
| デフォルトブランチおよびロックしたタグ時点の `Package.swift`                 | 動作          |
| 公開元による上限（Firebase 12.x）とその下位依存関係                          | 動作          |
| ネイティブ、Flutter アプリ、Flutter プラグイン、React Native、Expo の判別    | 動作          |
| ターミナル、Markdown、JSON のレポート。`--offline` でのキャッシュ再生        | 動作          |
| 各 pod の元になっている npm または pub.dev パッケージの特定                  | 計画中（0.3） |
| pod ごとの Swift パッケージのプロダクト名とバージョン、`plan` → MIGRATION.md | 計画中（0.5） |
| SARIF 出力、`--fail-on`、GitHub Action                                       | 計画中（0.5） |
| 作者モード: podspec → `Package.swift` の出発点                               | 計画中（0.8） |
| Flutter の `--fix`、静的 Web ページ、安定した JSON スキーマ                  | 計画中（1.0） |

## ドキュメント

API リファレンスとガイド: [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/)。

## ガイド

- [12月2日に何が変わるか（変わらないこと）](docs/guides/what-changes.md)
- [ネイティブ iOS: CocoaPods から Swift Package Manager へ](docs/guides/native-ios.md)
- [Flutter アプリとプラグイン](docs/guides/flutter.md)
- [React Native と Expo](docs/guides/react-native-expo.md)
- [Firebase 12 以降](docs/guides/firebase.md)
- [pod の作者向け: `pod trunk push` に代わる方法](docs/guides/pod-authors.md)

## 動作要件

| ツールチェーン | 最小バージョン |
| -------------- | -------------- |
| Node.js        | 22.12          |

CI では Node.js 22 と 24（Linux）でテストを実行しています。ローカルでは、Mac（Apple silicon）上の Node.js 22.23、24.22、25.9 でテストが通ります。

## アーキテクチャ

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

- `src/core/` は純粋です。解析、バージョン比較、分類を行い、I/O はありません。
- ネットワークからの取得はすべて `Fetcher` を経由します。`CachedFetcher` はリクエストごとに 1 つの JSON ファイルを保存します。同じファイルが、テストと `--offline` が再生する記録済みの応答です。
- 応答が得られなかった場合は、エラーではなく理由付きの `unknown` として報告します。
- CLI（`src/cli/`）は、引数の解析、lockfile の検出、出力の書き込みだけを行います。

## ロードマップ

[ステータス](#ステータス)の表をご覧ください。0.3 では各 pod の元になっている npm と pub.dev のパッケージ、0.5 では移行プランと SARIF と GitHub Action、0.8 では作者モード、1.0 では安定した JSON スキーマが加わります。各リリースの変更内容は [CHANGELOG.md](CHANGELOG.md) にまとめています。

## FAQ

**12月2日にアプリのビルドが通らなくなりますか？** いいえ。CocoaPods も Firebase も、既存のバージョンはインストールできるままだと説明しています。podexit が扱うのは、受け取れなくなるアップデートであり、止まってしまうビルドではありません。

**なぜ「unknown」になる pod があるのですか？** その podspec が GitHub 以外のホスト（たとえば dl.google.com 上のバイナリ）を指しているか、ネットワークが利用できなかったためです。JSON と Markdown のレポートには、pod ごとの理由が記載されます。

**なぜ Flutter プラグインや React Native モジュールは「not affected」なのですか？** これらは `.symlinks/plugins` または `node_modules` にあるローカルパスの pod で、pub や npm 経由で更新されます。それらが依存する SDK は別に一覧表示され、そちらは凍結される場合があります。

**podexit はプロジェクトを変更しますか？** いいえ。`Podfile.lock` を読み取り、書き込むのは自身のキャッシュと、指定したレポートだけです。

## コントリビューション

コントリビューションを歓迎します。pull request を作成する前に、[CONTRIBUTING.md](CONTRIBUTING.md) と[行動規範](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md)をお読みください。セキュリティ上の問題は、[SECURITY.md](SECURITY.md) の手順に従って報告してください。

## ライセンス

MIT ライセンスで公開しています。詳細は [LICENSE](LICENSE) を参照してください。
