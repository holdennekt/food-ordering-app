const { Market, Product } = require("../models/db");

class MarketsProvider {
  async getAll() {
    return Market.findAll({
      include: [{ model: Product, as: "productItems" }],
      order: [
        ["num", "ASC"],
        [{ model: Product, as: "productItems" }, "num", "ASC"],
      ],
    });
  }

  async create(name, products) {
    const market = await Market.create({ name });
    products.forEach((product) =>
      Product.create({ ...product, marketId: market.id })
    );
    return market;
  }
}

module.exports = { marketsProvider: new MarketsProvider() };
