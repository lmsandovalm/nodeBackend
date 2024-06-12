const { Router } = require("express");
const routes = Router();

const {
  getAllCoursesController,
  registerCourseController,
  findCourseByIdController,
  deleteCourseByIdController,
  updateCourseByIdController,
  registerTopicCourseController,
  registerMaterialTopicCourseController,
  uploadFileMaterialTopicController,
  findTopicByIdWithMaterialsController,
} = require("../controllers/CourseController");

const { verifyToken } = require("../middleware/AuthJwt");

//! general routes
routes.get("/", getAllCoursesController);
routes.get("/find/:id", findCourseByIdController);
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
//! end general routes

module.exports = routes;
