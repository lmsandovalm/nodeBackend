const { getUsers, findUserById } = require("../services/User.service");

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
module.exports = { findUserByIdController, getUsersController };
