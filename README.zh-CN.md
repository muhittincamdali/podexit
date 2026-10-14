<!-- i18n-source: README.md@6b52e4ff2b2559a02d15a2812908fb01983dac2d status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="CI 状态"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="最新版本: v0.1.1"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="语言版本: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="许可证: MIT"></picture></a>
</p>

<p align="center">
<a href="#快速开始"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-zh-CN-light.svg" alt="开始使用"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-zh-CN-light.svg" alt="文档"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-zh-CN-light.svg" alt="指南"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-zh-CN-light.svg" alt="示例"></picture></a>
</p>

> 本文是英文 README 的译文。如两者内容不一致，以英文版为准。

<!-- brand:end -->

CocoaPods trunk 将于 2026 年 12 月 2 日转为只读。你的构建仍可正常运行，但发布在 trunk 上的 pod 将不会再有任何更新。podexit 会告诉你，哪些依赖已经冻结，哪些已经提供 Swift 包，并给出原生 iOS、Flutter 以及 React Native/Expo 的迁移路径。它读取你现有的 `Podfile.lock`，不会向你的项目安装任何东西。

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="podexit 在原生 iOS 应用上的运行结果：Firebase 的 pod 被限制在 12.x，Alamofire、Kingfisher、SnapKit 等将在 12 月 2 日之后冻结，且每个都提供 Swift 包"></picture>

<sub>由真实的 CLI 在 <a href="fixtures/native-app/Podfile">native-app fixture</a> 上录制，trunk 和 GitHub 的响应保存于 2026 年 10 月 14 日（<code>npm run demo</code>）。</sub>

## 亮点

- **每个 pod 两个结论**：它是否会停止获得更新（在 trunk 上已冻结、被发布方提前限制版本，或不受影响），以及其上游仓库是否有 `Package.swift`。
- **感知版本**：同样会检查你锁定的 tag 上的 `Package.swift`，并在 Swift 包仅存在于较新版本时给出提示。
- **内置 Firebase 版本上限**：Firebase 列出的 20 个 pod 及其子依赖都被限制在 12.x，数据来自一个引用了 Firebase 页面的、有来源出处的数据文件。
- **原生、Flutter、React Native 和 Expo**：在当前文件夹或 `ios/`、`macos/`、`example/ios/`、`example/macos/` 中自动查找 `Podfile.lock`，识别项目类型，并链接到对应的指南。
- **终端、Markdown 或 JSON**：给你看的是表格，给 pull request 用的是 Markdown，给脚本用的是 JSON。
- **可离线使用**：响应会在 `~/.cache/podexit` 中缓存 24 小时；`--offline` 只使用缓存。

## 快速开始

你需要 [Node.js](https://nodejs.org/) 22.12 或更高版本（`node --version` 会显示版本号；在 Mac 上可用 `brew install node` 安装），无需其他依赖。

**1. 在你的应用文件夹中打开终端**，即包含 `Podfile`、`ios/` 文件夹（Flutter 插件则是 `example/` 文件夹）的那个文件夹：

```sh
cd path/to/YourApp
```

**2. 运行 podexit：**

```sh
npx https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
```

podexit 尚未发布到 npm（已计划发布），因此 `npx podexit` 目前还无法使用。上面的命令会从 GitHub 运行 0.1.1 版本；本 README 中凡是写 `npx podexit` 的地方，都请改用这条命令。

**3. 阅读表格。** 标记为 **capped** 的行最先停止更新（Firebase 将在 2026 年 10 月停止向 CocoaPods 发布）；标记为 **frozen after Dec 2** 的行在 12 月 2 日之后不会再有新版本。Swift package 一列显示 **yes** 的 pod，现在就可以迁移。最后一行会链接到适合你项目类型的指南。

## 12 月 2 日会发生什么变化（以及哪些不变）

以下内容来自 [CocoaPods 公告](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)和 [Firebase 迁移页面](https://firebase.google.com/docs/ios/cocoapods-deprecation)：

1. **构建仍可正常运行。** Specs 仓库和 CDN 保持在线；`pod install` 仍可解析所有已发布的版本。只读模式的试运行安排在 2026 年 11 月 1 日至 7 日。
2. **trunk 上的 pod** 在 2026 年 12 月 2 日之后不会再有新版本（包括安全修复），除非它们通过其他方式发布（通常是 Swift 包）。
3. **Firebase 12 是 CocoaPods 上的最后一个主版本**，Firebase 将在 2026 年 10 月停止在那里发布。12 及更早的版本仍可安装。

详见[12 月 2 日会发生什么变化](docs/guides/what-changes.md)。

## 安装

podexit 尚未发布到 npm（已计划发布）。在此之前，可以像上面那样从 GitHub 运行 0.1.1 版本，或将其添加到项目中：

```sh
npm install --save-dev https://github.com/muhittincamdali/podexit/releases/download/v0.1.1/podexit-0.1.1.tgz
npx podexit
```

发布到 npm 后，`npx podexit` 无需安装即可下载并运行最新版本。若要在项目或 CI 中固定版本：

```sh
npm install --save-dev podexit
npx podexit
```

也可以用 `npm install --global podexit` 全局安装。`muhittincamdali/tap` 的 Homebrew formula 由发布工作流准备（计划随 tap 的首个版本一同提供）。

## 使用方法

```text
podexit [paths...] [options]
```

| 选项                    | 作用                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `paths`                 | `Podfile.lock` 文件或项目文件夹；默认为当前文件夹                    |
| `-f, --format <format>` | `tty`（默认）、`markdown` 或 `json`                                  |
| `-o, --output <file>`   | 将报告写入文件，而不是输出到终端                                     |
| `-a, --all`             | 同时在表格中列出来自本地路径、git 和私有 spec 的 pod                 |
| `--offline`             | 仅使用缓存的响应，完全不访问网络                                     |
| `--refresh`             | 忽略缓存，重新向网络请求                                             |
| `--cache-dir <dir>`     | 缓存文件夹（默认为 `$XDG_CACHE_HOME/podexit` 或 `~/.cache/podexit`） |
| `--no-color`            | 即使在终端中也输出纯文本（遵循 `NO_COLOR` 和 `FORCE_COLOR`）         |
| `--concurrency <n>`     | 并行查询 pod 的数量，1 到 64（默认 8）                               |

退出码：`0` 表示已写出报告；`2` 表示参数错误、未找到 `Podfile.lock`，或文件不是 `Podfile.lock`；`1` 表示其他任何意外情况。podexit 只负责报告，不会因为检查结果而让构建失败。

不指定路径时，podexit 会读取在 `Podfile.lock`、`ios/Podfile.lock`、`macos/Podfile.lock`、`example/ios/Podfile.lock` 和 `example/macos/Podfile.lock` 找到的每个锁文件；作为路径传入的文件夹也按同样方式查找。

| 环境变量                   | 作用                                           |
| -------------------------- | ---------------------------------------------- |
| `PODEXIT_CACHE_DIR`        | 未指定 `--cache-dir` 时使用的缓存文件夹        |
| `GITHUB_TOKEN`, `GH_TOKEN` | 只发送给 GitHub 主机；查看私有的上游仓库时需要 |
| `NO_COLOR`, `FORCE_COLOR`  | 关闭或开启终端颜色                             |

### 把 Markdown 报告和代码一起保存

```sh
npx podexit --format markdown --output podexit.md
```

Markdown 版本包含相同的表格、发布日期和指向各 Swift 包仓库的链接；来自本地路径和 git 的 pod 会折叠在一个 `<details>` 块中。

### 在脚本中使用 JSON 报告

```sh
npx podexit --format json > podexit.json
```

每个 pod 都带有 `updates.status`、`swiftPackage.status`、trunk 上的最新版本及其日期，以及一句解释每个结论的话。其结构为 `schemaVersion` 0，在 1.0 之前可能发生变化。[examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) 用 `jq` 对其进行过滤。

### 在 CI 中运行

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml) 会把报告添加到每个修改了 `Podfile.lock` 的 pull request 的作业摘要中。

### 速率限制与私有仓库

podexit 通过 raw.githubusercontent.com 读取 `Package.swift`，这不占用 GitHub API 配额。设置 `GITHUB_TOKEN`（或 `GH_TOKEN`）即可查看私有的上游仓库；令牌只会发送给 GitHub 主机。

### 在 JavaScript 中使用

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

可运行的版本见 [examples/api/summary.mjs](examples/api/summary.mjs)。

## 演示

这三段录制来自 [fixtures](fixtures/README.md)：它们是用各自工具链创建、并由 CocoaPods 1.16.2 解析的真实项目，使用 2026 年 10 月 14 日保存的响应回放。

| 项目                                                 | 录制                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 原生 iOS 应用（Firebase、Alamofire、Google Sign-In） | 本页顶部                                                                             |
| Flutter 应用（FlutterFire、google_sign_in 等）       | [浅色](docs/media/demo-flutter-light.svg) · [深色](docs/media/demo-flutter-dark.svg) |
| Expo SDK 57 应用（Sentry、RevenueCat、Lottie）       | [浅色](docs/media/demo-expo-light.svg) · [深色](docs/media/demo-expo-dark.svg)       |

测量环境：Mac（Apple silicon，M5 Max），Node.js 25.9，2026 年 10 月 14 日。在原生 fixture（28 个 pod）上首次运行发出 112 个请求，耗时 6.6 到 7.1 秒；第二次运行从缓存返回结果，耗时 0.3 秒。首次耗时主要取决于网速。

重新录制：`npm run demo`。

## 状态

| 功能                                                          | 状态          |
| ------------------------------------------------------------- | ------------- |
| 读取 `Podfile.lock`：pod、subspec、依赖图、每个 pod 的来源    | 可用          |
| 来自 CocoaPods trunk 的最新版本和发布日期                     | 可用          |
| 默认分支上以及锁定 tag 上的 `Package.swift`                   | 可用          |
| 发布方的版本上限（Firebase 12.x）及其子依赖                   | 可用          |
| 识别原生、Flutter 应用、Flutter 插件、React Native 和 Expo    | 可用          |
| 终端、Markdown 和 JSON 报告；`--offline` 缓存回放             | 可用          |
| 指出带来每个 pod 的 npm 或 pub.dev 包                         | 计划中（0.3） |
| 每个 pod 对应的 Swift 包产品名称和版本，`plan` → MIGRATION.md | 计划中（0.5） |
| SARIF 输出、`--fail-on`、GitHub Action                        | 计划中（0.5） |
| 作者模式：podspec → `Package.swift` 起点                      | 计划中（0.8） |
| Flutter `--fix`、静态网页、稳定的 JSON schema                 | 计划中（1.0） |

## 文档

API 参考与指南：[muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/)。

## 指南

- [12 月 2 日会发生什么变化（以及哪些不变）](docs/guides/what-changes.md)
- [原生 iOS：从 CocoaPods 迁移到 Swift Package Manager](docs/guides/native-ios.md)
- [Flutter 应用与插件](docs/guides/flutter.md)
- [React Native 和 Expo](docs/guides/react-native-expo.md)
- [Firebase 12 之后](docs/guides/firebase.md)
- [pod 作者：替代 `pod trunk push`](docs/guides/pod-authors.md)

## 系统要求

| 工具链  | 最低版本 |
| ------- | -------- |
| Node.js | 22.12    |

CI 在 Node.js 22 和 24（Linux）上运行测试。在本地，测试已在 Mac（Apple silicon）上通过 Node.js 22.23、24.22 和 25.9 验证。

## 架构

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

- `src/core/` 是纯函数式的：解析、版本比较、分类，没有 I/O。
- 所有来自网络的数据都经过 `Fetcher`。`CachedFetcher` 为每个请求保存一个 JSON 文件；这些文件同时也是测试和 `--offline` 回放的已录制响应。
- 缺失的响应会连同原因一起报告为 `unknown`，而不是报错。
- CLI（`src/cli/`）只负责解析参数、查找 lockfile 和写出输出。

## 路线图

见[状态](#状态)表：0.3 增加每个 pod 背后的 npm 和 pub.dev 包，0.5 增加迁移计划、SARIF 和 GitHub Action，0.8 增加作者模式，1.0 提供稳定的 JSON schema。[CHANGELOG.md](CHANGELOG.md) 列出了每个版本的变更。

## 常见问题

**12 月 2 日之后我的应用会无法构建吗？** 不会。CocoaPods 和 Firebase 都表示，现有版本仍可安装。podexit 关注的是你将得不到的更新，而不是会失败的构建。

**为什么有的 pod 是“unknown”？** 它的 podspec 指向 GitHub 以外的主机（例如 dl.google.com 上的二进制文件），或者当时无法连接网络。JSON 和 Markdown 报告会按 pod 给出具体原因。

**为什么 Flutter 插件和 React Native 模块是“not affected”？** 它们是来自 `.symlinks/plugins` 或 `node_modules` 的本地路径 pod，通过 pub 或 npm 更新。它们所依赖的 SDK 会单独列出，那些 SDK 有可能已被冻结。

**podexit 会修改我的项目吗？** 不会。它读取 `Podfile.lock`，只写入自己的缓存和你要求的报告。

## 参与贡献

欢迎参与贡献。提交 pull request 之前，请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 和[行为准则](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md)。如发现安全问题，请按照 [SECURITY.md](SECURITY.md) 中的说明报告。

## 许可证

基于 MIT 许可证发布。详见 [LICENSE](LICENSE)。
