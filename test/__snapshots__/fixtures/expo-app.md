# podexit report

CocoaPods trunk goes read-only on **2026-12-02**, after a trial run from 2026-11-01 to 2026-11-07 ([announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)). Builds keep working: pods already on trunk stay installable after December 2, 2026. Trunk only stops accepting new versions.

## `expo-app/ios/Podfile.lock`

Expo app, 100 pods, 96 in the Podfile.

- 4 frozen on trunk · 0 capped by the publisher · 96 not affected
- 4 pods with a Swift package · 0 without · 0 unknown
- Guide: [React Native and Expo](https://github.com/muhittincamdali/podexit/blob/main/docs/guides/react-native-expo.md)

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `lottie-ios` | `4.6.0` | `4.6.1` (2026-06-13) | frozen after Dec 2 | [yes](https://github.com/airbnb/lottie-ios) | `lottie-react-native` |
| `PurchasesHybridCommon` | `19.11.0` | `19.12.0` (2026-10-13) | frozen after Dec 2 | [yes](https://github.com/revenuecat/purchases-hybrid-common) | `RNPurchases` |
| `RevenueCat` | `5.95.0` | `5.95.0` (2026-10-12) | frozen after Dec 2 | [yes](https://github.com/revenuecat/purchases-ios) | `PurchasesHybridCommon` |
| `Sentry` | `8.58.0` | `9.19.1` (2026-07-01) | frozen after Dec 2 | [yes](https://github.com/getsentry/sentry-cocoa) | `RNSentry` |

<details>
<summary>96 pods from local paths, git or private specs (not affected)</summary>

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `EXApplication` | `57.0.3` |  | not affected | - |  |
| `EXConstants` | `57.0.22` |  | not affected | - |  |
| `Expo` | `57.0.29` |  | not affected | - |  |
| `ExpoAsset` | `57.0.20` |  | not affected | - |  |
| `ExpoCamera` | `57.0.6` |  | not affected | - |  |
| `ExpoCameraBarcodeScanning` | `57.0.6` |  | not affected | - |  |
| `ExpoDomWebView` | `57.0.1` |  | not affected | - |  |
| `ExpoFileSystem` | `57.0.7` |  | not affected | - |  |
| `ExpoFont` | `57.0.4` |  | not affected | - |  |
| `ExpoImage` | `57.0.5` |  | not affected | - |  |
| `ExpoKeepAwake` | `57.0.2` |  | not affected | - |  |
| `ExpoLogBox` | `57.0.4` |  | not affected | - |  |
| `ExpoModulesCore` | `57.0.23` |  | not affected | - |  |
| `ExpoModulesJSI` | `57.1.2` |  | not affected | - |  |
| `ExpoModulesWorklets` | `57.0.23` |  | not affected | - |  |
| `ExpoNotifications` | `57.0.23` |  | not affected | - |  |
| `ExpoSecureStore` | `57.0.4` |  | not affected | - |  |
| `FBLazyVector` | `0.86.3` |  | not affected | - |  |
| `hermes-engine` | `250829098.0.17` |  | not affected | - |  |
| `lottie-react-native` | `7.3.8` |  | not affected | - |  |
| `RCTDeprecation` | `0.86.3` |  | not affected | - |  |
| `RCTRequired` | `0.86.3` |  | not affected | - |  |
| `RCTSwiftUI` | `0.86.3` |  | not affected | - |  |
| `RCTSwiftUIWrapper` | `0.86.3` |  | not affected | - |  |
| `RCTTypeSafety` | `0.86.3` |  | not affected | - |  |
| `React` | `0.86.3` |  | not affected | - |  |
| `React-callinvoker` | `0.86.3` |  | not affected | - |  |
| `React-Core` | `0.86.3` |  | not affected | - |  |
| `React-Core-prebuilt` | `0.86.3` |  | not affected | - |  |
| `React-CoreModules` | `0.86.3` |  | not affected | - |  |
| `React-cxxreact` | `0.86.3` |  | not affected | - |  |
| `React-debug` | `0.86.3` |  | not affected | - |  |
| `React-defaultsnativemodule` | `0.86.3` |  | not affected | - |  |
| `React-domnativemodule` | `0.86.3` |  | not affected | - |  |
| `React-Fabric` | `0.86.3` |  | not affected | - |  |
| `React-FabricComponents` | `0.86.3` |  | not affected | - |  |
| `React-FabricImage` | `0.86.3` |  | not affected | - |  |
| `React-featureflags` | `0.86.3` |  | not affected | - |  |
| `React-featureflagsnativemodule` | `0.86.3` |  | not affected | - |  |
| `React-graphics` | `0.86.3` |  | not affected | - |  |
| `React-hermes` | `0.86.3` |  | not affected | - |  |
| `React-idlecallbacksnativemodule` | `0.86.3` |  | not affected | - |  |
| `React-ImageManager` | `0.86.3` |  | not affected | - |  |
| `React-intersectionobservernativemodule` | `0.86.3` |  | not affected | - |  |
| `React-jserrorhandler` | `0.86.3` |  | not affected | - |  |
| `React-jsi` | `0.86.3` |  | not affected | - |  |
| `React-jsiexecutor` | `0.86.3` |  | not affected | - |  |
| `React-jsinspector` | `0.86.3` |  | not affected | - |  |
| `React-jsinspectorcdp` | `0.86.3` |  | not affected | - |  |
| `React-jsinspectornetwork` | `0.86.3` |  | not affected | - |  |
| `React-jsinspectortracing` | `0.86.3` |  | not affected | - |  |
| `React-jsitooling` | `0.86.3` |  | not affected | - |  |
| `React-jsitracing` | `0.86.3` |  | not affected | - |  |
| `React-logger` | `0.86.3` |  | not affected | - |  |
| `React-Mapbuffer` | `0.86.3` |  | not affected | - |  |
| `React-microtasksnativemodule` | `0.86.3` |  | not affected | - |  |
| `React-mutationobservernativemodule` | `0.86.3` |  | not affected | - |  |
| `react-native-maps` | `1.27.2` |  | not affected | - |  |
| `React-NativeModulesApple` | `0.86.3` |  | not affected | - |  |
| `React-networking` | `0.86.3` |  | not affected | - |  |
| `React-oscompat` | `0.86.3` |  | not affected | - |  |
| `React-perflogger` | `0.86.3` |  | not affected | - |  |
| `React-performancecdpmetrics` | `0.86.3` |  | not affected | - |  |
| `React-performancetimeline` | `0.86.3` |  | not affected | - |  |
| `React-RCTActionSheet` | `0.86.3` |  | not affected | - |  |
| `React-RCTAnimation` | `0.86.3` |  | not affected | - |  |
| `React-RCTAppDelegate` | `0.86.3` |  | not affected | - |  |
| `React-RCTBlob` | `0.86.3` |  | not affected | - |  |
| `React-RCTFabric` | `0.86.3` |  | not affected | - |  |
| `React-RCTFBReactNativeSpec` | `0.86.3` |  | not affected | - |  |
| `React-RCTImage` | `0.86.3` |  | not affected | - |  |
| `React-RCTLinking` | `0.86.3` |  | not affected | - |  |
| `React-RCTNetwork` | `0.86.3` |  | not affected | - |  |
| `React-RCTRuntime` | `0.86.3` |  | not affected | - |  |
| `React-RCTSettings` | `0.86.3` |  | not affected | - |  |
| `React-RCTText` | `0.86.3` |  | not affected | - |  |
| `React-RCTVibration` | `0.86.3` |  | not affected | - |  |
| `React-rendererconsistency` | `0.86.3` |  | not affected | - |  |
| `React-renderercss` | `0.86.3` |  | not affected | - |  |
| `React-rendererdebug` | `0.86.3` |  | not affected | - |  |
| `React-RuntimeApple` | `0.86.3` |  | not affected | - |  |
| `React-RuntimeCore` | `0.86.3` |  | not affected | - |  |
| `React-runtimeexecutor` | `0.86.3` |  | not affected | - |  |
| `React-RuntimeHermes` | `0.86.3` |  | not affected | - |  |
| `React-runtimescheduler` | `0.86.3` |  | not affected | - |  |
| `React-timing` | `0.86.3` |  | not affected | - |  |
| `React-utils` | `0.86.3` |  | not affected | - |  |
| `React-viewtransitionnativemodule` | `0.86.3` |  | not affected | - |  |
| `React-webperformancenativemodule` | `0.86.3` |  | not affected | - |  |
| `ReactAppDependencyProvider` | `0.86.3` |  | not affected | - |  |
| `ReactCodegen` | `0.86.3` |  | not affected | - |  |
| `ReactCommon` | `0.86.3` |  | not affected | - |  |
| `ReactNativeDependencies` | `0.86.3` |  | not affected | - |  |
| `RNPurchases` | `10.13.0` |  | not affected | - |  |
| `RNSentry` | `7.11.0` |  | not affected | - |  |
| `Yoga` | `0.0.0` |  | not affected | - |  |

</details>

<sub>podexit 0.0.0-snapshot, 2026-10-14, offline, publisher data 2026.10.14</sub>
