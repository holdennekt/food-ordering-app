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
    for (const product of products) {
      await Product.create({ ...product, marketId: market.id });
    }
    return market;
  }
}

module.exports = { marketsProvider: new MarketsProvider() };
