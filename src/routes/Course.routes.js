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
  findTopicByIdWithMaterialsController
} = require("../controllers/CourseController");

const { verifyToken } = require("../middleware/AuthJwt");

//! general routes
routes.get("/", getAllCoursesController);
routes.get("/find/:id", findCourseByIdController);
routes.get("/findTopicByIdWithMaterials/:id", findTopicByIdWithMaterialsController);
routes.post("/registerCourse", verifyToken, registerCourseController);
routes.post("/registerTopic", verifyToken, registerTopicCourseController);
routes.post("/registerMaterialTopic", verifyToken, registerMaterialTopicCourseController);
routes.post("/uploadFileMaterialTopic", verifyToken, uploadFileMaterialTopicController);
routes.delete("/delete/:id", verifyToken, deleteCourseByIdController);
routes.patch("/update/:id", verifyToken, updateCourseByIdController);
//! end general routes

module.exports = routes;
