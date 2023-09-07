async function waitForExpectedValue({
  valueSupplierFn,
  valueExpectedConditionFn,
  maxRetries = 1,
  stepTimeout = 1000, //milliseconds
}) {
  function wait(duration) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), duration);
    });
  }
  let success = false;
  let suppliedValue;
  for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
    try {
      console.log(`try ${retryCount + 1}`);
      suppliedValue = await valueSupplierFn();
      if (await valueExpectedConditionFn(suppliedValue)) {
        success = true;
        console.log(
          `Condition met after ~${retryCount * stepTimeout} milliseconds`,
        );
        break;
      }
    } catch (e) {
      console.log(e);
    }
    await wait(stepTimeout);
    console.log(`...waited ${(retryCount + 1) * stepTimeout} ms`);
  }
  console.log(`Last suppliedValue=${suppliedValue}`);
  if (!success) {
    throw new Error(
      `Expected condition not met for ${JSON.stringify(
        {
          valueSupplierFn: valueSupplierFn?.toString(),
          valueExpectedConditionFn: valueExpectedConditionFn?.toString(),
          stepTimeout,
          maxRetries,
        },
        null,
        2,
      )}`,
    );
  }
  return suppliedValue;
}

async function getResults() {
  const response = await fetch('http://localhost:1113/results/5');
  const json = await response.json();
  return json;
}

waitForExpectedValue({
  maxRetries: 5,
  stepTimeout: 100,
  valueSupplierFn: () => getResults(),
  valueExpectedConditionFn: res => res.length == 4,
});
