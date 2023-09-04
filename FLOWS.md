## Deployment flows for Consumer and Provider to reach the **test** environment

### 1. Consumner feature that does not change the consumer-provider contract

- **precondition** - a contract between consumer master branch and provider master branch is published and verified, and provider master is deployed to **test** environment

- the consumer creates a **PULL REQUEST** from the feature branch

- the **consumer pipeline** runs the contrat tests and publish the generated contract to **Pactflow**

- the contract will already be verified in **Pactflow**, because it did not change

- **can-i-deploy** to **test** will succeed

- **deploy** consumer branch to **test**

- **record deployment** of consumer branch to **test**

### 2. Consumner feature that requires changes in provider that do not break the contract

- **precondition** - a contract between consumer master branch and provider master branch is published and verified, and provider master is deployed to **test** environment

- the consumer creates a **PULL REQUEST** from the feature branch

- the **consumer pipeline** runs the contrat tests and publish the generated contract to **Pactflow**

- **can-i-deploy** to **test** will fail since there is no verification of the contract yet

- provider creates **a feature branch with the same name** as the consumer branch that needs it and crates a PR from it

- **provider pipeline**

  - verifies the PactFlow contracts and publish results for

    - deployed or realeased consumers
    - consumer master branch
    - consumer feature branch with the same name

  - **can-i-deploy** succeds if there are no breaking changes in the contract

  - **deploy** provider feature branch to **test**

- run again **can-i-deploy** to **test** for consumer (contract is now verified)

- **deploy** consumer branch to **test**

- **record deployment** of consumer branch to **test**

### 3. Consumner feature that requires changes in provider that break the contract

- **precondition** - a contract between consumer master branch and provider master branch is published and verified, and provider master is deployed to **test** environment

- the consumer creates a **PULL REQUEST** from the feature branch

- the **consumer pipeline** runs the contrat tests and publish the generated contract to **Pactflow**

- **can-i-deploy** to **test** will fail since there is no verification of the contract yet