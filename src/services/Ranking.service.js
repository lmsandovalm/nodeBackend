const RankingSchema = require("../models/movil/Ranking");
const {
  errorResponse,
  successResponse,
} = require("../middleware/StructureResponse");

async function addPointsForCorrectAnswer(userId) {
  try {
    const points = 5;
    let userScore = await RankingSchema.findOne({ user: userId });

    if (!userScore) {
      // Crear nuevo puntaje si no existe
      userScore = new RankingSchema({ user: userId, score: points });
    } else {
      // Actualizar puntaje 
      userScore.score += points;
    }

    await userScore.save();
    return successResponse(200, "Points added successfully", 1, userScore);
  } catch (error) {
    return errorResponse(500, "Error adding points", { error: error.message });
  }
}

async function getUserScore(userId) {
  try {
    const userScore = await RankingSchema.findOne({ user: userId });

    if (!userScore) {
      return successResponse(404, "User score not found", 0, null);
    }

    return successResponse(200, "User score retrieved successfully", 1, userScore);
  } catch (error) {
    return errorResponse(500, "Error retrieving user score", { error: error.message });
  }
}

async function getAllUserScores() {
  try {
    const allScores = await RankingSchema.find().populate('user');

    return successResponse(200, "All user scores retrieved successfully", allScores.length, allScores);
  } catch (error) {
    return errorResponse(500, "Error retrieving all user scores", { error: error.message });
  }
}

module.exports = {
  addPointsForCorrectAnswer,
  getUserScore,
  getAllUserScores,
};
