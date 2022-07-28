const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { initPassport } = require("../passport-config");
const { localAuth, jwtAuth } = initPassport(passport);
const adminRouter = require("./admin");
const marketsRouter = require("./markets");
const ordersRouter = require("./orders");

module.exports = (sendNewOrder) => {
  router.use("/admin", adminRouter(localAuth, jwtAuth));
  router.use("/markets", marketsRouter());
  router.use("/orders", ordersRouter(jwtAuth, sendNewOrder));
  return router;
};
