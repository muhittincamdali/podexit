<!-- i18n-source: README.md@82702970a473d6fc63b191fcd2912d2ff9e89e87 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/banner-light.svg" alt="podexit: Which of your pods stop getting updates when CocoaPods trunk goes read-only, and which already ship a Swift package."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/podexit/actions/workflows/ci.yml/badge.svg" alt="Status da CI"></a>
<a href="https://github.com/muhittincamdali/podexit/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-version-light.svg" alt="Versão mais recente: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-language-light.svg" alt="Versão da linguagem: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/badge-license-light.svg" alt="Licença: MIT"></picture></a>
</p>

<p align="center">
<a href="#início-rápido"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-start-pt-BR-light.svg" alt="Começar"></picture></a>
<a href="https://muhittincamdali.github.io/podexit/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-docs-pt-BR-light.svg" alt="Documentação"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-guides-pt-BR-light.svg" alt="Guias"></picture></a>
<a href="https://github.com/muhittincamdali/podexit/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/podexit/main/.github/brand/button-examples-pt-BR-light.svg" alt="Exemplos"></picture></a>
</p>

> Esta é uma tradução do README em inglês. Se houver diferença, vale a versão em inglês.

<!-- brand:end -->

O CocoaPods trunk passará a ser somente leitura em 2 de dezembro de 2026. Seus builds continuam funcionando, mas os pods publicados lá nunca mais receberão atualizações. O podexit mostra quais das suas dependências ficam congeladas, quais já oferecem um pacote Swift e o caminho de migração para iOS nativo, Flutter e React Native/Expo. Ele lê o `Podfile.lock` que você já tem; nada é instalado no seu projeto.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-native-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-native-light.svg"><img src="docs/media/demo-native-light.svg" alt="podexit executado em um app iOS nativo: pods do Firebase limitados a 12.x; Alamofire, Kingfisher, SnapKit e outros congelados após 2 de dezembro, cada um com um pacote Swift"></picture>

<sub>Gravado com a CLI real sobre o <a href="fixtures/native-app/Podfile">fixture native-app</a>, com as respostas do trunk e do GitHub salvas em 14 de outubro de 2026 (<code>npm run demo</code>).</sub>

## Destaques

- **Duas respostas por pod**: se ele deixa de receber atualizações (congelado no trunk, limitado antes pelo publicador ou não afetado) e se o repositório de origem tem um `Package.swift`.
- **Atento às versões**: verifica também o `Package.swift` na tag que você travou e avisa quando o pacote Swift só existe em versões mais novas.
- **Limite do Firebase embutido**: os 20 pods do Firebase listados ficam limitados a 12.x, junto com suas subdependências, a partir de um arquivo de dados com fontes que cita a página do Firebase.
- **Nativo, Flutter, React Native e Expo**: encontra `Podfile.lock` na pasta ou em `ios/`, `macos/`, `example/ios/` ou `example/macos/`, reconhece o tipo de projeto e indica o guia correspondente.
- **Terminal, Markdown ou JSON**: uma tabela para você, Markdown para um pull request, JSON para scripts.
- **Funciona offline**: as respostas ficam em cache por 24 horas em `~/.cache/podexit`; `--offline` usa somente o cache.

## Início rápido

Você precisa do [Node.js](https://nodejs.org/) 22.12 ou posterior (`node --version` mostra a versão; no Mac, `brew install node` instala). Mais nada.

**1. Abra um terminal na pasta do seu app**, a que tem o `Podfile`, a pasta `ios/` ou (em um plugin Flutter) a pasta `example/`:

```sh
cd path/to/YourApp
```

**2. Execute o podexit:**

```sh
npx podexit
```

**3. Leia a tabela.** As linhas marcadas como **capped** são as primeiras a parar (o Firebase deixa de publicar no CocoaPods em outubro de 2026); as marcadas como **frozen after Dec 2** não recebem novas versões depois de 2 de dezembro. Onde a coluna Swift package mostra **yes**, o pod já pode ser migrado. A última linha aponta o guia do seu tipo de projeto.

## O que muda em 2 de dezembro (e o que não muda)

Segundo o [anúncio do CocoaPods](https://blog.cocoapods.org/CocoaPods-Specs-Repo/) e a [página de migração do Firebase](https://firebase.google.com/docs/ios/cocoapods-deprecation):

1. **Os builds continuam funcionando.** O repositório Specs e a CDN permanecem no ar; o `pod install` continua resolvendo todas as versões já publicadas. Um teste do modo somente leitura acontece de 1 a 7 de novembro de 2026.
2. **Pods no trunk não recebem novas versões** depois de 2 de dezembro de 2026, nem mesmo correções de segurança, a menos que sejam distribuídos de outra forma (normalmente um pacote Swift).
3. **O Firebase 12 é a última versão principal no CocoaPods**, e o Firebase deixa de publicar lá em outubro de 2026. As versões 12 e anteriores continuam instaláveis.

Saiba mais em [O que muda em 2 de dezembro](docs/guides/what-changes.md).

## Instalação

Não é preciso instalar nada: `npx podexit` baixa e executa a versão mais recente. Para fixar uma versão em um projeto ou no CI:

```sh
npm install --save-dev podexit
npx podexit
```

ou instale globalmente com `npm install --global podexit`. O workflow de release prepara uma fórmula do Homebrew para `muhittincamdali/tap` (prevista para o primeiro release do tap).

## Uso

```text
podexit [paths...] [options]
```

| Opção                   | O que faz                                                                        |
| ----------------------- | -------------------------------------------------------------------------------- |
| `paths`                 | Arquivos `Podfile.lock` ou pastas de projeto; o padrão é a pasta atual           |
| `-f, --format <format>` | `tty` (padrão), `markdown` ou `json`                                             |
| `-o, --output <file>`   | Grava o relatório em um arquivo em vez de no terminal                            |
| `-a, --all`             | Lista na tabela também os pods de caminhos locais, git e specs privados          |
| `--offline`             | Usa somente respostas em cache; nunca acessa a rede                              |
| `--refresh`             | Ignora o cache e consulta a rede de novo                                         |
| `--cache-dir <dir>`     | Pasta de cache (padrão `$XDG_CACHE_HOME/podexit` ou `~/.cache/podexit`)          |
| `--no-color`            | Texto simples, mesmo em um terminal (`NO_COLOR` e `FORCE_COLOR` são respeitados) |
| `--concurrency <n>`     | Consultas de pods em paralelo, de 1 a 64 (padrão 8)                              |

Códigos de saída: `0` relatório gravado, `2` argumentos inválidos, nenhum `Podfile.lock` encontrado ou um arquivo que não é um, `1` qualquer outro erro inesperado. O podexit relata; ele não faz um build falhar por causa do que encontra.

Sem caminhos, o podexit lê cada lockfile que encontrar em `Podfile.lock`, `ios/Podfile.lock`, `macos/Podfile.lock`, `example/ios/Podfile.lock` e `example/macos/Podfile.lock`; uma pasta passada como caminho é procurada da mesma forma.

| Variável de ambiente       | O que faz                                                                         |
| -------------------------- | --------------------------------------------------------------------------------- |
| `PODEXIT_CACHE_DIR`        | Pasta de cache quando `--cache-dir` não é informado                               |
| `GITHUB_TOKEN`, `GH_TOKEN` | Enviado apenas a hosts do GitHub; necessário para repositórios de origem privados |
| `NO_COLOR`, `FORCE_COLOR`  | Desativa ou ativa as cores do terminal                                            |

### Mantenha um relatório em Markdown junto com o código

```sh
npx podexit --format markdown --output podexit.md
```

A versão em Markdown tem as mesmas tabelas, as datas de lançamento e os links para o repositório de cada pacote Swift; pods de caminhos locais e de git ficam agrupados em um bloco `<details>`.

### Use o relatório JSON em scripts

```sh
npx podexit --format json > podexit.json
```

Cada pod traz `updates.status`, `swiftPackage.status`, a versão mais recente no trunk com a data e uma frase que explica cada resposta. O formato é `schemaVersion` 0 e pode mudar antes da 1.0. [examples/shell/frozen-pods.sh](examples/shell/frozen-pods.sh) o filtra com `jq`.

### Execute no CI

[examples/github-actions/podexit.yml](examples/github-actions/podexit.yml) adiciona o relatório ao resumo do job de todo pull request que altera um `Podfile.lock`.

### Limites de requisições e repositórios privados

O podexit lê `Package.swift` por raw.githubusercontent.com, que não consome a cota da API do GitHub. Defina `GITHUB_TOKEN` (ou `GH_TOKEN`) para consultar repositórios de origem privados; o token é enviado apenas a hosts do GitHub.

### A partir de JavaScript

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

Uma versão executável está em [examples/api/summary.mjs](examples/api/summary.mjs).

## Demonstração

As três gravações vêm dos [fixtures](fixtures/README.md): projetos reais criados com cada toolchain e resolvidos pelo CocoaPods 1.16.2, reproduzidos com as respostas salvas em 14 de outubro de 2026.

| Projeto                                              | Gravação                                                                                |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| App iOS nativo (Firebase, Alamofire, Google Sign-In) | topo desta página                                                                       |
| App Flutter (FlutterFire, google_sign_in, …)         | [claro](docs/media/demo-flutter-light.svg) · [escuro](docs/media/demo-flutter-dark.svg) |
| App Expo SDK 57 (Sentry, RevenueCat, Lottie)         | [claro](docs/media/demo-expo-light.svg) · [escuro](docs/media/demo-expo-dark.svg)       |

Medido em um Mac (Apple silicon, M5 Max) com Node.js 25.9 em 14 de outubro de 2026: uma primeira execução no fixture nativo (28 pods) fez 112 requisições e levou de 6.6 a 7.1 segundos; uma segunda execução respondeu a partir do cache em 0.3 segundo. A velocidade da rede define a maior parte do primeiro número.

Para gravar de novo: `npm run demo`.

## Status

| Funcionalidade                                                                | Status          |
| ----------------------------------------------------------------------------- | --------------- |
| Ler `Podfile.lock`: pods, subspecs, grafo de dependências, origem de cada pod | funciona        |
| Versão mais recente e datas de lançamento do CocoaPods trunk                  | funciona        |
| `Package.swift` na branch padrão e na tag travada                             | funciona        |
| Limites dos publicadores (Firebase 12.x) e suas subdependências               | funciona        |
| Detecção de nativo, app Flutter, plugin Flutter, React Native e Expo          | funciona        |
| Relatórios em terminal, Markdown e JSON; reprodução do cache com `--offline`  | funciona        |
| Indicar o pacote npm ou pub.dev que traz cada pod                             | planejado (0.3) |
| Nomes de produto e versões do pacote Swift por pod, `plan` → MIGRATION.md     | planejado (0.5) |
| Saída SARIF, `--fail-on`, GitHub Action                                       | planejado (0.5) |
| Modo autor: podspec → ponto de partida de `Package.swift`                     | planejado (0.8) |
| `--fix` do Flutter, página web estática, schema JSON estável                  | planejado (1.0) |

## Documentação

Referência da API e guias: [muhittincamdali.github.io/podexit](https://muhittincamdali.github.io/podexit/).

## Guias

- [O que muda em 2 de dezembro (e o que não muda)](docs/guides/what-changes.md)
- [iOS nativo: do CocoaPods ao Swift Package Manager](docs/guides/native-ios.md)
- [Apps e plugins Flutter](docs/guides/flutter.md)
- [React Native e Expo](docs/guides/react-native-expo.md)
- [Firebase depois da versão 12](docs/guides/firebase.md)
- [Autores de pods: como substituir o `pod trunk push`](docs/guides/pod-authors.md)

## Requisitos

| Toolchain | Versão mínima |
| --------- | ------------- |
| Node.js   | 22.12         |

O CI executa os testes no Node.js 22 e 24 (Linux). Localmente, eles passam no Node.js 22.23, 24.22 e 25.9 em um Mac (Apple silicon).

## Arquitetura

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

- `src/core/` é puro: parsing, comparação de versões, classificação. Sem E/S.
- Tudo o que vem da rede passa por um `Fetcher`. O `CachedFetcher` guarda um arquivo JSON por requisição; esses mesmos arquivos são as respostas gravadas que os testes e o `--offline` reproduzem.
- Uma resposta ausente é relatada como `unknown`, com o motivo, nunca como um erro.
- A CLI (`src/cli/`) apenas lê os argumentos, encontra os lockfiles e escreve a saída.

## Roteiro

Veja a tabela de [Status](#status): a 0.3 acrescenta o pacote npm e pub.dev por trás de cada pod, a 0.5 o plano de migração, SARIF e uma GitHub Action, a 0.8 o modo autor e a 1.0 um schema JSON estável. O [CHANGELOG.md](CHANGELOG.md) lista o que cada release mudou.

## FAQ

**Meu app vai parar de compilar em 2 de dezembro?** Não. Tanto o CocoaPods quanto o Firebase dizem que as versões existentes continuam instaláveis. O podexit trata das atualizações que você não vai receber, não de builds que deixam de funcionar.

**Por que um pod aparece como "unknown"?** O podspec dele aponta para um host que não é o GitHub (por exemplo, um binário em dl.google.com) ou a rede não estava disponível. Os relatórios JSON e Markdown dão o motivo de cada pod.

**Por que plugins Flutter e módulos React Native aparecem como "not affected"?** Eles são pods de caminho local vindos de `.symlinks/plugins` ou `node_modules`; são atualizados pelo pub ou pelo npm. Os SDKs de que dependem são listados à parte, e esses podem estar congelados.

**O podexit altera o meu projeto?** Não. Ele lê o `Podfile.lock` e grava apenas o próprio cache e o relatório que você pedir.

## Como contribuir

Contribuições são bem-vindas. Leia o [CONTRIBUTING.md](CONTRIBUTING.md) e o [código de conduta](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) antes de abrir um pull request. Relate problemas de segurança como descrito no [SECURITY.md](SECURITY.md).

## Licença

Publicado sob a licença MIT. Veja [LICENSE](LICENSE).
