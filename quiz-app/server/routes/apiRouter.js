const app = require("../app");
const express = require("express");

const apiRouter = express.Router();
app.use("/api", apiRouter);

module.exports = apiRouter;