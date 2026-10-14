# What changes on December 2, 2026 (and what doesn't)

CocoaPods trunk, the public registry behind `pod install`, stops accepting new podspecs. This page
lists what that means for an app that uses CocoaPods today, with the source for each point.

## Timeline

From the [CocoaPods announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/) (first
published 30 November 2024, updated May 2025). The maintainers call these dates "not set in
stone", with room to move later but not earlier.

| When                   | What                                                                        |
| ---------------------- | --------------------------------------------------------------------------- |
| May 2025               | New pods can no longer use `prepare_command`.                               |
| September–October 2026 | A second email to everyone who has published a podspec.                     |
| November 1–7, 2026     | A trial run of read-only mode, "giving automation a chance to break early". |
| December 2, 2026       | Trunk stops accepting new podspecs, permanently.                            |

Firebase leaves earlier: its
[migration page](https://firebase.google.com/docs/ios/cocoapods-deprecation) says Firebase 12 is
the final major version on CocoaPods and that it stops publishing new versions there in
October 2026.

## What keeps working

- **Existing builds.** The Specs repository and the CDN stay online "as long as GitHub and jsDelivr
  continue to exist", and the announcement says the switch "will not break builds". `pod install`
  keeps resolving the versions already published.
- **Pods that do not come from trunk.** Local paths (Flutter plugins, React Native modules from
  `node_modules`), git sources, podspec files and private specs repositories are not affected.
- **Firebase 12 and earlier** stay installable, per the Firebase page.

## What changes

- **No new versions on trunk.** A pod that is only published on trunk gets no more releases
  through CocoaPods after December 2, and that includes security fixes. Its next release, if any,
  ships another way (usually a Swift package).
- **`pod trunk push` fails**, during the trial week and for good from December 2. Release
  pipelines that publish pods need another route; see [Pod authors](pod-authors.md).
- **Capped SDKs fall behind sooner.** After October 2026 new Firebase releases reach Swift Package
  Manager (and the manual download) only.

## How podexit reports it

podexit reads `Podfile.lock` and gives each pod two answers.

| Updates           | Meaning                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `frozen-on-trunk` | Comes from trunk. No new versions after December 2.                                                                |
| `capped`          | The publisher stopped earlier (Firebase: 12.x). Its subdependencies are capped with it when the publisher says so. |
| `not-affected`    | Local path, git, podspec file or private specs repository.                                                         |
| `unknown`         | The lockfile does not say where the pod comes from.                                                                |

| Swift package   | Meaning                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `spm-available` | The upstream GitHub repository has a `Package.swift` (or the publisher documents one).                            |
| `no-spm`        | The upstream GitHub repository has no `Package.swift` on its default branch.                                      |
| `unknown`       | No answer: the source is not on GitHub (for example a binary on dl.google.com), or the network was not available. |
| `not-checked`   | Local and private sources, which podexit does not look up.                                                        |

When a `Package.swift` exists on the default branch but not at the tag you use, the report says
so: moving to the Swift package also means moving to a newer version.

## What to do, in order

1. Run `npx podexit` in the project and keep the Markdown report with the code:
   `npx podexit --format markdown --output podexit.md`.
2. Start with **capped** pods: they stop first. See [Firebase after version 12](firebase.md).
3. Move **frozen** pods that have a Swift package. The guides for
   [native iOS](native-ios.md), [Flutter](flutter.md) and [React Native and Expo](react-native-expo.md)
   cover the steps for each kind of project.
4. For pods with **no Swift package**, decide per pod: ask the maintainers, use a fork that adds
   `Package.swift`, vendor the code, replace the library, or keep the last version from trunk
   knowingly.
