const {
  getAllQuestions,
  findTopicById,
  findTopicByIdWithQuestions,
  getQuestionById,
  createQuestion,
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
    const resultService = await findTopicById();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};

const findTopicByIdWithQuestionsController = async (req, res) => {
  try {
    const resultService = await findTopicByIdWithQuestions();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};

const getQuestionByIdController = async (req, res) => {
  try {
    const resultService = await getQuestionById();
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

module.exports = {
  getAllQuestionsController,
  findTopicByIdController,
  findTopicByIdWithQuestionsController,
  getQuestionByIdController,
  createQuestionController,
};
