const { Router } = require("express");
const routes = Router();

const {
  registerTestController,
  getTestController,
  getQuestionsTestController,
  findTestByIdController,
  updateTestByIdController,
  deleteTestByIdController,
  registerQuestionTestController,
  registerAnswerQuestionTestController,
} = require("../controllers/TestController");

routes.get("/", getTestController);
routes.get("/questions", getQuestionsTestController);

routes.get("/find/:id", findTestByIdController);
routes.post("/registerTest", registerTestController);

routes.delete("/deleteTest/:id",  deleteTestByIdController);
routes.patch("/updateTest/:id",  updateTestByIdController);

routes.post("/registerQuestion", registerQuestionTestController);
routes.post("/registerAnswerQuestion", registerAnswerQuestionTestController);

module.exports = routes;
