#!/bin/sh
# Lists the trunk pods that stop getting updates and have no known Swift package: the ones that
# need a decision. Needs jq. Run it in a project folder (or pass paths, as for podexit itself).
#
#   sh examples/shell/frozen-pods.sh
#   sh examples/shell/frozen-pods.sh fixtures/flutter-plugin --offline --cache-dir fixtures/responses
set -eu

npx --yes podexit --format json "$@" | jq -r '
  .lockfiles[]
  | .path as $lockfile
  | .pods[]
  | select(.updates.status == "frozen-on-trunk" or .updates.status == "capped")
  | select(.swiftPackage.status != "spm-available")
  | "\($lockfile)\t\(.name) \(.version)\t\(.updates.status)\t\(.swiftPackage.summary)"
'
