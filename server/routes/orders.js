const { Router } = require("express");
const router = Router();
const { clientsProvider, ordersProvider } = require("../providers");

module.exports = (jwtAuth, sendNewOrder) => {
  router.get("/active", jwtAuth, async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const orders = await ordersProvider.getAllActive();
        return res.status(200).json(orders);
      }
      return res.status(401).json({ message: "access denied" });
    } catch (e) {
      next(e);
    }
  });
  router.get("/completed", jwtAuth, async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const offset = limit * (page - 1);
        const orders = await ordersProvider.getAllInactive(limit, offset);
        return res.status(200).json(orders);
      }
      return res.status(401).json({ message: "access denied" });
    } catch (e) {
      next(e);
    }
  });
  router.post("/", async (req, res) => {
    try {
      const { firstName, email, phoneNumber, adress, products, price } =
        req.body;
      const order = await ordersProvider.create(
        firstName,
        email,
        phoneNumber,
        adress,
        products,
        price
      );
      const fullOrder = await ordersProvider.getOneById(order.id);
      sendNewOrder(fullOrder);
      return res.status(201).json(fullOrder);
    } catch (e) {
      next(e);
    }
  });
  return router.patch("/:id", jwtAuth, async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const [affected, order] = await ordersProvider.setInactive(
          req.params.id
        );
        return res.status(200).json([affected, order]);
      }
      return res.status(401).json({ message: "access denied" });
    } catch (e) {
      next(e);
    }
  });
};
