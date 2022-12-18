const express = require("express");
const apiRouter = require("./apiRouter");

const retriveRouter = express.Router();
apiRouter.use("/retrive", retriveRouter)

module.exports = retriveRouter;