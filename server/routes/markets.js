const { Router } = require("express");
const router = Router();
const { marketsProvider } = require("../providers");

module.exports = () =>
  router.get("/", async (req, res) => {
    try {
      return res.json(await marketsProvider.getAll());
    } catch (e) {
      next(e);
    }
  });
