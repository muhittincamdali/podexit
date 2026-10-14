// Writes the Homebrew formula for one published npm version. The release workflow runs it with the
// registry tarball's SHA-256 and opens a pull request on muhittincamdali/homebrew-tap:
//
//   node scripts/homebrew-formula.ts 0.1.0 <sha256> > Formula/podexit.rb
import { fileURLToPath } from 'node:url';

export interface FormulaInput {
  version: string;
  /** SHA-256 of https://registry.npmjs.org/podexit/-/podexit-<version>.tgz */
  sha256: string;
}

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const SHA256 = /^[0-9a-f]{64}$/;

export const DESCRIPTION = 'Show which CocoaPods stop getting updates when trunk goes read-only';

export function formula({ version, sha256 }: FormulaInput): string {
  if (!SEMVER.test(version)) throw new Error(`Not a version: ${version}`);
  if (!SHA256.test(sha256)) throw new Error(`Not a SHA-256: ${sha256}`);
  return `class Podexit < Formula
  desc "${DESCRIPTION}"
  homepage "https://github.com/muhittincamdali/podexit"
  url "https://registry.npmjs.org/podexit/-/podexit-${version}.tgz"
  sha256 "${sha256}"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink libexec.glob("bin/*")
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/podexit --version")

    (testpath/"Podfile.lock").write <<~EOS
      PODS:
        - AppCore (1.0.0)

      DEPENDENCIES:
        - AppCore (from \`../AppCore\`)

      EXTERNAL SOURCES:
        AppCore:
          :path: "../AppCore"

      COCOAPODS: 1.16.2
    EOS
    output = shell_output("#{bin}/podexit --offline --all --cache-dir #{testpath}/cache")
    assert_match "not affected", output
  end
end
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [version = '', sha256 = ''] = process.argv.slice(2);
  process.stdout.write(formula({ version, sha256 }));
}
