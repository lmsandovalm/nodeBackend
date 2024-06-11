const UserSchema = require("../models/UserModel");
const {
  errorResponse,
  successResponse,
} = require("../middleware/StructureResponse");
const handleValidationErrors = require("../middleware/HandleValidationErrors");
const { default: mongoose } = require("mongoose");

async function getUsers() {
  try {
    const UserResult = await UserSchema.find();
    return successResponse(200, "Success", UserResult.length, UserResult);
  } catch (error) {
    return errorResponse(500, "Internal Server Error", error.message);
  }
}

const findUserById = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id provided",
      });
    }

    const userFound = await UserSchema.findById(id);

    if (!userFound) {
      return errorResponse(404, "Not found", { error: "User Not Found" });
    }

    return successResponse(200, "Success", 1, userFound);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
};

async function updateUserById(idUser, data) {
  try {
    if (!idUser || !mongoose.Types.ObjectId.isValid(idUser)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id provided",
      });
    }
    const imageUpdated = await UserSchema.findOneAndUpdate(
      { _id: idUser },
      { $set: data },
      { new: true }
    );

    if (!imageUpdated) {
      return errorResponse(500, "Error upload file", {
        error: "File no upload",
      });
    }

    return successResponse(201, "Success", 1, imageUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}
module.exports = { findUserById, getUsers, updateUserById };
