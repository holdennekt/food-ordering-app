const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const app = express();
const { createServer } = require("http");
const path = require("path");
const cors = require("cors");
const router = require("./routes");
const { sequelize } = require("./models/db");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { adminsProvider } = require("./providers");

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const httpServer = createServer(app);
const wss = new Server(httpServer, { cors: { origin: "*" } });

wss.on("connection", async (socket) => {
  const { token } = socket.handshake.auth;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await adminsProvider.getOneById(payload.id);
  if (!admin) {
    socket.emit("authError");
    return socket.disconnect();
  }
  socket.join("admins");
});

const sendNewOrder = (order) => {
  wss.to("admins").emit("order", order);
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use("/api", router(sendNewOrder));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ message: "Internal error", err });
});

const startApp = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  httpServer.listen(PORT, HOST, () =>
    console.log(`server has started on port ${PORT}`)
  );
};

startApp();
