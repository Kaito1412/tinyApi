const Product = require('../models/product');

class ProductCls {

  static getProducts (req, res) {
    Product.find({})
      .then(products => {
        if (!products) {
          return res.status(404).send({ error: 'No products' });
        }

        res.status(200).send({ products });
      }).catch(err => res.status(500).send({ message: `Error: ${err}` }));
  }

  static getProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId).then(product => {
      if (!product) {
        return res
          .status(404)
          .send({ error: `Id ${productId} don't exist` });
      }

      res.status(200).send({ product });
    }).catch(err => res.status(500).send({ message: err }));
  }

  static updateProduct(req, res) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update)
      .then(product => { res.status(200).send({ product }); })
      .catch(err => { res.status(500).send({ error: err }); });
  }

  static deleteProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId)
      .then(product => product.remove())
      .then(() => res.status(200).send({ message: 'The product has been deleted' }))
      .catch(err => res.status(500).send({ error: err }));
  }

  static saveProduct(req, res) {
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save()
      .then(productStored => res.status(200).send({ product: productStored }))
      .catch(err => res.status(500).send({ error: err }));
  }
}

module.exports = ProductCls;
