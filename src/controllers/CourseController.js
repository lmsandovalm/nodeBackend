const {
  getAllCourses,
  getAllTopics,
  getAllMaterialsTopics,
  registerCourse,
  findCourseById,
  deleteCourseById,
  deleteTopicById,
  deleteMaterialTopicsById,
  updateCourseById,
  updateTopicById,
  updateMaterialTopicById,
  registerTopicCourse,
  registerMaterialTopic,
  uploadFileMaterialTopic,
  findTopicByIdWithMaterials,
} = require("../services/Course.service");
const { uploadSigleFile } = require("../helpers/uploadMulterFile");

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

const getAllTopicsController = async (req, res) => {
  try {
    const resultService = await getAllTopics();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};

const getAllMaterialsTopicsController = async (req, res) => {
  try {
    const resultService = await getAllMaterialsTopics();
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

const registerMaterialTopicCourseController = async (req, res) => {
  try {
    const resultService = await registerMaterialTopic(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};

const uploadFileMaterialTopicController = async (req, res) => {
  try {
    const result = await uploadSigleFile(req, res);
    if (result.status === 201) {
      const resultService = await uploadFileMaterialTopic(
        req.params.idMaterial,
        result.url
      );
      res.status(resultService.statusCode).json(resultService);
    } else {
      res.status(500).json({
        error: "Ocurrio un error intentando subir el material a la tematica",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const findTopicByIdWithMaterialsController = async (req, res) => {
  try {
    const resultService = await findTopicByIdWithMaterials(req.params.id);
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

const deleteTopicByIdController = async (req, res) => {
  try {
    const resultService = await deleteTopicById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTopicByIdController = async (req, res) => {
  try {
    const resultService = await updateTopicById(req.params.id, req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMaterialTopicsByIdController = async (req, res) => {
  try {
    const resultService = await deleteMaterialTopicsById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMaterialTopicsByIdController = async (req, res) => {
  try {
    const resultService = await updateMaterialTopicById(req.params.id, req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCoursesController,
  getAllTopicsController,
  getAllMaterialsTopicsController,
  registerCourseController,
  findCourseByIdController,
  deleteCourseByIdController,
  deleteTopicByIdController,
  deleteMaterialTopicsByIdController,
  updateCourseByIdController,
  updateTopicByIdController,
  updateMaterialTopicsByIdController,
  registerTopicCourseController,
  registerMaterialTopicCourseController,
  uploadFileMaterialTopicController,
  findTopicByIdWithMaterialsController,
};
