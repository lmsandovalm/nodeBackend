const { Router } = require("express");
const routes = Router();

const {
  registerTestController,
  getTestController,
  findTestByIdController,
  registerQuestionTestController,
  registerAnswerQuestionTestController,
} = require("../controllers/TestController");

routes.get("/", getTestController);
routes.get("/find/:id", findTestByIdController);
routes.post("/registerTest", registerTestController);
routes.post("/registerQuestion", registerQuestionTestController);
routes.post("/registerAnswerQuestion", registerAnswerQuestionTestController);

module.exports = routes;
