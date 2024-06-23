const { login, register, logout } = require("../services/Auth.service");

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const resultService = await login(email, password);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function registerController(req, res, next) {
  try {
    const resultService = await register(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function logoutController(req, res, next) {
  try {
    const token = req.token;
    if (!token) {
      return res.status(400).json({ status: 400, message: 'Token not provided' });
    }
    const resultService = await logout(token);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { loginController, registerController, logoutController };
