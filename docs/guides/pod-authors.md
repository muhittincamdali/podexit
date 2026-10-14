# Pod authors: replacing `pod trunk push`

If you publish a pod, two dates matter (from the
[CocoaPods announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)):

- **November 1–7, 2026:** a trial run of read-only mode. `pod trunk push` in a release pipeline is
  expected to fail that week; that is the point of the trial.
- **December 2, 2026:** trunk stops accepting new podspecs for good.

Your published versions stay installable. New versions need another channel.

## 1. Ship a Swift package

1. Add a `Package.swift` at the repository root with a library product named like your pod, so
   users find it. See the
   [Swift Package Manager documentation](https://www.swift.org/documentation/package-manager/).
2. Build it in CI on the platforms you support (`swift build`, or `xcodebuild` with the package
   scheme for iOS).
3. Tag releases with semantic version numbers (`1.4.0`).
4. List it on the [Swift Package Index](https://swiftpackageindex.com/add-a-package).

podexit checks `Package.swift` on your default branch and at the tag a user has locked, and tells
them when the Swift package starts at a later version. Tagging the release that adds
`Package.swift` clearly helps them.

## 2. Change the release pipeline

- Remove the `pod trunk push` step, or make it non-blocking until the trial week, then remove it.
- Keep the `.podspec` in the repository: users can still point CocoaPods at a tag directly:

  ```ruby
  pod 'YourKit', :git => 'https://github.com/you/YourKit.git', :tag => '1.4.0'
  ```

- If many users stay on CocoaPods, you can publish podspecs to a specs repository you host
  (`pod repo push`); see
  [Private Pods](https://guides.cocoapods.org/making/private-cocoapods.html). Those users then add
  your specs repository as a `source` in their Podfile.

## 3. Tell your users

Say in the README and release notes where new versions go after December 2, and which version is
the last one on trunk.

## In podexit

An author mode that reads a podspec and writes a `Package.swift` starting point, and checks the
release pipeline for `pod trunk push`, is planned for podexit 0.8.
