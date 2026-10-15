<!-- i18n-source: README.md@1b2eb6ac7a8d531e4b41be202de9c8bb6915a625 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="CI 상태"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="최신 버전: v0.1.2"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="언어 버전: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="라이선스: MIT"></picture></a>
</p>

<p align="center">
<a href="#빠른-시작"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ko-light.svg" alt="시작하기"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ko-light.svg" alt="문서"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ko-light.svg" alt="가이드"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ko-light.svg" alt="예제"></picture></a>
</p>

> 이 문서는 영어 README의 번역본입니다. 내용이 다를 경우 영어 버전이 최신입니다.

<!-- brand:end -->

CocoaPods trunk는 2026년 12월 2일에 읽기 전용이 됩니다. 빌드는 계속 동작하지만, trunk에 게시된 pod는 더 이상 업데이트를 받지 못합니다. podexit은 의존성 중 어떤 것이 동결되는지, 어떤 것이 이미 Swift 패키지를 제공하는지, 그리고 네이티브 iOS, Flutter, React Native/Expo별 마이그레이션 경로를 보여 줍니다. 이미 가지고 있는 `Podfile.lock`을 읽을 뿐이며, 프로젝트에는 아무것도 설치되지 않습니다.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="네이티브 iOS 앱에서 실행한 podexit: Firebase pod는 12.x로 제한되고, Alamofire, Kingfisher, SnapKit 등은 12월 2일 이후 동결되며, 각각 Swift 패키지가 있음"></picture>

<sub>실제 CLI로 <a href="fixtures/native-app/Podfile">native-app fixture</a>에서 녹화했으며, trunk와 GitHub 응답은 2026년 10월 14일에 저장한 것입니다(<code>npm run demo</code>).</sub>

## 주요 기능

- **pod마다 두 가지 답**: 업데이트가 중단되는지(trunk에서 동결, 게시자가 일찍 상한을 둠, 또는 영향 없음)와 업스트림 저장소에 `Package.swift`가 있는지.
- **버전 인식**: 잠가 둔 태그의 `Package.swift`도 확인하고, Swift 패키지가 더 새로운 버전에만 있으면 그 사실을 알려 줍니다.
- **Firebase 상한 내장**: Firebase가 나열한 pod 20개와 그 하위 의존성은 12.x로 제한됩니다. 근거는 Firebase 페이지를 출처로 밝힌 데이터 파일입니다.
- **네이티브, Flutter, React Native, Expo**: 폴더 자체와 `ios/`, `macos/`, `example/ios/`, `example/macos/`에서 `Podfile.lock`을 찾고, 프로젝트 종류를 인식해 알맞은 가이드로 연결합니다.
- **터미널, Markdown, JSON**: 직접 볼 표, pull request용 Markdown, 스크립트용 JSON.
- **오프라인 동작**: 응답을 `~/.cache/podexit`에 24시간 캐시하며, `--offline`은 캐시만 사용합니다.

## 빠른 시작

[Node.js](https://nodejs.org/) 22.12 이상이 필요합니다(`node --version`으로 확인할 수 있고, Mac에서는 `brew install node`로 설치합니다). 그 외에는 필요한 것이 없습니다.

**1. 앱 폴더에서 터미널을 엽니다.** `Podfile`이 있는 폴더, `ios/` 폴더가 있는 폴더, 또는 (Flutter 플러그인이라면) `example/` 폴더가 있는 곳입니다.

```sh
cd path/to/YourApp
```

**2. podexit을 실행합니다.**

```sh
npx @mcamdali/podexit
```

npm 패키지 이름은 `@mcamdali/podexit`입니다(npm이 스코프 없는 이름을 거부했습니다). 설치되는 명령은 여전히 `podexit`입니다.

**3. 표를 읽습니다.** **capped**로 표시된 행이 가장 먼저 멈춥니다(Firebase는 2026년 10월에 CocoaPods 게시를 중단합니다). **frozen after Dec 2**로 표시된 행은 12월 2일 이후 새 버전을 받지 못합니다. Swift package 열이 **yes**이면 그 pod는 지금 옮길 수 있습니다. 마지막 줄에는 프로젝트 종류에 맞는 가이드 링크가 표시됩니다.

## 12월 2일에 달라지는 것(그리고 달라지지 않는 것)

[CocoaPods 공지](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)와 [Firebase 마이그레이션 페이지](https://firebase.google.com/docs/ios/cocoapods-deprecation)에 따르면 다음과 같습니다.

1. **빌드는 계속 동작합니다.** Specs 저장소와 CDN은 온라인 상태를 유지하며, `pod install`은 이미 게시된 모든 버전을 계속 해석합니다. 읽기 전용 모드 시험 운영은 2026년 11월 1일부터 7일까지 진행됩니다.
2. **trunk의 pod**는 다른 방식(대개 Swift 패키지)으로 배포되지 않는 한, 2026년 12월 2일 이후 보안 수정을 포함해 새 버전을 받지 못합니다.
3. **Firebase 12는 CocoaPods의 마지막 메이저 버전**이며, Firebase는 2026년 10월에 그곳 게시를 중단합니다. 12 및 이전 버전은 계속 설치할 수 있습니다.

자세한 내용은 [12월 2일에 달라지는 것](docs/guides/what-changes.md)을 참고하세요.

## 설치

설치 없이 실행하거나, 버전을 고정하려면 프로젝트에 추가합니다.

```sh
npm install --save-dev @mcamdali/podexit
npx @mcamdali/podexit
```

명령을 전역으로 설치하려면 다음과 같이 합니다.

```sh
npm i -g @mcamdali/podexit
podexit
```

Homebrew 사용자는 `brew install muhittincamdali/tap/podexit`을 실행할 수 있으며, GitHub의 릴리스 tarball이 설치됩니다.

## 사용법

```text
podexit [paths...] [options]
```

| 옵션                    | 동작                                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| `paths`                 | `Podfile.lock` 파일 또는 프로젝트 폴더. 기본값은 현재 폴더            |
| `-f, --format <format>` | `tty`(기본값), `markdown`, `json`                                     |
| `-o, --output <file>`   | 보고서를 터미널 대신 파일에 기록                                      |
| `-a, --all`             | 로컬 경로, git, 비공개 spec의 pod도 표에 나열                         |
| `--offline`             | 캐시된 응답만 사용하고 네트워크에는 접근하지 않음                     |
| `--refresh`             | 캐시를 무시하고 네트워크에 다시 요청                                  |
| `--cache-dir <dir>`     | 캐시 폴더(기본값은 `$XDG_CACHE_HOME/podexit` 또는 `~/.cache/podexit`) |
| `--no-color`            | 터미널에서도 일반 텍스트로 출력(`NO_COLOR`와 `FORCE_COLOR`를 따름)    |
| `--concurrency <n>`     | pod 병렬 조회 수, 1에서 64까지(기본값 8)                              |

종료 코드: `0`은 보고서를 기록함, `2`는 잘못된 인자이거나 `Podfile.lock`을 찾지 못했거나 `Podfile.lock`이 아닌 파일, `1`은 그 밖의 예상하지 못한 오류입니다. podexit은 보고만 하며, 발견한 내용 때문에 빌드를 실패시키지 않습니다.

경로를 지정하지 않으면 podexit은 `Podfile.lock`, `ios/Podfile.lock`, `macos/Podfile.lock`, `example/ios/Podfile.lock`, `example/macos/Podfile.lock`에서 찾은 잠금 파일을 모두 읽습니다. 경로로 넘긴 폴더도 같은 방식으로 찾습니다.

| 환경 변수                  | 동작                                                            |
| -------------------------- | --------------------------------------------------------------- |
| `PODEXIT_CACHE_DIR`        | `--cache-dir`를 지정하지 않았을 때 쓰는 캐시 폴더               |
| `GITHUB_TOKEN`, `GH_TOKEN` | GitHub 호스트로만 전송되며, 비공개 업스트림 저장소에 필요합니다 |
| `NO_COLOR`, `FORCE_COLOR`  | 터미널 색상을 끄거나 켬                                         |

### Markdown 보고서를 코드와 함께 보관하기

```sh
npx @mcamdali/podexit --format markdown --output podexit.md
```

Markdown 버전에도 같은 표, 릴리스 날짜, 각 Swift 패키지 저장소로 가는 링크가 들어 있습니다. 로컬 경로와 git의 pod는 `<details>` 블록으로 접힙니다.

### 스크립트에서 JSON 보고서 사용하기

```sh
npx @mcamdali/podexit --format json > podexit.json
```

각 pod에는 `updates.status`, `swiftPackage.status`, trunk의 최신 버전과 그 날짜, 그리고 각 답을 설명하는 문장이 담겨 있습니다. 구조는 `schemaVersion` 0이며 1.0 이전에 바뀔 수 있습니다. [examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh)는 `jq`로 이를 걸러 냅니다.

### CI에서 실행하기

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml)은 `Podfile.lock`을 변경하는 모든 pull request의 작업 요약에 보고서를 추가합니다.

### 요청 한도와 비공개 저장소

podexit은 GitHub API 할당량을 쓰지 않는 raw.githubusercontent.com을 통해 `Package.swift`를 읽습니다. 비공개 업스트림 저장소를 확인하려면 `GITHUB_TOKEN`(또는 `GH_TOKEN`)을 설정하세요. 토큰은 GitHub 호스트로만 전송됩니다.

### JavaScript에서 사용하기

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

실행 가능한 버전은 [examples/api/summary.mjs](examples/api/summary.mjs)입니다.

## 데모

세 가지 녹화는 [fixtures](fixtures/README.md)에서 만든 것입니다. 각 툴체인으로 만들고 CocoaPods 1.16.2로 해석한 실제 프로젝트를 2026년 10월 14일에 저장한 응답으로 재생했습니다.

| 프로젝트                                             | 녹화                                                                                   |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 네이티브 iOS 앱(Firebase, Alamofire, Google Sign-In) | 이 페이지 맨 위                                                                        |
| Flutter 앱(FlutterFire, google_sign_in 등)           | [라이트](docs/media/demo-flutter-light.svg) · [다크](docs/media/demo-flutter-dark.svg) |
| Expo SDK 57 앱(Sentry, RevenueCat, Lottie)           | [라이트](docs/media/demo-expo-light.svg) · [다크](docs/media/demo-expo-dark.svg)       |

측정 환경은 Mac(Apple silicon, M5 Max), Node.js 25.9, 2026년 10월 14일입니다. 네이티브 fixture(pod 28개)에서 처음 실행했을 때 요청 112건을 보냈고 6.6초에서 7.1초가 걸렸으며, 두 번째 실행은 캐시에서 0.3초 만에 응답했습니다. 첫 번째 시간은 대부분 네트워크 속도에 좌우됩니다.

다시 녹화하려면 `npm run demo`를 실행하세요.

## 상태

| 기능                                                            | 상태        |
| --------------------------------------------------------------- | ----------- |
| `Podfile.lock` 읽기: pod, subspec, 의존성 그래프, 각 pod의 출처 | 동작        |
| CocoaPods trunk의 최신 버전과 릴리스 날짜                       | 동작        |
| 기본 브랜치와 잠긴 태그의 `Package.swift`                       | 동작        |
| 게시자의 상한(Firebase 12.x)과 그 하위 의존성                   | 동작        |
| 네이티브, Flutter 앱, Flutter 플러그인, React Native, Expo 감지 | 동작        |
| 터미널, Markdown, JSON 보고서. `--offline` 캐시 재생            | 동작        |
| 각 pod를 가져오는 npm 또는 pub.dev 패키지 이름 표시             | 계획됨(0.3) |
| pod별 Swift 패키지 제품 이름과 버전, `plan` → MIGRATION.md      | 계획됨(0.5) |
| SARIF 출력, `--fail-on`, GitHub Action                          | 계획됨(0.5) |
| 작성자 모드: podspec → `Package.swift` 출발점                   | 계획됨(0.8) |
| Flutter `--fix`, 정적 웹 페이지, 안정적인 JSON 스키마           | 계획됨(1.0) |

## 문서

API 레퍼런스와 가이드: [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/).

## 가이드

- [12월 2일에 달라지는 것(그리고 달라지지 않는 것)](docs/guides/what-changes.md)
- [네이티브 iOS: CocoaPods에서 Swift Package Manager로](docs/guides/native-ios.md)
- [Flutter 앱과 플러그인](docs/guides/flutter.md)
- [React Native와 Expo](docs/guides/react-native-expo.md)
- [Firebase 12 이후](docs/guides/firebase.md)
- [pod 작성자: `pod trunk push`를 대체하는 방법](docs/guides/pod-authors.md)

## 요구 사항

| 툴체인  | 최소 버전 |
| ------- | --------- |
| Node.js | 22.12     |

CI는 Node.js 22와 24(Linux)에서 테스트를 실행합니다. 로컬에서는 Mac(Apple silicon)의 Node.js 22.23, 24.22, 25.9에서 테스트가 통과합니다.

## 아키텍처

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

- `src/core/`는 순수합니다. 파싱, 버전 비교, 분류만 하며 I/O가 없습니다.
- 네트워크에서 오는 모든 것은 `Fetcher`를 거칩니다. `CachedFetcher`는 요청마다 JSON 파일 하나를 저장하며, 같은 파일이 테스트와 `--offline`이 재생하는 기록된 응답입니다.
- 응답이 없으면 오류가 아니라 이유와 함께 `unknown`으로 보고합니다.
- CLI(`src/cli/`)는 인자 파싱, lockfile 찾기, 출력 기록만 합니다.

## 로드맵

[상태](#상태) 표를 참고하세요. 0.3에서는 각 pod 뒤에 있는 npm과 pub.dev 패키지, 0.5에서는 마이그레이션 계획, SARIF, GitHub Action, 0.8에서는 작성자 모드, 1.0에서는 안정적인 JSON 스키마가 추가됩니다. 각 릴리스의 변경 내용은 [CHANGELOG.md](CHANGELOG.md)에 정리되어 있습니다.

## FAQ

**12월 2일에 앱이 빌드되지 않게 되나요?** 아니요. CocoaPods와 Firebase 모두 기존 버전은 계속 설치할 수 있다고 밝혔습니다. podexit이 다루는 것은 받지 못하게 될 업데이트이지, 멈추는 빌드가 아닙니다.

**왜 어떤 pod는 "unknown"인가요?** podspec이 GitHub가 아닌 호스트(예: dl.google.com의 바이너리)를 가리키거나 네트워크를 사용할 수 없었기 때문입니다. JSON과 Markdown 보고서에는 pod별 이유가 담겨 있습니다.

**왜 Flutter 플러그인과 React Native 모듈은 "not affected"인가요?** 이들은 `.symlinks/plugins` 또는 `node_modules`에서 온 로컬 경로 pod이며, pub 또는 npm으로 업데이트됩니다. 이들이 의존하는 SDK는 따로 나열되며, 그 SDK는 동결될 수 있습니다.

**podexit이 프로젝트를 변경하나요?** 아니요. `Podfile.lock`을 읽고, 자체 캐시와 요청한 보고서만 기록합니다.

## 기여하기

기여를 환영합니다. pull request를 열기 전에 [CONTRIBUTING.md](CONTRIBUTING.md)와 [행동 강령](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md)을 읽어 주세요. 보안 문제는 [SECURITY.md](SECURITY.md)에 설명된 방법으로 제보해 주세요.

## 라이선스

MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
