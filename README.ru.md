<!-- i18n-source: README.md@1b2eb6ac7a8d531e4b41be202de9c8bb6915a625 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="Статус CI"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="Последняя версия: v0.1.2"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="Версия языка: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="Лицензия: MIT"></picture></a>
</p>

<p align="center">
<a href="#быстрый-старт"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-ru-light.svg" alt="Начать"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-ru-light.svg" alt="Документация"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-ru-light.svg" alt="Руководства"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-ru-light.svg" alt="Примеры"></picture></a>
</p>

> Это перевод README на английском языке. Если они расходятся, актуальна английская версия.

<!-- brand:end -->

2 декабря 2026 года CocoaPods trunk станет доступен только для чтения. Ваши сборки продолжат работать, но опубликованные там pod больше никогда не получат обновлений. podexit показывает, какие из ваших зависимостей заморожены, какие уже поставляются как Swift-пакет, и путь миграции для нативного iOS, Flutter и React Native/Expo. Он читает уже имеющийся у вас `Podfile.lock`; в ваш проект ничего не устанавливается.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="podexit на нативном iOS-приложении: pod Firebase ограничены версией 12.x; Alamofire, Kingfisher, SnapKit и другие заморожены после 2 декабря, у каждого есть Swift-пакет"></picture>

<sub>Записано настоящим CLI на <a href="fixtures/native-app/Podfile">фикстуре native-app</a>; ответы trunk и GitHub сохранены 14 октября 2026 года (<code>npm run demo</code>).</sub>

## Основные возможности

- **Два ответа для каждого pod**: перестанет ли он получать обновления (заморожен на trunk, рано ограничен издателем или не затронут) и есть ли в его исходном репозитории `Package.swift`.
- **Учитывает версии**: проверяет `Package.swift` и на зафиксированном у вас теге и сообщает, если Swift-пакет есть только в более новых версиях.
- **Ограничение Firebase встроено**: 20 перечисленных Firebase pod и их подзависимости ограничены версией 12.x; данные берутся из файла с указанием источника, который ссылается на страницу Firebase.
- **Нативные проекты, Flutter, React Native и Expo**: находит `Podfile.lock` в самой папке или в `ios/`, `macos/`, `example/ios/` или `example/macos/`, определяет тип проекта и даёт ссылку на подходящее руководство.
- **Терминал, Markdown или JSON**: таблица для вас, Markdown для pull request, JSON для скриптов.
- **Работает офлайн**: ответы кэшируются на 24 часа в `~/.cache/podexit`; `--offline` использует только кэш.

## Быстрый старт

Нужен [Node.js](https://nodejs.org/) версии 22.12 или новее (`node --version` покажет версию; на Mac его устанавливает `brew install node`). Больше ничего не требуется.

**1. Откройте терминал в папке вашего приложения** — той, где лежит `Podfile`, папка `ios/` или (для плагина Flutter) папка `example/`:

```sh
cd path/to/YourApp
```

**2. Запустите podexit:**

```sh
npx @mcamdali/podexit
```

Пакет в npm называется `@mcamdali/podexit` (npm отклонил имя без scope); команда, которую он устанавливает, по-прежнему `podexit`.

**3. Прочитайте таблицу.** Строки с пометкой **capped** останавливаются первыми (Firebase прекращает публикацию в CocoaPods в октябре 2026 года); строки с пометкой **frozen after Dec 2** не получат новых версий после 2 декабря. Если в столбце Swift package указано **yes**, pod можно переносить уже сейчас. Последняя строка содержит ссылку на руководство для вашего типа проекта.

## Что изменится 2 декабря (а что нет)

По [объявлению CocoaPods](https://blog.cocoapods.org/CocoaPods-Specs-Repo/) и [странице миграции Firebase](https://firebase.google.com/docs/ios/cocoapods-deprecation):

1. **Сборки продолжат работать.** Репозиторий Specs и CDN остаются в сети; `pod install` по-прежнему разрешает все уже опубликованные версии. Пробный запуск режима только для чтения пройдёт с 1 по 7 ноября 2026 года.
2. **Pod на trunk не получат новых версий** после 2 декабря 2026 года, включая исправления безопасности, если только их не станут поставлять иным способом (чаще всего как Swift-пакет).
3. **Firebase 12 — последняя основная версия в CocoaPods**, а Firebase прекращает публикацию там в октябре 2026 года. Версии 12 и более ранние остаются доступными для установки.

Подробнее — в руководстве [Что изменится 2 декабря](docs/guides/what-changes.md).

## Установка

Запускайте без установки или добавьте в проект, чтобы зафиксировать версию:

```sh
npm install --save-dev @mcamdali/podexit
npx @mcamdali/podexit
```

Чтобы установить команду глобально:

```sh
npm i -g @mcamdali/podexit
podexit
```

С Homebrew достаточно `brew install muhittincamdali/tap/podexit`: он ставит архив релиза с GitHub.

## Использование

```text
podexit [paths...] [options]
```

| Параметр                | Что делает                                                                 |
| ----------------------- | -------------------------------------------------------------------------- |
| `paths`                 | Файлы `Podfile.lock` или папки проектов; по умолчанию — текущая папка      |
| `-f, --format <format>` | `tty` (по умолчанию), `markdown` или `json`                                |
| `-o, --output <file>`   | Записать отчёт в файл вместо терминала                                     |
| `-a, --all`             | Также показывать в таблице pod из локальных путей, git и приватных specs   |
| `--offline`             | Использовать только кэшированные ответы; к сети не обращаться              |
| `--refresh`             | Игнорировать кэш и снова обратиться к сети                                 |
| `--cache-dir <dir>`     | Папка кэша (по умолчанию `$XDG_CACHE_HOME/podexit` или `~/.cache/podexit`) |
| `--no-color`            | Обычный текст даже в терминале (`NO_COLOR` и `FORCE_COLOR` учитываются)    |
| `--concurrency <n>`     | Число параллельных запросов по pod, от 1 до 64 (по умолчанию 8)            |

Коды завершения: `0` — отчёт записан, `2` — неверные аргументы, не найден ни один `Podfile.lock` или файл не является им, `1` — любая другая непредвиденная ошибка. podexit сообщает о находках, но не ломает сборку из-за них.

Без путей podexit читает каждый lock-файл, который находит в `Podfile.lock`, `ios/Podfile.lock`, `macos/Podfile.lock`, `example/ios/Podfile.lock` и `example/macos/Podfile.lock`; папка, переданная как путь, просматривается так же.

| Переменная окружения       | Что делает                                                                     |
| -------------------------- | ------------------------------------------------------------------------------ |
| `PODEXIT_CACHE_DIR`        | Папка кэша, если `--cache-dir` не указан                                       |
| `GITHUB_TOKEN`, `GH_TOKEN` | Отправляется только на хосты GitHub; нужна для приватных исходных репозиториев |
| `NO_COLOR`, `FORCE_COLOR`  | Выключает или включает цвета в терминале                                       |

### Храните Markdown-отчёт вместе с кодом

```sh
npx @mcamdali/podexit --format markdown --output podexit.md
```

В Markdown-версии те же таблицы, даты выходов и ссылки на репозиторий каждого Swift-пакета; pod из локальных путей и git сворачиваются в блок `<details>`.

### Используйте JSON-отчёт в скриптах

```sh
npx @mcamdali/podexit --format json > podexit.json
```

Для каждого pod указаны `updates.status`, `swiftPackage.status`, последняя версия на trunk с датой и предложение, объясняющее каждый ответ. Структура — `schemaVersion` 0, до версии 1.0 она может измениться. [examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) фильтрует его с помощью `jq`.

### Запускайте в CI

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml) добавляет отчёт в сводку задания каждого pull request, который меняет `Podfile.lock`.

### Лимиты запросов и приватные репозитории

podexit читает `Package.swift` через raw.githubusercontent.com, который не расходует квоту GitHub API. Задайте `GITHUB_TOKEN` (или `GH_TOKEN`), чтобы заглядывать в приватные исходные репозитории; токен отправляется только на хосты GitHub.

### Из JavaScript

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

Готовый к запуску вариант — [examples/api/summary.mjs](examples/api/summary.mjs).

## Демо

Три записи сделаны на [фикстурах](fixtures/README.md): это настоящие проекты, созданные штатными инструментами каждой платформы и разрешённые CocoaPods 1.16.2; воспроизводятся по ответам, сохранённым 14 октября 2026 года.

| Проект                                                        | Запись                                                                                    |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Нативное iOS-приложение (Firebase, Alamofire, Google Sign-In) | вверху этой страницы                                                                      |
| Приложение Flutter (FlutterFire, google_sign_in, …)           | [светлая](docs/media/demo-flutter-light.svg) · [тёмная](docs/media/demo-flutter-dark.svg) |
| Приложение Expo SDK 57 (Sentry, RevenueCat, Lottie)           | [светлая](docs/media/demo-expo-light.svg) · [тёмная](docs/media/demo-expo-dark.svg)       |

Замер на Mac (Apple silicon, M5 Max) с Node.js 25.9 от 14 октября 2026 года: первый запуск на нативной фикстуре (28 pod) сделал 112 запросов и занял от 6,6 до 7,1 секунды; второй запуск ответил из кэша за 0,3 секунды. Первое значение в основном определяется скоростью сети.

Чтобы записать их заново: `npm run demo`.

## Статус

| Возможность                                                                             | Статус              |
| --------------------------------------------------------------------------------------- | ------------------- |
| Чтение `Podfile.lock`: pod, subspec, граф зависимостей, источник каждого pod            | работает            |
| Последняя версия и даты выходов из CocoaPods trunk                                      | работает            |
| `Package.swift` в ветке по умолчанию и на зафиксированном теге                          | работает            |
| Ограничения издателей (Firebase 12.x) и их подзависимости                               | работает            |
| Определение нативного проекта, приложения Flutter, плагина Flutter, React Native и Expo | работает            |
| Отчёты в терминале, Markdown и JSON; воспроизведение кэша через `--offline`             | работает            |
| Указание npm- или pub.dev-пакета, который приносит каждый pod                           | запланировано (0.3) |
| Названия продуктов и версии Swift-пакета для каждого pod, `plan` → MIGRATION.md         | запланировано (0.5) |
| Вывод SARIF, `--fail-on`, GitHub Action                                                 | запланировано (0.5) |
| Режим автора: podspec → отправная точка для `Package.swift`                             | запланировано (0.8) |
| `--fix` для Flutter, статическая веб-страница, стабильная JSON-схема                    | запланировано (1.0) |

## Документация

Справочник API и руководства: [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/).

## Руководства

- [Что изменится 2 декабря (а что нет)](docs/guides/what-changes.md)
- [Нативный iOS: от CocoaPods к Swift Package Manager](docs/guides/native-ios.md)
- [Приложения и плагины Flutter](docs/guides/flutter.md)
- [React Native и Expo](docs/guides/react-native-expo.md)
- [Firebase после версии 12](docs/guides/firebase.md)
- [Авторам pod: чем заменить `pod trunk push`](docs/guides/pod-authors.md)

## Требования

| Инструментарий | Минимальная версия |
| -------------- | ------------------ |
| Node.js        | 22.12              |

CI запускает тесты на Node.js 22 и 24 (Linux). Локально они проходят на Node.js 22.23, 24.22 и 25.9 на Mac (Apple silicon).

## Архитектура

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

- `src/core/` — чистый слой: разбор, сравнение версий, классификация. Никакого ввода-вывода.
- Всё, что приходит из сети, проходит через `Fetcher`. `CachedFetcher` хранит по одному JSON-файлу на запрос; эти же файлы служат записанными ответами, которые воспроизводят тесты и `--offline`.
- Отсутствующий ответ помечается как `unknown` с указанием причины, а не как ошибка.
- CLI (`src/cli/`) только разбирает аргументы, находит lockfile и записывает вывод.

## План развития

См. таблицу [Статус](#статус): в 0.3 появится npm- и pub.dev-пакет, стоящий за каждым pod, в 0.5 — план миграции, SARIF и GitHub Action, в 0.8 — режим автора, в 1.0 — стабильная JSON-схема. В [CHANGELOG.md](CHANGELOG.md) перечислено, что изменил каждый релиз.

## FAQ

**Перестанет ли моё приложение собираться 2 декабря?** Нет. И CocoaPods, и Firebase заявляют, что существующие версии останутся доступными для установки. podexit говорит об обновлениях, которых вы не получите, а не о сборках, которые остановятся.

**Почему pod помечен как «unknown»?** Его podspec указывает на хост, отличный от GitHub (например, на бинарный файл на dl.google.com), либо сеть была недоступна. В JSON- и Markdown-отчётах причина указана для каждого pod.

**Почему плагины Flutter и модули React Native помечены как «not affected»?** Это pod с локальным путём из `.symlinks/plugins` или `node_modules`; они обновляются через pub или npm. SDK, от которых они зависят, перечислены отдельно, и вот они могут быть заморожены.

**Меняет ли podexit мой проект?** Нет. Он читает `Podfile.lock` и записывает только свой кэш и запрошенный вами отчёт.

## Участие в разработке

Мы рады вашему участию. Перед открытием pull request прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) и [кодекс поведения](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md). О проблемах безопасности сообщайте так, как описано в [SECURITY.md](SECURITY.md).

## Лицензия

Распространяется по лицензии MIT. Подробнее — в файле [LICENSE](LICENSE).
