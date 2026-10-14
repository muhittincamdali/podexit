# podexit report

CocoaPods trunk goes read-only on **2026-12-02**, after a trial run from 2026-11-01 to 2026-11-07 ([announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)). Builds keep working: pods already on trunk stay installable after December 2, 2026. Trunk only stops accepting new versions.

## `flutter-plugin/example/ios/Podfile.lock`

Flutter plugin example app, 6 pods, 3 in the Podfile.

- 3 frozen on trunk · 0 capped by the publisher · 3 not affected
- 2 pods with a Swift package · 1 without · 0 unknown
- Guide: [Flutter apps and plugins](https://github.com/muhittincamdali/podexit/blob/main/docs/guides/flutter.md)

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `libwebp` | `1.6.0` | `1.6.0` (2026-07-31) | frozen after Dec 2 | [no](https://github.com/webmproject/libwebp) | `SDWebImageWebPCoder` |
| `SDWebImage` | `5.21.7` | `5.21.7` (2026-02-26) | frozen after Dec 2 | [yes](https://github.com/SDWebImage/SDWebImage) | `SDWebImageWebPCoder +1` |
| `SDWebImageWebPCoder` | `0.15.0` | `0.15.0` (2025-11-03) | frozen after Dec 2 | [yes](https://github.com/SDWebImage/SDWebImageWebPCoder) | `image_cache_plugin` |

<details>
<summary>3 pods from local paths, git or private specs (not affected)</summary>

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `Flutter` | `1.0.0` |  | not affected | - |  |
| `image_cache_plugin` | `0.0.1` |  | not affected | - |  |
| `integration_test` | `0.0.1` |  | not affected | - |  |

</details>

<sub>podexit 0.0.0-snapshot, 2026-10-14, offline, publisher data 2026.10.14</sub>
