const { Router } = require("express");
const routes = Router();

const {
  findUserByIdController,
  getUsersController,
} = require("../controllers/UserController");

routes.get("/", getUsersController);
routes.get("/find/:id", findUserByIdController);

module.exports = routes;
