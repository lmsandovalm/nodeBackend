const {
  registerTest,
  getTest,
  findTestById,
  updateTestById,
  deleteTestById,
  registerQuestionTest,
  registerAnswerQuestionTest,
} = require("../services/Test.service");

async function registerTestController(req, res, next) {
  try {
    const resultService = await registerTest(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
}
async function getTestController(req, res, next) {
  try {
    const resultService = await getTest();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function findTestByIdController(req, res, next) {
  try {
    const resultService = await findTestById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function registerQuestionTestController(req, res, next) {
  try {
    const resultService = await registerQuestionTest(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
}
async function registerAnswerQuestionTestController(req, res, next) {
  try {
    const resultService = await registerAnswerQuestionTest(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
}

const deleteTestByIdController = async (req, res) => {
  try {
    const resultService = await deleteTestById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTestByIdController = async (req, res) => {
  try {
    const resultService = await updateTestById(req.params.id, req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerTestController,
  getTestController,
  findTestByIdController,
  updateTestByIdController,
  deleteTestByIdController,
  registerQuestionTestController,
  registerAnswerQuestionTestController,
};
