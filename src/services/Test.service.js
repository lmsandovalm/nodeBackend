const TestSchema = require("../models/test/TestModel");
const QuestionTestSchema = require("../models/test/TestQuestionModel");
const TestAnswerSchema = require("../models/test/TestAnswerModel");
const LearningStyleSchema = require("../models/LearningStyleModel");

const {
  errorResponse,
  successResponse,
} = require("../middleware/StructureResponse");
const handleValidationErrors = require("../middleware/HandleValidationErrors");
const { default: mongoose } = require("mongoose");

async function registerTest(data) {
  try {
    const newTest = new TestSchema(data);
    const result = await newTest.save();
    return successResponse(200, "Success", 1, result);
  } catch (error) {
    return errorResponse(500, "Internal Server Error", {
      error: error.message,
    });
  }
}

async function getTest() {
  try {
    const testResult = await TestSchema.find();
    if (testResult.length === 0) {
      return errorResponse(404, "No tests found");
    }

    return successResponse(200, "Success", testResult.length, testResult);
  } catch (error) {
    return errorResponse(500, "Internal Server Error", error.message);
  }
}
const findTestById = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id provided",
      });
    }

    const testFound = await TestSchema.findById(id).populate({
      path: "questions_test",
      populate: {
        path: "answers_question",
        model: TestAnswerSchema,       
      }
    });

    if (!testFound) {
      return errorResponse(404, "Not found", { error: "Test Not Found" });
    }

    return successResponse(200, "Success", 1, testFound);
  } catch (error) {
    console.error("Error finding test by ID:", error);
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
};

async function registerQuestionTest(data) {
  try {
    const newQuestion = new QuestionTestSchema(data);
    const resultRegister = await newQuestion.save();
    const { test } = data;

    const resultUpdated = await TestSchema.findOneAndUpdate(
      { _id: test },
      { $push: { questions_test: resultRegister._id } },
      { new: true }
    );

    return successResponse(201, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function registerAnswerQuestionTest(data) {
  try {
    const { name_style } = data;

    const styleFound = await LearningStyleSchema.findOne({
      name_style: name_style,
    });

    if (!styleFound) {
      throw new Error(`Learning Style '${name_style}' not found`);
    }

    const newAnswer = new TestAnswerSchema(data);

    switch (name_style) {
      case "Visual":
        newAnswer.answer_type = styleFound._id;
        break;

      case "Auditivo":
        newAnswer.answer_type = styleFound._id;
        break;

      case "Kinestesico":
        newAnswer.answer_type = styleFound._id;
        break;
    }

    const { question } = data;
    if (!question || !mongoose.Types.ObjectId.isValid(question)) {
      return errorResponse(400, "Bad request", { error: "Invalid question" });
    }
    const questionFound = await QuestionTestSchema.findById(question);
    if (!questionFound) {
      return errorResponse(404, "Not found", { error: "Question Not Found" });
    }

    const resultRegister = await newAnswer.save();

    const resultUpdated = await QuestionTestSchema.findOneAndUpdate(
      { _id: question },
      { $push: { answers_question: resultRegister._id } },
      { new: true }
    );
    if (!resultUpdated) {
      return errorResponse(404, "Not found", { error: "Question Not Found" });
    }

    return successResponse(201, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

module.exports = {
  registerTest,
  getTest,
  findTestById,
  registerQuestionTest,
  registerAnswerQuestionTest,
};
