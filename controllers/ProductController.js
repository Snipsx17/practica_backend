const createError = require('http-errors');
const Advert = require('../models/Advert');

class ProductController {
  async productDetail(req, res, next) {
    const productId = req.params.productId;
    if (!productId) {
      next(createError(404));
      return;
    }

    const productData = await Advert.findById(productId).catch((error) =>
      next(createError(404, 'Product not found'))
    );

    res.locals.product = productData;
    res.render('product-detail');
  }
}

module.exports = ProductController;
