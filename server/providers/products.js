const { Product, Market } = require("../models/db");

class ProductsProvider {
  async getAll() {
    return Product.findAll();
  }

  async getAllForMarket(marketId) {
    return Product.findAll({ where: { marketId } });
  }

  async create(name, img, price, description, marketId) {
    return Product.create({
      name,
      img,
      price,
      description,
      marketId,
    });
  }
}

module.exports = { productsProvider: new ProductsProvider() };
