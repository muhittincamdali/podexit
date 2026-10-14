# Examples

| Example                                                  | What it shows                                                                                      |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [api/summary.mjs](api/summary.mjs)                       | The analysis from JavaScript: one summary line per lockfile, offline from the recorded answers     |
| [shell/frozen-pods.sh](shell/frozen-pods.sh)             | Filtering the JSON report with `jq`: trunk pods that stop getting updates and have no Swift package |
| [github-actions/podexit.yml](github-actions/podexit.yml) | A workflow for an app repository that adds the report to the pull request's job summary            |

Run the first two from the repository root after `npm ci && npm run build`:

```sh
node examples/api/summary.mjs
sh examples/shell/frozen-pods.sh fixtures/flutter-plugin --offline --cache-dir fixtures/responses
```

`summary.mjs` imports `podexit` by name; inside this repository that resolves to the package
itself, so it runs the code you just built. CI runs it on every change.
