const { Router } = require("express");
const routes = Router();

const {
  getAllQuestionsController,
  findTopicByIdController,
  findTopicByIdWithQuestionsController,
  getQuestionByIdController,
  createQuestionController,
  createAnswerQuestionController
} = require("../controllers/TopicsController");

const { verifyToken } = require("../middleware/AuthJwt");

//! general routes
routes.get("/", getAllQuestionsController);
routes.get("/findTopic/:id", findTopicByIdController);
routes.get("/findTopicByIdWithQuestions/:id", findTopicByIdWithQuestionsController);
routes.get("/findQuestion/:id",  getQuestionByIdController);
routes.post("/createQuestion", createQuestionController);
routes.post("/createAnswerQuestion", createAnswerQuestionController);

module.exports = routes;
