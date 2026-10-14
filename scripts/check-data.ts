// Weekly data check (.github/workflows/data.yml): every source URL in data/publisher-policy.json
// and the CocoaPods announcement must still answer, and entries not re-read for 120 days are
// listed so someone reads the source again. Exits 1 when a source is unreachable.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

interface Publisher {
  id: string;
  source: string;
  checked: string;
  swiftPackage?: { url: string };
}

const STALE_DAYS = 120;
const DAY_MS = 24 * 60 * 60 * 1000;
const root = fileURLToPath(new URL('../', import.meta.url));
const policy = JSON.parse(readFileSync(`${root}data/publisher-policy.json`, 'utf8')) as {
  publishers: Publisher[];
};

const urls = new Map<string, string>([
  ['https://blog.cocoapods.org/CocoaPods-Specs-Repo/', 'CocoaPods announcement'],
]);
for (const publisher of policy.publishers) {
  urls.set(publisher.source, `${publisher.id} source`);
  if (publisher.swiftPackage) urls.set(publisher.swiftPackage.url, `${publisher.id} Swift package`);
}

let failures = 0;
for (const [url, label] of urls) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'podexit data check (+https://github.com/muhittincamdali/podexit)' },
      signal: AbortSignal.timeout(20_000),
    });
    console.log(`${response.ok ? 'ok  ' : 'FAIL'} ${response.status} ${label}: ${url}`);
    if (!response.ok) failures += 1;
  } catch (error) {
    console.log(`FAIL ${label}: ${url} (${(error as Error).message})`);
    failures += 1;
  }
}

const now = Date.now();
for (const publisher of policy.publishers) {
  const age = Math.floor((now - Date.parse(publisher.checked)) / DAY_MS);
  if (age > STALE_DAYS) {
    console.log(`note ${publisher.id}: checked ${age} days ago; read ${publisher.source} again.`);
  }
}
process.exitCode = failures > 0 ? 1 : 0;
