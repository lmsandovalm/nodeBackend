//region imports
const cors = require("cors");
const express = require("express");
const server = express();
const routes = express.Router();

const morgan = require("morgan");
const port = process.env.PORT || 3000;
const createRole = require("../libs/initialSetup");
createRole();
//end region imports

//region config dependences
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
//end region dependences


//region test-routes
const routeTest = require("../routes/Test.routes");
server.use("/api/v1/test", routeTest);
//end region test-routes

//region courses-routes
const routeUsers = require("../routes/Course.routes");
server.use("/api/v1/courses", routeUsers);
//end region courses-routes

//region auth-routes
const authRoutes = require("../routes/Auth.routes");
server.use("/api/v1/auth", authRoutes);
//end region auth-routes

server.listen(port, () => {
  console.log(
    `Run server in port ${port} \nrun local : http://localhost:${port}`
  );
});

module.exports = server;
