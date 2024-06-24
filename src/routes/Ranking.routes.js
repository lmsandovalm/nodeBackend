const { Router } = require("express");
const routes = Router();

const {
  addPointsUserController,
  getUserScoreController,
  getAllUserScoresController,
} = require("../controllers/RankingController");


routes.post("/add-points", addPointsUserController);
routes.get("/user-score/:user", getUserScoreController);
routes.get("/all-user-scores", getAllUserScoresController);

module.exports = routes;
