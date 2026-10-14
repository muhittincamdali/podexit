# podexit report

CocoaPods trunk goes read-only on **2026-12-02**, after a trial run from 2026-11-01 to 2026-11-07 ([announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)). Builds keep working: pods already on trunk stay installable after December 2, 2026. Trunk only stops accepting new versions.

## `rn-app/ios/Podfile.lock`

React Native app, 105 pods, 94 in the Podfile.

- 11 frozen on trunk · 0 capped by the publisher · 94 not affected
- 11 pods with a Swift package · 0 without · 0 unknown
- Guide: [React Native and Expo](https://github.com/muhittincamdali/podexit/blob/main/docs/guides/react-native-expo.md)

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `AppAuth` | `2.1.0` | `3.0.0` (2026-08-24) | frozen after Dec 2 | [yes](https://github.com/openid/AppAuth-iOS) | `GTMAppAuth +1` |
| `AppCheckCore` | `11.3.2` | `11.3.2` (2026-09-14) | frozen after Dec 2 | [yes](https://github.com/google/app-check) | `GoogleSignIn` |
| `GoogleSignIn` | `9.2.0` | `10.0.0` (2026-09-04) | frozen after Dec 2 | [yes](https://github.com/google/GoogleSignIn-iOS) | `RNGoogleSignin` |
| `GoogleUtilities` | `8.1.5` | `8.1.5` (2026-10-14) | frozen after Dec 2 | [yes](https://github.com/google/GoogleUtilities) | `AppCheckCore` |
| `GTMAppAuth` | `5.0.0` | `6.0.0` (2026-08-28) | frozen after Dec 2 | [yes](https://github.com/google/GTMAppAuth) | `GoogleSignIn` |
| `GTMSessionFetcher` | `3.5.0` | `5.3.1` (2026-08-04) | frozen after Dec 2 | [yes](https://github.com/google/gtm-session-fetcher) | `GTMAppAuth +1` |
| `MMKVCore` | `2.4.0` | `2.4.2` (2026-08-21) | frozen after Dec 2 | [yes](https://github.com/Tencent/MMKV) | `NitroMmkv` |
| `PromisesObjC` | `2.4.1` | `2.4.1` (2026-06-09) | frozen after Dec 2 | [yes](https://github.com/google/promises) | `AppCheckCore +1` |
| `PromisesSwift` | `2.4.1` | `2.4.1` (2026-06-09) | frozen after Dec 2 | [yes](https://github.com/google/promises) | `AppCheckCore` |
| `RecaptchaInterop` | `101.0.0` | `101.0.0` (2024-12-06) | frozen after Dec 2 | [yes](https://github.com/google/interop-ios-for-google-sdks) | `AppCheckCore` |
| `TOCropViewController` | `2.8.0` | `3.2.0` (2026-07-28) | frozen after Dec 2 | [yes](https://github.com/TimOliver/TOCropViewController) | `RNImageCropPicker` |

<details>
<summary>94 pods from local paths, git or private specs (not affected)</summary>

| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |
| --- | --- | --- | --- | --- | --- |
| `boost` | `1.84.0` |  | not affected | - |  |
| `DoubleConversion` | `1.1.6` |  | not affected | - |  |
| `fast_float` | `8.0.0` |  | not affected | - |  |
| `FBLazyVector` | `0.87.1` |  | not affected | - |  |
| `fmt` | `12.1.0` |  | not affected | - |  |
| `glog` | `0.3.5` |  | not affected | - |  |
| `hermes-engine` | `250829098.0.17` |  | not affected | - |  |
| `NitroMmkv` | `4.3.2` |  | not affected | - |  |
| `NitroModules` | `0.37.1` |  | not affected | - |  |
| `RCT-Folly` | `2024.11.18.00` |  | not affected | - |  |
| `RCTDeprecation` | `0.87.1` |  | not affected | - |  |
| `RCTRequired` | `0.87.1` |  | not affected | - |  |
| `RCTSwiftUI` | `0.87.1` |  | not affected | - |  |
| `RCTSwiftUIWrapper` | `0.87.1` |  | not affected | - |  |
| `RCTTypeSafety` | `0.87.1` |  | not affected | - |  |
| `React` | `0.87.1` |  | not affected | - |  |
| `React-bridging` | `0.87.1` |  | not affected | - |  |
| `React-callinvoker` | `0.87.1` |  | not affected | - |  |
| `React-Core` | `0.87.1` |  | not affected | - |  |
| `React-Core-prebuilt` | `0.87.1` |  | not affected | - |  |
| `React-CoreModules` | `0.87.1` |  | not affected | - |  |
| `React-cxxreact` | `0.87.1` |  | not affected | - |  |
| `React-cxxstableapi` | `0.87.1` |  | not affected | - |  |
| `React-debug` | `0.87.1` |  | not affected | - |  |
| `React-defaultsnativemodule` | `0.87.1` |  | not affected | - |  |
| `React-domnativemodule` | `0.87.1` |  | not affected | - |  |
| `React-Fabric` | `0.87.1` |  | not affected | - |  |
| `React-FabricComponents` | `0.87.1` |  | not affected | - |  |
| `React-FabricImage` | `0.87.1` |  | not affected | - |  |
| `React-featureflags` | `0.87.1` |  | not affected | - |  |
| `React-featureflagsnativemodule` | `0.87.1` |  | not affected | - |  |
| `React-graphics` | `0.87.1` |  | not affected | - |  |
| `React-hermes` | `0.87.1` |  | not affected | - |  |
| `React-idlecallbacksnativemodule` | `0.87.1` |  | not affected | - |  |
| `React-ImageManager` | `0.87.1` |  | not affected | - |  |
| `React-intersectionobservernativemodule` | `0.87.1` |  | not affected | - |  |
| `React-jserrorhandler` | `0.87.1` |  | not affected | - |  |
| `React-jsi` | `0.87.1` |  | not affected | - |  |
| `React-jsiexecutor` | `0.87.1` |  | not affected | - |  |
| `React-jsinspector` | `0.87.1` |  | not affected | - |  |
| `React-jsinspectorcdp` | `0.87.1` |  | not affected | - |  |
| `React-jsinspectornetwork` | `0.87.1` |  | not affected | - |  |
| `React-jsinspectortracing` | `0.87.1` |  | not affected | - |  |
| `React-jsitooling` | `0.87.1` |  | not affected | - |  |
| `React-jsitracing` | `0.87.1` |  | not affected | - |  |
| `React-logger` | `0.87.1` |  | not affected | - |  |
| `React-Mapbuffer` | `0.87.1` |  | not affected | - |  |
| `React-microtasksnativemodule` | `0.87.1` |  | not affected | - |  |
| `React-mutationobservernativemodule` | `0.87.1` |  | not affected | - |  |
| `react-native-safe-area-context` | `5.10.1` |  | not affected | - |  |
| `react-native-webview` | `14.0.1` |  | not affected | - |  |
| `React-NativeModulesApple` | `0.87.1` |  | not affected | - |  |
| `React-networking` | `0.87.1` |  | not affected | - |  |
| `React-oscompat` | `0.87.1` |  | not affected | - |  |
| `React-perflogger` | `0.87.1` |  | not affected | - |  |
| `React-performancecdpmetrics` | `0.87.1` |  | not affected | - |  |
| `React-performancetimeline` | `0.87.1` |  | not affected | - |  |
| `React-RCTActionSheet` | `0.87.1` |  | not affected | - |  |
| `React-RCTAnimatedModuleProvider` | `0.87.1` |  | not affected | - |  |
| `React-RCTAnimation` | `0.87.1` |  | not affected | - |  |
| `React-RCTAppDelegate` | `0.87.1` |  | not affected | - |  |
| `React-RCTBlob` | `0.87.1` |  | not affected | - |  |
| `React-RCTFabric` | `0.87.1` |  | not affected | - |  |
| `React-RCTFBReactNativeSpec` | `0.87.1` |  | not affected | - |  |
| `React-RCTImage` | `0.87.1` |  | not affected | - |  |
| `React-RCTLinking` | `0.87.1` |  | not affected | - |  |
| `React-RCTNetwork` | `0.87.1` |  | not affected | - |  |
| `React-RCTRuntime` | `0.87.1` |  | not affected | - |  |
| `React-RCTSettings` | `0.87.1` |  | not affected | - |  |
| `React-RCTText` | `0.87.1` |  | not affected | - |  |
| `React-RCTVibration` | `0.87.1` |  | not affected | - |  |
| `React-rendererconsistency` | `0.87.1` |  | not affected | - |  |
| `React-renderercss` | `0.87.1` |  | not affected | - |  |
| `React-rendererdebug` | `0.87.1` |  | not affected | - |  |
| `React-RuntimeApple` | `0.87.1` |  | not affected | - |  |
| `React-RuntimeCore` | `0.87.1` |  | not affected | - |  |
| `React-runtimeexecutor` | `0.87.1` |  | not affected | - |  |
| `React-RuntimeHermes` | `0.87.1` |  | not affected | - |  |
| `React-runtimescheduler` | `0.87.1` |  | not affected | - |  |
| `React-timing` | `0.87.1` |  | not affected | - |  |
| `React-utils` | `0.87.1` |  | not affected | - |  |
| `React-viewtransitionnativemodule` | `0.87.1` |  | not affected | - |  |
| `React-webperformancenativemodule` | `0.87.1` |  | not affected | - |  |
| `ReactAppDependencyProvider` | `0.87.1` |  | not affected | - |  |
| `ReactCodegen` | `0.87.1` |  | not affected | - |  |
| `ReactCommon` | `0.87.1` |  | not affected | - |  |
| `ReactNativeDependencies` | `0.87.1` |  | not affected | - |  |
| `RNFBApp` | `26.4.0` |  | not affected | - |  |
| `RNFBMessaging` | `26.4.0` |  | not affected | - |  |
| `RNGoogleSignin` | `16.1.5` |  | not affected | - |  |
| `RNImageCropPicker` | `0.52.0` |  | not affected | - |  |
| `SocketRocket` | `0.7.1` |  | not affected | - |  |
| `stripe-react-native` | `0.82.0` |  | not affected | - |  |
| `Yoga` | `0.0.0` |  | not affected | - |  |

</details>

<sub>podexit 0.0.0-snapshot, 2026-10-14, offline, publisher data 2026.10.14</sub>
