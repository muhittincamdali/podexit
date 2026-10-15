# Native iOS: CocoaPods to Swift Package Manager

For an app with a `Podfile` next to its Xcode project. The example rows come from the
[native-app fixture](../../fixtures/native-app/Podfile), a real lockfile resolved on
14 October 2026.

## 1. See what you have

```sh
npx @mcamdali/podexit --format markdown --output podexit.md
```

Each trunk pod gets a row like these:

| Pod                    | Locked  | Latest on trunk      | Updates              | Swift package                                                  |
| ---------------------- | ------- | -------------------- | -------------------- | -------------------------------------------------------------- |
| `Alamofire`            | 5.12.2  | 5.12.2 (2026-09-10)  | frozen after Dec 2   | [yes](https://github.com/Alamofire/Alamofire)                  |
| `FirebaseAnalytics`    | 12.19.0 | 12.19.0 (2026-09-09) | capped at 12.x       | [yes (Firebase)](https://github.com/firebase/firebase-ios-sdk) |
| `GoogleAppMeasurement` | 12.19.0 | 12.19.0 (2026-09-09) | capped with Firebase | unknown                                                        |

Pods marked "Pulled in by" are dependencies of other pods. You usually do not add them yourself:
the Swift package of the pod that needs them declares them too.

## 2. Move one pod at a time

For each pod your Podfile lists with a Swift package:

1. In Xcode, choose **File › Add Package Dependencies…** and paste the repository URL from the
   report.
2. Pick a version rule that starts at the version you have locked (for Alamofire above,
   "Up to Next Major Version" from 5.12.2). If the report says the package exists only in newer
   versions, start from the first version that has `Package.swift` and read its changelog.
3. Add the product to your app target. The product name is usually the pod name; check the
   package's `Package.swift` (`.library(name: …)`) when it is not.
4. Remove the pod from the `Podfile` and run `pod install`.
5. Build and run the tests.

Firebase's migration page advises against mixing CocoaPods and Swift Package Manager in the same
target for long ("complex dependency cycles and build errors"), so finish the move per target
rather than leaving it half done.

## 3. Pods without a Swift package

- **Binary pods** (the report says the podspec points to a host such as dl.google.com): check the
  vendor's documentation. Many ship an XCFramework or a separate package repository. For Google's
  analytics binaries, the Firebase package already depends on `GoogleAppMeasurement`.
- **Open-source pods**: look for an open issue or pull request about Swift Package Manager in the
  repository, use a maintained fork that adds `Package.swift`, or vendor the source into your
  project.
- **Abandoned pods**: replace them, or keep the last version from trunk knowing it will not get
  fixes.

## 4. Remove CocoaPods

When the Podfile has no pods left:

```sh
pod deintegrate
rm Podfile Podfile.lock
rm -r Pods
```

Delete the `.xcworkspace` CocoaPods created and open the `.xcodeproj` from now on (unless the
workspace holds other projects you added yourself).

## References

- [Swift Package Manager documentation](https://www.swift.org/documentation/package-manager/)
- [Firebase: Migrate from CocoaPods](https://firebase.google.com/docs/ios/cocoapods-deprecation)
- [What changes on December 2](what-changes.md)
