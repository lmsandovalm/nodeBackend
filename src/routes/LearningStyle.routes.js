const { Router } = require("express");
const routes = Router();

const {
  getAllLearningStylesController,
  registerController,
} = require("../controllers/LearningStyleController");

routes.get("/", getAllLearningStylesController);
routes.post("/createLearningStyle", registerController);

module.exports = routes;
