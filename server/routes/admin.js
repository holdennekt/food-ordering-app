const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

module.exports = (localAuth, jwtAuth) => {
  router.post("/login", localAuth, (req, res, next) => {
    try {
      const { id, name } = req.user;
      const token = jwt.sign({ id, name }, process.env.JWT_SECRET);
      return res.json({ token });
    } catch (e) {
      next(e);
    }
  });
  return router.post("/verifyJwt", jwtAuth, (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const { id, name } = req.user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET);
        return res.json({ token });
      }
      return res.status(401).json({ message: "access denied" });
    } catch (e) {
      next(e);
    }
  });
};
