# podexit report

CocoaPods trunk goes read-only on **2026-12-02**, after a trial run from 2026-11-01 to 2026-11-07 ([announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)). Builds keep working: pods already on trunk stay installable after December 2, 2026. Trunk only stops accepting new versions.

## `flutter-app/ios/Podfile.lock`

Flutter app, 29 pods, 10 in the Podfile.

- 7 frozen on trunk · 12 capped by the publisher · 10 not affected
- 17 pods with a Swift package · 0 without · 2 unknown
- Guide: [Flutter apps and plugins](https://github.com/muhittincamdali/podexit/blob/main/docs/guides/flutter.md)

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `Firebase` | `12.19.0` | `12.19.0` (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) | `firebase_core +1` |
| `FirebaseAnalytics` | `12.19.0` | `12.19.0` (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) | `firebase_analytics` |
| `FirebaseCore` | `12.19.0` | `12.19.0` (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) | `Firebase +3` |
| `FirebaseCoreInternal` | `12.19.0` | `12.19.0` (2026-09-09) | capped with Firebase | [yes](https://github.com/firebase/firebase-ios-sdk) | `FirebaseCore` |
| `FirebaseInstallations` | `12.19.0` | `12.19.0` (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) | `FirebaseAnalytics +1` |
| `FirebaseMessaging` | `12.19.0` | `12.19.0` (2026-09-09) | capped at 12.x | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) | `Firebase` |
| `GoogleAdsOnDeviceConversion` | `3.7.0` | `3.7.0` (2026-09-01) | capped with Firebase | unknown | `GoogleAppMeasurement` |
| `GoogleAppMeasurement` | `12.19.0` | `12.19.0` (2026-09-09) | capped with Firebase | unknown | `FirebaseAnalytics` |
| `GoogleDataTransport` | `10.1.1` | `10.1.1` (2026-07-31) | capped with Firebase | [yes](https://github.com/google/GoogleDataTransport) | `FirebaseMessaging` |
| `GoogleUtilities` | `8.1.4` | `8.1.5` (2026-10-14) | capped with Firebase | [yes](https://github.com/google/GoogleUtilities) | `AppCheckCore +7` |
| `nanopb` | `3.30910.0` | `3.30910.0` (2024-07-09) | capped with Firebase | [yes](https://github.com/nanopb/nanopb) | `FirebaseAnalytics +4` |
| `PromisesObjC` | `2.4.1` | `2.4.1` (2026-06-09) | capped with Firebase | [yes](https://github.com/google/promises) | `AppCheckCore +3` |
| `AppAuth` | `2.1.0` | `3.0.0` (2026-08-24) | frozen after Dec 2 | [yes](https://github.com/openid/AppAuth-iOS) | `GTMAppAuth +1` |
| `AppCheckCore` | `11.3.2` | `11.3.2` (2026-09-14) | frozen after Dec 2 | [yes](https://github.com/google/app-check) | `GoogleSignIn` |
| `GoogleSignIn` | `9.2.0` | `10.0.0` (2026-09-04) | frozen after Dec 2 | [yes](https://github.com/google/GoogleSignIn-iOS) | `google_sign_in_ios` |
| `GTMAppAuth` | `5.0.0` | `6.0.0` (2026-08-28) | frozen after Dec 2 | [yes](https://github.com/google/GTMAppAuth) | `GoogleSignIn` |
| `GTMSessionFetcher` | `3.5.0` | `5.3.1` (2026-08-04) | frozen after Dec 2 | [yes](https://github.com/google/gtm-session-fetcher) | `GTMAppAuth +2` |
| `PromisesSwift` | `2.4.1` | `2.4.1` (2026-06-09) | frozen after Dec 2 | [yes](https://github.com/google/promises) | `AppCheckCore` |
| `RecaptchaInterop` | `101.0.0` | `101.0.0` (2024-12-06) | frozen after Dec 2 | [yes](https://github.com/google/interop-ios-for-google-sdks) | `AppCheckCore` |

<details>
<summary>10 pods from local paths, git or private specs (not affected)</summary>

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `firebase_analytics` | `12.6.0` |  | not affected | - |  |
| `firebase_core` | `4.15.0` |  | not affected | - |  |
| `firebase_messaging` | `16.7.0` |  | not affected | - |  |
| `Flutter` | `1.0.0` |  | not affected | - |  |
| `google_sign_in_ios` | `0.0.1` |  | not affected | - |  |
| `image_picker_ios` | `0.0.1` |  | not affected | - |  |
| `shared_preferences_foundation` | `0.0.1` |  | not affected | - |  |
| `sqflite_darwin` | `0.0.4` |  | not affected | - |  |
| `url_launcher_ios` | `0.0.1` |  | not affected | - |  |
| `webview_flutter_wkwebview` | `0.0.1` |  | not affected | - |  |

</details>

<sub>podexit 0.0.0-snapshot, 2026-10-14, offline, publisher data 2026.10.14</sub>
