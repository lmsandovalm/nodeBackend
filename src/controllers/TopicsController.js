const {
  getAllQuestions,
  findTopicById,
  findTopicByIdWithQuestions,
  getQuestionById,
  createQuestion,
  createAnswerQuestion
} = require("../services/Movil.service");

const getAllQuestionsController = async (req, res) => {
  try {
    const resultService = await getAllQuestions();
    res.status(200).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};

const findTopicByIdController = async (req, res) => {
  try {
    const resultService = await findTopicById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};

const findTopicByIdWithQuestionsController = async (req, res) => {
  try {
    const resultService = await findTopicByIdWithQuestions(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};

const getQuestionByIdController = async (req, res) => {
  try {
    const resultService = await getQuestionById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};

const createQuestionController = async (req, res) => {
  try {
    const resultService = await createQuestion(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};

const createAnswerQuestionController = async (req, res) => {
  try {
    const resultService = await createAnswerQuestion(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};

module.exports = {
  getAllQuestionsController,
  findTopicByIdController,
  findTopicByIdWithQuestionsController,
  getQuestionByIdController,
  createQuestionController,
  createAnswerQuestionController
};
