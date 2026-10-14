# podexit

CocoaPods trunk goes read-only on December 2, 2026. Builds keep working, but pods published there
never get another version. podexit reads `Podfile.lock` and shows, for each pod, whether it stops
getting updates and whether it already ships a Swift package, for native iOS, Flutter and React
Native/Expo projects.

```sh
npx https://github.com/muhittincamdali/podexit/releases/download/v0.1.0/podexit-0.1.0.tgz
```

podexit is not on npm yet (publishing it there is planned), so `npx podexit` does not work for
now. The command above runs the 0.1.0 release from GitHub; use it wherever these pages say
`npx podexit`.

## Guides

- [What changes on December 2 (and what doesn't)](../guides/what-changes.md)
- [Native iOS: CocoaPods to Swift Package Manager](../guides/native-ios.md)
- [Flutter apps and plugins](../guides/flutter.md)
- [React Native and Expo](../guides/react-native-expo.md)
- [Firebase after version 12](../guides/firebase.md)
- [Pod authors: replacing `pod trunk push`](../guides/pod-authors.md)

## API

The command line is a thin layer over the package's exports, so the same analysis runs from
JavaScript:

```ts
import { analyzeLockfile, buildReport, CachedFetcher, HttpFetcher, loadPublisherPolicy, render } from 'podexit';

const policy = loadPublisherPolicy();
const fetcher = new CachedFetcher(new HttpFetcher({ userAgent: 'my-tool' }), { directory: '.cache' });
const lockfile = await analyzeLockfile(text, 'ios/Podfile.lock', { fetcher, policy });
console.log(render(buildReport([lockfile], { policy, offline: false }), 'markdown'));
```

Start with {@link analyzeLockfile}, {@link buildReport} and {@link render}; the JSON report is
described by {@link Report}. Its `schemaVersion` is 0 until the layout is declared stable in 1.0.

Source, issues and the changelog are on [GitHub](https://github.com/muhittincamdali/podexit).
