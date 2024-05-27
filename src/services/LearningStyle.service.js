const LearningStyleSchema = require("../models/LearningStyleModel");
const {
  successResponse,
  errorResponse,
} = require("../middleware/StructureResponse");

const handleValidationErrors = require("../middleware/HandleValidationErrors");
const { default: mongoose } = require("mongoose");

async function getAllLearningStyles() {
  try {
    const styles = await LearningStyleSchema.find();
    return successResponse(200, "Success", styles.length, styles);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(500, "Internal Server Error", validationErrors);
  }
}

async function registerLearningStyle(data) {
  try {
    const queryStyle = await LearningStyleSchema.findOne({
      name_style: data.name_style,
    });
    if (queryStyle) {
      return errorResponse(400, "Bad request", {
        error: "Style already exists",
      });
    }

    const newStyle = new LearningStyleSchema(data);
    const resultRegister = await newStyle.save();
    return successResponse(201, "Success", 1, resultRegister);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}
async function findLearningStyleById(id) {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id Provided",
      });
    }

    const queryStyle = await LearningStyleSchema.findById(id);
    if (!queryStyle) {
      return errorResponse(404, "Not found", {
        error: "The learning style not found",
      });
    }
    return successResponse(200, "Success", 1, queryStyle);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}
const updateLearningStyleById = async (id, update) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(
        "Invalid LearningStyle ID. Please provide a valid 24-character ObjectId."
      );
    }

    const resultUpdated = await LearningStyleSchema.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!resultUpdated) {
      return errorResponse(404, "Not found", {
        error: "The learninig style not found",
      });
    }

    return successResponse(200, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(500, "Internal Server Error", validationErrors);
  }
};

const deleteStyleById = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid id provided",
      });
    }
    const queryStyle = await LearningStyleSchema.findByIdAndDelete(id);

    if (!queryStyle) {
      return errorResponse(404, "Not found", { error: "Style not found" });
    }

    return successResponse(200, "Success", 1, []);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(500, "Validation Error", validationErrors);
  }
};

module.exports = {
  getAllLearningStyles,
  registerLearningStyle,
  deleteStyleById,
  findLearningStyleById,
  updateLearningStyleById,
};
