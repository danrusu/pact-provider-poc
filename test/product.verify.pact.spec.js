const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
const childProcess = require('child_process');

const gitHash = runGitCmd('git rev-parse --short HEAD');
const gitBranch = runGitCmd('git rev-parse --abbrev-ref HEAD');

describe('Pact Verification', () => {
  it('validates the expectations of ProductService', () => {
    const opts = {
      // remote pact - pactflow
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,

      publishVerificationResult: Boolean(
        process.env.CI || process.env.PACT_PUBLISH_VERIFICATION_RESULTS,
      ),

      providerBaseUrl:
        process.env['PROVIDER_BASE_URL'] || 'http://localhost:1113',
      provider: 'pact-provider-poc',
      providerVersion: process.env['PROVIDER_VERSION'] || gitHash,
      branch: gitBranch,

      // match existing contract by tags or consumer version
      consumerVersionSelectors: [
        {
          // (recommended) - Returns the pacts for consumers that configured mainBranch property
          mainBranch: true,
        },
        {
          // (recommended) - Returns the pacts for all versions of the consumer
          // that are currently deployed or released and currently supported in any environment.
          deployedOrReleased: true,
        },
      ],

      logLevel: 'INFO',
    };

    return new Verifier(opts).verifyProvider().then(output => {
      console.log(output);
    });
  });
});

function runGitCmd(cmd) {
  return childProcess.execSync(cmd).toString().trim();
}
