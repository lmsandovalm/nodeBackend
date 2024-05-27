const {
  registerTest,
  getTest,
  findTestById,
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

module.exports = {
  registerTestController,
  getTestController,
  findTestByIdController,
  registerQuestionTestController,
  registerAnswerQuestionTestController,
};
