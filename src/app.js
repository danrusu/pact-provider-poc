const { getProduct, getProducts } = require('./ProductController');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:1112' }));

let resultsIndex = 0;
let finalResultsIndex = 0;

// routes
app
  .get('/products', getProducts)
  .get('/products/:productId', getProduct)
  .get('/results/:index', getResults);

const port = process.env.PORT || 1113;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

async function getResults(req, res) {
  const index = parseInt(req.params.index);
  console.log(`getResults(${index}, ${resultsIndex})`);
  if (index != finalResultsIndex) {
    finalResultsIndex = index; // reset finalIndex and resultsIndes in case of new index calls
    resultsIndex = 0;
  }
  if (resultsIndex === index) {
    resultsIndex = 0;
    res.send(['this', 'is', 'a', 'test']);
  } else {
    resultsIndex++;
    res.send([]);
  }
}
