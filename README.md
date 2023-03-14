# Contract testing POC - Producer

## 1. Setup

```bash
yarn install
```

## 2. Start Producer

```bash
yarn start
```

## 3. Run contract tests using PactFlow.io broker

- setup environment vars

  ```bash
  export PACT_BROKER_BASE_URL=https://domain.pactflow.io
  export PACT_BROKER_TOKEN=******
  export PACT_PUBLISH_VERIFICATION_RESULTS=true
  export PACT_PRODUCER_TAGS="v2"
  export PACT_CONSUMER_TAGS="test"
  # optional
  export PACT_PRODUCER_MOCK_PORT="1234"
  ```

- verify published contract from pactflow.io against provider (start producer first)

  ```bash
  yarn run pact:verify
  ```

## 4. [API documentation](https://app.swaggerhub.com/apis-docs/DANGINKGO_1/pact-provider-poc/1.0.0)

- [Open API specification](./api-docs.yaml)

## 5. Publish OpenApi provider contract (bidirectional contract testing)

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
  #--verification-results postman-verification-summary.json `
  #--verification-results-content-type text/plain
```
