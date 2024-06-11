const CourseSchema = require("../models/course/CourseModel");
const TopicSchema = require("../models/course/TopicModel");
const MaterialTopicSchema = require("../models/course/MaterialTopicModel");

const {
  successResponse,
  errorResponse,
} = require("../middleware/StructureResponse");

const handleValidationErrors = require("../middleware/HandleValidationErrors");
const { default: mongoose } = require("mongoose");

async function getAllCourses() {
  try {
    const courses = await CourseSchema.find();
    return successResponse(200, "Success", courses.length, courses);
  } catch (error) {
    return errorResponse(500, "Internal Server Error", error);
  }
}
async function registerCourse(data) {
  try {
    const newCourse = new CourseSchema(data);
    const resultRegister = await newCourse.save();
    return successResponse(201, "Success", 1, resultRegister);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function registerTopicCourse(data) {
  try {
    const { course } = data;
    if (!course || !mongoose.Types.ObjectId.isValid(course)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid course id provided",
      });
    }

    const newTopic = new TopicSchema(data);
    const resultRegister = await newTopic.save();

    const resultUpdated = await CourseSchema.findOneAndUpdate(
      { _id: course },
      { $push: { course_topics: resultRegister._id } },
      { new: true }
    );

    if (!resultUpdated) {
      await TopicSchema.findByIdAndDelete(resultRegister._id);
      return errorResponse(404, "Not found", { error: "Course not found" });
    }

    return successResponse(201, "Success", 1, resultRegister);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function registerMaterialTopic(data) {
  try {
    const { idTopic } = data;
    console.log("idTopic", idTopic);
    if (!idTopic || !mongoose.Types.ObjectId.isValid(idTopic)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid course id provided",
      });
    }

    // Crear nuevo material y guardarlo
    const newMaterial = new MaterialTopicSchema(data);
    const resultRegister = await newMaterial.save();

    // Actualizar el array topic_material en TopicCourse
    const resultUpdated = await TopicSchema.findOneAndUpdate(
      { _id: idTopic },
      { $push: { topic_material: resultRegister._id } },
      { new: true }
    );

    if (!resultUpdated) {
      return errorResponse(500, "Error updating topic", {
        error: "The topic was not updated with the new material",
      });
    }

    return successResponse(201, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}


async function uploadFileMaterialTopic(id, urlMaterial) {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id provided",
      });
    }

    const resultUpdated = await MaterialTopicSchema.findOneAndUpdate(
      { _id: id },
      { $push: { material_source: urlMaterial } },
      { new: true }
    );

    if (!resultUpdated) {
      return errorResponse(500, "Error upload file", {
        error: "File no upload",
      });
    }
    // await TopicSchema.findOneAndUpdate(
    //   { _id: material_topic },
    //   { $push: { topic_material: resultRegister._id } },
    //   { new: true }
    // );

    return successResponse(201, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function findTopicByIdWithMaterials(id) {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id Provided",
      });
    }

    const queryTopic = await TopicSchema.findById(id).populate({
      path: "topic_material",
      model: MaterialTopicSchema,
    });

    if (!queryTopic) {
      return successResponse(404, "Not found", 0);
    }
    return successResponse(200, "Success", 1, queryTopic);
  } catch (error) {
    console.log(error);
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

async function findCourseById(id) {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id Provided",
      });
    }

    const queryCourse = await CourseSchema.findById(id).populate({
      path: "course_topics",
      model: TopicSchema,
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

const deleteCourseById = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid id provided",
      });
    }
    const queryCourse = await CourseSchema.findByIdAndDelete(id);

    if (!queryCourse) {
      return errorResponse(404, "Not found", { error: "Course not found" });
    }

    return successResponse(200, "Success", 1, []);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(500, "Validation Error", validationErrors);
  }
};

const updateCourseById = async (id, update) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(
        "Invalid Course ID. Please provide a valid 24-character ObjectId."
      );
    }

    const resultUpdated = await CourseSchema.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!resultUpdated) {
      return errorResponse((statusCode = 404), (message = "Course not found"));
    }

    return successResponse(200, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(
      validationErrors ? 400 : 500,
      validationErrors ? "Validation Error" : "Internal Server Error",
      validationErrors
    );
  }
};

module.exports = {
  getAllCourses,
  registerCourse,
  findCourseById,
  deleteCourseById,
  updateCourseById,
  registerTopicCourse,
  registerMaterialTopic,
  uploadFileMaterialTopic,
  findTopicByIdWithMaterials,
};
