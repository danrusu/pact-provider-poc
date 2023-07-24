# Contract testing POC - Producer

## 1. Setup

```powershell
pnpm install
```

## 2. Start Producer

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

```powershell
docker run `
  --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest verify `
  --provider pact-provider-poc `
  --provider-base-url http://host.docker.internal:1113 `
  --provider-app-version 1.0.0 `
  --publish-verification-results
```

- [Publish OpenApi provider contract](https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas/) (bidirectional contract testing)

```powershell
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL  `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pactflow publish-provider-contract api-docs.yaml `
  --provider "pact-provider-poc" `
  --provider-app-version 1.0.0 `
  --branch master `
  --content-type application/yaml
  # to also verify contract uncomment next lines
  #--verifier postman `
  #--verification-exit-code=0
  #--verification-results postman-verification-summary.json `
  #--verification-results-content-type text/plain
```

- Can I deploy

```powershell
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pact-broker can-i-deploy `
  --pacticipant pact-producer-poc `
  --version 1.0.0 `
  --to-environment test
```

- Record deployment/release

```powershell
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pact-broker record-deployment `
  --pacticipant pact-provider-poc `
  --version 1.0.0 `
  --environment test
```
