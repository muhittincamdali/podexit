# Firebase after version 12

From the [Firebase migration page](https://firebase.google.com/docs/ios/cocoapods-deprecation)
(last updated 13 October 2026):

- "Firebase 12 is the final major version published to CocoaPods, and Firebase will stop
  publishing new versions to CocoaPods in October 2026."
- The change covers 20 listed pods (`Firebase`, `FirebaseAnalytics`, `FirebaseCore`,
  `FirebaseCrashlytics`, `FirebaseMessaging` and others) "and their subdependencies".
- Existing versions, 12 and earlier, stay installable. New features and fixes ship through Swift
  Package Manager and the manual XCFramework download only.

## What podexit shows

The listed pods are `capped at 12.x`. Pods they depend on (FirebaseCoreInternal, FirebaseSessions,
GoogleUtilities, nanopb and so on) are `capped with Firebase`, with the listed pod that pulls them
in. From the native-app fixture:

```text
FirebaseAnalytics     12.19.0  capped at 12.x        yes (Firebase)
FirebaseCoreInternal  12.19.0  capped with Firebase  yes             FirebaseCore
GoogleUtilities       8.1.4    capped with Firebase  yes             AppCheckCore +8
```

The list of pods, the version cap, the date and the source URL live in
[`data/publisher-policy.json`](../../data/publisher-policy.json); every entry must cite its source.

## Native apps

1. In Xcode, add `https://github.com/firebase/firebase-ios-sdk` as a package dependency.
2. Add the products you used as pods (`FirebaseAnalytics`, `FirebaseCrashlytics`, …) to your app
   target. The package brings GoogleAppMeasurement, GoogleUtilities, GoogleDataTransport, nanopb
   and Promises itself.
3. Remove the Firebase pods from the `Podfile` and run `pod install`.

If some of your other dependencies cannot leave CocoaPods yet, Firebase recommends the manual
XCFramework installation over mixing CocoaPods and Swift Package Manager in one target.

## Flutter and React Native

- **FlutterFire:** Firebase says updating to the latest FlutterFire moves the Apple side to Swift
  Package Manager automatically. See [Flutter apps and plugins](flutter.md).
- **React Native Firebase:** version 26 declares the Firebase SDK with `spm_dependency`, so its
  lockfile has no Firebase pods (see the rn-app fixture). See [React Native and Expo](react-native-expo.md).

## Staying on CocoaPods for now

Firebase 12 keeps installing. Pin the version you test with (`pod 'FirebaseAnalytics', '~> 12.19'`)
so a `pod update` does not surprise you, and plan the move: fixes after October 2026 will not reach
it.
