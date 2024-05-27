const {
  getAllCourses,
  registerCourse,
  findCourseById,
  deleteCourseById,
  updateCourseById,
  registerTopicCourse,
} = require("../services/Course.service");

const getAllCoursesController = async (req, res) => {
  try {
    const resultService = await getAllCourses();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};
const registerCourseController = async (req, res) => {
  try {
    const resultService = await registerCourse(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};
const registerTopicCourseController = async (req, res) => {
  try {
    const resultService = await registerTopicCourse(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};

const findCourseByIdController = async (req, res) => {
  try {
    const resultService = await findCourseById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteCourseByIdController = async (req, res) => {
  try {
    const resultService = await deleteCourseById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCourseByIdController = async (req, res) => {
  try {
    const resultService = await updateCourseById(req.params.id, req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCoursesController,
  registerCourseController,
  findCourseByIdController,
  deleteCourseByIdController,
  updateCourseByIdController,
  registerTopicCourseController
};
