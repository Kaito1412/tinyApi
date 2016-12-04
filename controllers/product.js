const Product = require('../models/product');

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error: ${err}` });
    if (!products) {
      return res.status(404).send({ error: 'No products' });
    }

    res.status(200).send({ products });
  });
}

function getProduct(req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: err });
    if (!product) {
      return res
        .status(404)
        .send({ error: `Id ${productId} don't exist` });
    }

    res.status(200).send({ product });
  });
}

function updateProduct(req, res) {
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, product) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send({ product });
  });
}

function deleteProduct(req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ error: err });

    product.remove(err => {
      if (err) return res.status(500).send({ error: err });
      res.status(200)
      .send({ message: 'The product has been deleted' });
    });
  });
}

function saveProduct(req, res) {
  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if (err) res.status(500).send({ error: err });
    res.status(200).send({ product: productStored });
  });
}

module.exports = {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
};
