# podexit report

CocoaPods trunk goes read-only on **2026-12-02**, after a trial run from 2026-11-01 to 2026-11-07 ([announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)). Builds keep working: pods already on trunk stay installable after December 2, 2026. Trunk only stops accepting new versions.

## `native-app/Podfile.lock`

native iOS app, 28 pods, 10 in the Podfile.

- 11 frozen on trunk · 15 capped by the publisher · 2 not affected
- 25 pods with a Swift package · 0 without · 2 unknown
- Guide: [Native iOS: CocoaPods to SwiftPM](https://github.com/muhittincamdali/podexit/blob/main/docs/guides/native-ios.md)

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `FirebaseAnalytics` | 12.19.0 | 12.19.0 (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) |  |
| `FirebaseCrashlytics` | 12.19.0 | 12.19.0 (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) |  |
| `FirebaseCore` | 12.19.0 | 12.19.0 (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) | `FirebaseAnalytics +4` |
| `FirebaseCoreExtension` | 12.19.0 | 12.19.0 (2026-09-09) | capped with Firebase | [yes](https://github.com/firebase/firebase-ios-sdk) | `FirebaseSessions` |
| `FirebaseCoreInternal` | 12.19.0 | 12.19.0 (2026-09-09) | capped with Firebase | [yes](https://github.com/firebase/firebase-ios-sdk) | `FirebaseCore` |
| `FirebaseInstallations` | 12.19.0 | 12.19.0 (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) | `FirebaseAnalytics +2` |
| `FirebaseRemoteConfigInterop` | 12.19.0 | 12.19.0 (2026-09-09) | capped with Firebase | [yes](https://github.com/firebase/firebase-ios-sdk) | `FirebaseCrashlytics` |
| `FirebaseSessions` | 12.19.0 | 12.19.0 (2026-09-09) | capped with Firebase | [yes](https://github.com/firebase/firebase-ios-sdk) | `FirebaseCrashlytics` |
| `GoogleAdsOnDeviceConversion` | 3.7.0 | 3.7.0 (2026-09-01) | capped with Firebase | unknown | `GoogleAppMeasurement` |
| `GoogleAppMeasurement` | 12.19.0 | 12.19.0 (2026-09-09) | capped with Firebase | unknown | `FirebaseAnalytics` |
| `GoogleDataTransport` | 10.1.1 | 10.1.1 (2026-07-31) | capped with Firebase | [yes](https://github.com/google/GoogleDataTransport) | `FirebaseCrashlytics +1` |
| `GoogleUtilities` | 8.1.4 | 8.1.5 (2026-10-14) | capped with Firebase | [yes](https://github.com/google/GoogleUtilities) | `AppCheckCore +8` |
| `nanopb` | 3.30910.0 | 3.30910.0 (2024-07-09) | capped with Firebase | [yes](https://github.com/nanopb/nanopb) | `FirebaseAnalytics +5` |
| `PromisesObjC` | 2.4.1 | 2.4.1 (2026-06-09) | capped with Firebase | [yes](https://github.com/google/promises) | `AppCheckCore +4` |
| `PromisesSwift` | 2.4.1 | 2.4.1 (2026-06-09) | capped with Firebase | [yes](https://github.com/google/promises) | `AppCheckCore +1` |
| `Alamofire` | 5.12.2 | 5.12.2 (2026-09-10) | frozen after Dec 2 | [yes](https://github.com/Alamofire/Alamofire) |  |
| `GoogleSignIn` | 9.2.0 | 10.0.0 (2026-09-04) | frozen after Dec 2 | [yes](https://github.com/google/GoogleSignIn-iOS) |  |
| `Kingfisher` | 8.13.0 | 8.13.0 (2026-09-23) | frozen after Dec 2 | [yes](https://github.com/onevcat/Kingfisher) |  |
| `lottie-ios` | 4.6.1 | 4.6.1 (2026-06-13) | frozen after Dec 2 | [yes](https://github.com/airbnb/lottie-ios) |  |
| `MBProgressHUD` | 1.2.0 | 1.2.0 (2020-01-13) | frozen after Dec 2 | [yes](https://github.com/matej/MBProgressHUD) |  |
| `SnapKit` | 5.7.1 | 5.7.1 (2024-02-18) | frozen after Dec 2 | [yes](https://github.com/SnapKit/SnapKit) |  |
| `AppAuth` | 2.1.0 | 3.0.0 (2026-08-24) | frozen after Dec 2 | [yes](https://github.com/openid/AppAuth-iOS) | `GTMAppAuth +1` |
| `AppCheckCore` | 11.3.2 | 11.3.2 (2026-09-14) | frozen after Dec 2 | [yes](https://github.com/google/app-check) | `GoogleSignIn` |
| `GTMAppAuth` | 5.0.0 | 6.0.0 (2026-08-28) | frozen after Dec 2 | [yes](https://github.com/google/GTMAppAuth) | `GoogleSignIn` |
| `GTMSessionFetcher` | 3.5.0 | 5.3.1 (2026-08-04) | frozen after Dec 2 | [yes](https://github.com/google/gtm-session-fetcher) | `GTMAppAuth +1` |
| `RecaptchaInterop` | 101.0.0 | 101.0.0 (2024-12-06) | frozen after Dec 2 | [yes](https://github.com/google/interop-ios-for-google-sdks) | `AppCheckCore` |

<details>
<summary>2 pods from local paths, git or private specs (not affected)</summary>

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `AppCore` | 0.1.0 |  | not affected | - |  |
| `SwiftyJSON` | 5.0.2 |  | not affected | [yes](https://github.com/SwiftyJSON/SwiftyJSON) |  |

</details>

<sub>podexit 0.0.0-snapshot, 2026-10-14, offline, publisher data 2026.10.14</sub>
