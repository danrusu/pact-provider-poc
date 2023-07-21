const { getProduct, getProducts } = require('./ProductController');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:1112' }));

// routes
app
  .get('/health', healthCheck)
  .get('/products', getProducts)
  .get('/products/:productId', getProduct);

const port = process.env.PORT || 1113;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

function healthCheck(_req, res) {
  res.status(200).send({
    healthy: true,
  });
}
