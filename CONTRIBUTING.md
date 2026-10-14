# Contributing to podexit

Thanks for taking the time to improve podexit. The
[shared contributing guide](https://github.com/muhittincamdali/.github/blob/main/CONTRIBUTING.md)
applies (small fixes as a pull request, larger changes as an issue first, security issues through
[SECURITY.md](SECURITY.md), the
[code of conduct](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) for
everyone). This file adds what is specific to this repository.

## Set up

Node.js 22.12 or later, then:

```sh
git clone https://github.com/muhittincamdali/podexit.git
cd podexit
npm ci
npm test          # builds dist/ first, then runs every test offline
```

CI runs `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` on Node.js 22 and 24;
if they pass locally they pass on your pull request.

| Command                   | What it does                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `npm run lint`            | Biome (code) and Prettier (formatting); `npm run format` fixes formatting               |
| `npm run typecheck`       | TypeScript in strict mode over `src/`, `test/` and `scripts/`                           |
| `npm test`                | Unit, integration, snapshot and end-to-end tests; no network                            |
| `npm run demo`            | Re-records the terminal SVGs in `docs/media/` from the CLI                              |
| `npm run fixtures:record` | Re-records `fixtures/responses/` from the network                                       |
| `npm run docs`            | Builds the documentation site into `site/` (run `npm ci --prefix docs/site` once first) |
| `npm run smoke`           | Packs the package, installs the tarball and runs it                                     |
| `npm run data:check`      | Checks that every source cited in `data/` still answers                                 |

## Where things live

- `src/core/`: pure functions (lockfile parsing, versions, classification). No I/O here.
- `src/net/`: everything that talks to the network, behind the `Fetcher` interface.
- `src/report/`: the terminal, Markdown and JSON output.
- `src/cli/`: argument parsing and lockfile discovery.
- `data/`: sourced data with a JSON schema; `fixtures/`: real projects and recorded answers.

## Tests

- A bug fix starts with a test that fails without it.
- Tests never use the network. Use `FakeFetcher` (`test/helpers/fake-fetcher.ts`) for unit tests
  and the recorded answers in `fixtures/responses/` for integration tests.
- Snapshots live in `test/__snapshots__/`. When output changes on purpose, run `npm test -- -u`
  and read the diff before committing. A change to the terminal output also needs `npm run demo`.

## Adding to the publisher policy

`data/publisher-policy.json` lists SDKs that stop publishing to CocoaPods before trunk does. Every
entry needs:

- `source`: an https page from the publisher that says so, in its own words;
- `checked`: the date you read it;
- `includesSubdependencies: true` only if the source says the stop covers dependencies too.

Bump `dataVersion` to the date of your change. `npm test` validates the file against the schema;
`data/publisher-policy.schema.json` is generated from the zod schema with
`UPDATE_SCHEMA=1 npm test`.

## Wording

podexit reports facts with sources. Builds keep working after December 2; do not write that pods
"break" or "fail", and do not add claims without a source. The hygiene check in CI rejects
unverifiable superlatives.

## Commits and pull requests

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `docs:`,
`test:`, `refactor:`, `build:`, `ci:`, `chore:`), one topic per pull request, and an entry under
"Unreleased" in [CHANGELOG.md](CHANGELOG.md) for anything a user would notice.

## Releases

Maintainers bump `version` in `package.json`, move the "Unreleased" entries under the new version
in `CHANGELOG.md`, and push a `v<version>` tag. The release workflow checks, packs and publishes;
see the comment at the top of `.github/workflows/release.yml`.

## License

By contributing, you agree that your contributions are licensed under the [MIT license](LICENSE).
