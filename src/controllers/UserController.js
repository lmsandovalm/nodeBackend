const {
  getUsers,
  findUserById,
  updateUserById,
} = require("../services/User.service");
const { uploadSigleFile } = require("../helpers/uploadMulterFile");
async function getUsersController(req, res, next) {
  try {
    const resultService = await getUsers();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function findUserByIdController(req, res, next) {
  try {
    const resultService = await findUserById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

const updateUserByIdController = async (req, res) => {
  try {
    const resultService = await updateUserById(req.params.id, req.body);
    res.status(200).json(resultService);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};
const uploadImageController = async (req, res) => {
  try {
    const result = await uploadSigleFile(req, res);
    if (result.status === 201) {
      const resultService = await updateUserById(req.params.id, {
        imageProfile: result.url,
      });
      res.status(200).json(resultService);
    } else {
      res.status(500).json({
        error: "Ocurrio un error intentando actualizar la foto del usuario",
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  findUserByIdController,
  getUsersController,
  uploadImageController,
  updateUserByIdController
};
