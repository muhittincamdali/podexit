import type { LockedPod } from './lockfile.js';

/** The kind of project a Podfile.lock belongs to; it decides which migration guide applies. */
export type ProjectKind = 'native' | 'flutter-app' | 'flutter-plugin' | 'react-native' | 'expo';

export const GUIDES: Record<ProjectKind, { title: string; path: string }> = {
  native: { title: 'Native iOS: CocoaPods to SwiftPM', path: 'docs/guides/native-ios.md' },
  'flutter-app': { title: 'Flutter apps and plugins', path: 'docs/guides/flutter.md' },
  'flutter-plugin': { title: 'Flutter apps and plugins', path: 'docs/guides/flutter.md' },
  'react-native': { title: 'React Native and Expo', path: 'docs/guides/react-native-expo.md' },
  expo: { title: 'React Native and Expo', path: 'docs/guides/react-native-expo.md' },
};

const EXAMPLE_APP = /(?:^|[\\/])example[\\/]ios[\\/]Podfile\.lock$/;

/**
 * Detects the project kind from the pods CocoaPods installed: Flutter apps have a `Flutter` pod
 * from a local path, React Native apps have `React-Core`, and Expo apps add `ExpoModulesCore`.
 * A Flutter lockfile under `example/ios/` is a plugin's example app.
 */
export function detectProjectKind(pods: readonly LockedPod[], lockfilePath = ''): ProjectKind {
  const names = new Set(pods.map(({ name }) => name));
  const flutter = pods.some(({ name, source }) => name === 'Flutter' && source.kind === 'path');
  if (flutter) return EXAMPLE_APP.test(lockfilePath) ? 'flutter-plugin' : 'flutter-app';
  if (names.has('ExpoModulesCore') || names.has('Expo')) return 'expo';
  if (names.has('React-Core') || names.has('React')) return 'react-native';
  return 'native';
}
