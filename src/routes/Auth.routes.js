//region imports
const { Router } = require("express");
const routes = Router();
const {
  loginController,
  registerController,
  logoutController
} = require("../controllers/AuthController");
//end region imports

function extractToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer')) {
    req.token = authHeader.substring(7, authHeader.length);
  } else {
    req.token = null;
  }
  next();
}

//region routes-auth
routes.post("/login", loginController);
routes.post("/register", registerController);
routes.post("/logout", extractToken, logoutController);
//end routes-auth

module.exports = routes;
