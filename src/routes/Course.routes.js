const { Router } = require("express");
const routes = Router();

const {
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
  findTopicByIdController,
} = require("../controllers/CourseController");

const { verifyToken } = require("../middleware/AuthJwt");

//! general routes
routes.get("/", getAllCoursesController);
routes.get("/topics", getAllTopicsController);
routes.get("/materialsTopics", getAllMaterialsTopicsController);
routes.get("/find/:id", findCourseByIdController);

routes.get("/findTopic/:id", findTopicByIdController);

routes.get(
  "/findTopicByIdWithMaterials/:id",
  findTopicByIdWithMaterialsController
);
routes.post("/registerCourse",  registerCourseController);
routes.post("/registerTopic", registerTopicCourseController);
routes.post("/registerMaterialTopic", registerMaterialTopicCourseController);
routes.post("/uploadFileMaterialTopic/:idMaterial/:folderName", uploadFileMaterialTopicController);
routes.delete("/delete/:id",  deleteCourseByIdController);
routes.patch("/update/:id",  updateCourseByIdController);

routes.delete("/deleteTopic/:id",  deleteTopicByIdController);
routes.patch("/updateTopic/:id",  updateTopicByIdController);

routes.delete("/deleteMaterialTopic/:id",  deleteMaterialTopicsByIdController);
routes.patch("/updateMaterialTopic/:id",  updateMaterialTopicsByIdController);
//! end general routes

module.exports = routes;
