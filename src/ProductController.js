const products = require('../data/products.json');

function getProducts(_req, res) {
  try {
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Failed to get products' });
  }
}

function getProduct(req, res) {
  const productId = parseInt(req.params.productId);
  try {
    const product = { ...products.find(product => product.id === productId) };
    //delete product.currency; // to break pact - missing the following keys: currency
    //product.name = productId; // to break pact - wrong value
    //product.id = '' + productId; // to break pact - wrong type
    res.send(product);
  } catch (e) {
    res.status(500).send({ error: `Failed to get product ${productId}` });
  }
}

module.exports = { getProduct, getProducts };
