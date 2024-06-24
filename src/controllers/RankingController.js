const {
  addPointsUser,
  getUserScore,
  getAllUserScores,
} = require("../services/Ranking.service");

const addPointsUserController = async (req, res) => {
  try {
    const { user, points } = req.body;
    const resultService = await addPointsUser(user, points);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserScoreController = async (req, res) => {
  try {
    const resultService = await getUserScore(req.params.user);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUserScoresController = async (req, res) => {
  try {
    const resultService = await getAllUserScores();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPointsUserController,
  getUserScoreController,
  getAllUserScoresController,
};
