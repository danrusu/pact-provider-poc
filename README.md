# Contract testing POC - Provider

- related repository - [pact-consumer-poc](https://github.com/danrusu/pact-consumer-poc)

## 1. Setup

```powershell
pnpm install
```

## 2. Start Provider

```powershell
pnpm start
```

## 3. Run contract tests using PactFlow.io broker

- setup environment vars

  ```powershell
  export PACT_BROKER_BASE_URL=https://domain.pactflow.io
  export PACT_BROKER_TOKEN=******
  ```

- verify published contract from pactflow.io against provider (start provider first)

  ```powershell
  pnpm start
  pnpm pact:verify
  ```

## 4. [API documentation](https://app.swaggerhub.com/apis-docs/qatools/pact-provider-poc/1.0.0)

- [Open API specification](./api-docs.yaml)

## 5. [Pact CLI](https://hub.docker.com/r/pactfoundation/pact-cli)

- Verify Pact and publish results to Pactflow (consumer driven contract testing)
  - **[<em style="color:red">Consumer version selectors</span>](https://docs.pact.io/pact_broker/advanced_topics/consumer_version_selectors)**</em>

```powershell
$hash=git rev-parse --short head
docker run `
  --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest verify `
  --consumer-version-selector '{\"mainBranch\": true, \"deployedOrReleased\": true}'`
  --provider "pact-provider-poc" `
  --provider-app-version $hash `
  --provider-base-url http://host.docker.internal:1113 `
  --publish-verification-results `
  --enable-pending `
  --fail-if-no-pacts-found
```

- [Publish OpenApi provider contract](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas/) (bidirectional contract testing)

```powershell
$hash=git rev-parse --short head
$branch=git rev-parse --abbrev-ref head
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL  `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pactflow publish-provider-contract api-docs.yaml `
  --provider "pact-provider-poc" `
  --provider-app-version $hash `
  --branch $branch `
  --content-type application/yaml
  # to also verify contract uncomment next lines
  #--verifier postman `
  #--verification-exit-code=0
  #--verification-results postman-verification-summary.json `
  #--verification-results-content-type text/plain
```

- Can I deploy

```powershell
$hash=git rev-parse --short head
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pact-broker can-i-deploy `
  --pacticipant pact-provider-poc `
  --version $hash `
  --to-environment test
```

- Record deployment/release

```powershell
$hash=git rev-parse --short head
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pact-broker record-deployment `
  --pacticipant pact-provider-poc `
  --version $hash `
  --environment test
```
