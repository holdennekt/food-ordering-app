const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

module.exports = (localAuth, jwtAuth) => {
  router.post("/login", localAuth, (req, res) => {
    const { id, name } = req.user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET);
    return res.json({ token });
  });
  return router.post("/verifyJwt", jwtAuth, (req, res) => {
    if (req.isAuthenticated()) {
      const { id, name } = req.user;
      const token = jwt.sign({ id, name }, process.env.JWT_SECRET);
      return res.json({ token });
    }
    return res.status(401).json({ message: "access denied" });
  });
};
