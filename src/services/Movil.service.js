const AnswerMovilSchema = require("../models/movil/AnswerMovil");
const TopicSchema = require("../models/course/TopicModel");
const QuestionSchema = require("../models/movil/QuestionMovil");

const {
  errorResponse,
  successResponse,
} = require("../middleware/StructureResponse");
const handleValidationErrors = require("../middleware/HandleValidationErrors");
const { default: mongoose } = require("mongoose");

function getAllQuestions() {}
function getQuestionById() {}

async function createQuestion(body) {
  try {
    const newQuestion = new QuestionSchema(body);
    const resultRegister = await newQuestion.save();

    const { topic } = body;
    const resultUpdated = await TopicSchema.findOneAndUpdate(
      { _id: topic },
      { $push: { movil_questions: resultRegister._id } },
      { new: true }
    );

    return successResponse(201, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function createAnswerQuestion(body) {
  try {
    const newAnswer = new AnswerMovilSchema(body);
    const resultRegister = await newAnswer.save();

    const { question } = body;
    const resultUpdated = await QuestionSchema.findOneAndUpdate(
      { _id: question },
      { $push: { question_answers: resultRegister._id } },
      { new: true }
    );

    return successResponse(201, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function findTopicById(id) {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id Provided",
      });
    }

    const queryCourse = await TopicSchema.findById(id);
    if (!queryCourse) {
      return successResponse(404, "Not found", 0);
    }
    return successResponse(200, "Success", 1, queryCourse);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function findTopicByIdWithQuestions(id) {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id Provided",
      });
    }

    const queryCourse = await TopicSchema.findById(id).populate({
      path: "movil_questions",
      populate: {
        path: "question_answers",
        model: "AnswerTopicMovil",
      },
    });

    if (!queryCourse) {
      return successResponse(404, "Not found", 0);
    }
    return successResponse(200, "Success", 1, queryCourse);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

function updateQuestionById() {}

module.exports = {
  getAllQuestions,
  findTopicById,
  findTopicByIdWithQuestions,
  getQuestionById,
  createQuestion,
  updateQuestionById,
  createAnswerQuestion,
};
