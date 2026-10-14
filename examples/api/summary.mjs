// Runs the podexit analysis from JavaScript and prints one line per lockfile.
//
//   node examples/api/summary.mjs [Podfile.lock ...]
//
// Without arguments it reads the five fixtures offline, from the answers recorded in
// fixtures/responses, so it works without a network. In your own project, install podexit
// (`npm install --save-dev podexit`), pass your lockfile, and swap OfflineFetcher for HttpFetcher.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { analyzeLockfile, CachedFetcher, loadPublisherPolicy, OfflineFetcher } from 'podexit';

const root = fileURLToPath(new URL('../../', import.meta.url));
const lockfiles = process.argv.slice(2);
const paths =
  lockfiles.length > 0
    ? lockfiles
    : [
        'fixtures/native-app/Podfile.lock',
        'fixtures/flutter-app/ios/Podfile.lock',
        'fixtures/flutter-plugin/example/ios/Podfile.lock',
        'fixtures/expo-app/ios/Podfile.lock',
        'fixtures/rn-app/ios/Podfile.lock',
      ].map((path) => `${root}${path}`);

const policy = loadPublisherPolicy();
const fetcher = new CachedFetcher(new OfflineFetcher(), { directory: `${root}fixtures/responses` });

for (const path of paths) {
  const report = await analyzeLockfile(await readFile(path, 'utf8'), path, { fetcher, policy });
  const { pods, frozenOnTrunk, capped, spmAvailable } = report.summary;
  const name = path.startsWith(root) ? path.slice(root.length) : path;
  console.log(
    `${name}: ${report.project}, ${pods} pods, ${frozenOnTrunk} frozen, ${capped} capped, ${spmAvailable} with a Swift package`,
  );
}
