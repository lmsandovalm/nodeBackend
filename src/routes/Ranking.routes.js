const { Router } = require("express");
const routes = Router();

const {
  addPointsForCorrectAnswerController,
  getUserScoreController,
  getAllUserScoresController,
} = require("../controllers/RankingController");


routes.post("/add-points", addPointsForCorrectAnswerController);
routes.get("/user-score/:user", getUserScoreController);
routes.get("/all-user-scores", getAllUserScoresController);

module.exports = routes;
