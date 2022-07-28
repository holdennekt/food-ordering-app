const { Order, OrderProduct, Product } = require("../models/db");

class OrdersProvider {
  async getAll() {
    return Order.findAll({
      include: [
        {
          model: OrderProduct,
          as: "products",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });
  }

  async getAllActive() {
    return Order.findAll({
      where: { isActive: true },
      include: [
        {
          model: OrderProduct,
          as: "products",
          include: [{ model: Product, as: "product" }],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }

  async getAllInactive(limit, offset) {
    const { count } = await Order.findAndCountAll({
      where: { isActive: false },
      limit,
      offset,
    });
    const orders = await Order.findAndCountAll({
      where: { isActive: false },
      include: [
        {
          model: OrderProduct,
          as: "products",
          include: [{ model: Product, as: "product" }],
        },
      ],
      limit,
      offset,
      order: [["updatedAt", "ASC"]],
    });
    return { count, rows: orders.rows };
  }

  async getOneById(id) {
    return Order.findByPk(id, {
      include: [
        {
          model: OrderProduct,
          as: "products",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });
  }

  async getAllForClient(phoneNumber) {
    return Order.findAll({
      where: { clientPhoneNumber: phoneNumber },
      include: [
        {
          model: OrderProduct,
          as: "products",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });
  }

  async create(
    clientName,
    clientEmail,
    clientPhoneNumber,
    clientAdress,
    products,
    price
  ) {
    const order = await Order.create({
      clientName,
      clientEmail,
      clientPhoneNumber,
      clientAdress,
      price,
    });
    products.forEach((product) => {
      OrderProduct.create({
        count: product.count,
        orderId: order.id,
        productId: product.id,
      });
    });
    return order;
  }

  async setInactive(id) {
    return Order.update({ isActive: false }, { where: { id, isActive: true } })
      .then(async (results) => {
        if (results[0] === 0) return Promise.resolve([0, null]);
        const order = await Order.findByPk(id, {
          include: [
            {
              model: OrderProduct,
              as: "products",
              include: [{ model: Product, as: "product" }],
            },
          ],
        });
        return Promise.resolve([results[0], order]);
      });
  }
}

module.exports = { ordersProvider: new OrdersProvider() };
