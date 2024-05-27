const CourseSchema = require("../models/course/CourseModel");
const TopicSchema = require("../models/course/TopicModel");
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
};
