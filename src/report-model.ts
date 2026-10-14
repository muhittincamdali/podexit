// The shape of a podexit report: what analyzeLockfile() returns and what the JSON format prints.
// Kept apart from the analysis so the renderers depend on the data, not on how it is gathered.
import type { SwiftPackageStatus, UpdateStatus } from './core/classify.js';
import type { PodSource } from './core/lockfile.js';
import type { Publisher } from './core/policy.js';
import type { ProjectKind } from './core/project.js';
import type { TIMELINE } from './core/timeline.js';

/** Version of the JSON report layout. It stays 0 until the layout is declared stable in 1.0. */
export const SCHEMA_VERSION = 0;

export interface UpdatesReport {
  status: UpdateStatus;
  summary: string;
  /** Newest release on trunk; null when trunk was not asked or did not answer. */
  latestOnTrunk: string | null;
  latestReleasedAt: string | null;
  lockedReleasedAt: string | null;
  /** True when trunk has a newer release than the locked version. */
  behindTrunk: boolean | null;
  /** For a pod capped as a subdependency: the listed pod that pulls it in. */
  via?: string;
  publisher?: Pick<Publisher, 'id' | 'name' | 'lastMajorOnCocoaPods' | 'source'>;
}

export interface SwiftPackageReport {
  status: SwiftPackageStatus;
  summary: string;
  /** Repository that holds (or lacks) the Package.swift. */
  repository: string | null;
  /** Whether Package.swift also exists at the locked version's tag; null when not checked. */
  atLockedVersion: boolean | null;
  /** Where the answer comes from. */
  via: 'upstream' | 'publisher' | null;
}

export interface PodReport {
  name: string;
  version: string;
  subspecs: string[];
  direct: boolean;
  requiredBy: string[];
  source: PodSource;
  updates: UpdatesReport;
  swiftPackage: SwiftPackageReport;
}

export interface Summary {
  pods: number;
  direct: number;
  frozenOnTrunk: number;
  capped: number;
  notAffected: number;
  unknown: number;
  spmAvailable: number;
  noSpm: number;
  spmUnknown: number;
}

export interface LockfileReport {
  path: string;
  project: ProjectKind;
  guide: { title: string; path: string };
  cocoapodsVersion: string | null;
  summary: Summary;
  pods: PodReport[];
}

export interface Report {
  schemaVersion: typeof SCHEMA_VERSION;
  tool: { name: 'podexit'; version: string };
  generatedAt: string;
  offline: boolean;
  timeline: typeof TIMELINE;
  policyDataVersion: string;
  notes: string[];
  lockfiles: LockfileReport[];
}
