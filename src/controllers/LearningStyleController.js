const {
  getAllLearningStyles,
  registerLearningStyle,
  deleteStyleById,
  findLearningStyleById,
  updateLearningStyleById,
} = require("../services/LearningStyle.service");

async function getAllLearningStylesController(req, res, next) {
  try {
    const resultService = await getAllLearningStyles();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function registerController(req, res, next) {
  try {
    const resultService = await register(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllLearningStylesController,
  registerController,
};
