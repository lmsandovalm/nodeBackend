const { Router } = require("express");
const routes = Router();
const { uploadSigleFile } = require("../helpers/uploadMulterFile");

const {
  findUserByIdController,
  getUsersController,
  uploadImageController,
  updateUserByIdController,
} = require("../controllers/UserController");

routes.get("/", getUsersController);
routes.get("/", getUsersController);
routes.get("/find/:id", findUserByIdController);
routes.patch("/updateUserById/:id", updateUserByIdController);
routes.patch("/updatePhoto/:id/:folderName", uploadImageController);

routes.post("/uploadSingleImage/:folderName", (req, res) =>
  uploadSigleFile(req, res)
);

module.exports = routes;
