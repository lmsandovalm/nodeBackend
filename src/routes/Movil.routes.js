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
routes.post("/createQuestion", verifyToken, createQuestionController);
routes.post("/createAnswerQuestion", verifyToken, createAnswerQuestionController);

module.exports = routes;
