# Fixtures

Five real projects, one per kind of app podexit recognises, and the network answers recorded for
them. The tests and the demo run against these files only, so they work without a network and
give the same result every time.

| Folder                           | Lockfile                   | Made with                                                                                                                                                                               |
| -------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [native-app](native-app)         | `Podfile.lock`             | A hand-written [Podfile](native-app/Podfile): Alamofire, Kingfisher, SnapKit, Lottie, MBProgressHUD, Firebase Analytics and Crashlytics, Google Sign-In, a git pod and a local path pod |
| [flutter-app](flutter-app)       | `ios/Podfile.lock`         | `flutter create` (Flutter 3.41.5) with the plugins in [pubspec.yaml](flutter-app/pubspec.yaml), Swift Package Manager turned off for the project                                        |
| [flutter-plugin](flutter-plugin) | `example/ios/Podfile.lock` | `flutter create --template=plugin`, with SDWebImage and SDWebImageWebPCoder added to the [podspec](flutter-plugin/ios/image_cache_plugin.podspec)                                       |
| [expo-app](expo-app)             | `ios/Podfile.lock`         | `create-expo-app` (Expo SDK 57, React Native 0.86.3), the native modules in [package.json](expo-app/package.json), then `expo prebuild -p ios`                                          |
| [rn-app](rn-app)                 | `ios/Podfile.lock`         | `@react-native-community/cli init` (React Native 0.87.1) with the libraries in [package.json](rn-app/package.json)                                                                      |
| [responses](responses)           | -                          | Answers from cdn.cocoapods.org, trunk.cocoapods.org and raw.githubusercontent.com, one JSON file per request                                                                            |

Every lockfile was resolved by CocoaPods 1.16.2 on 14 October 2026. Only the files podexit reads
(and the manifests that explain them) are kept; the generated Xcode projects and `node_modules`
are not.

## Re-recording

```sh
npm run build
npm run fixtures:record   # replaces fixtures/responses
npm test -- -u            # updates the snapshots; review the diff before committing
```

A recorded answer keeps its `fetchedAt` date, so the snapshots describe trunk and GitHub as they
were on that day. Newer releases upstream change the "Latest on trunk" column after re-recording,
which is expected.
