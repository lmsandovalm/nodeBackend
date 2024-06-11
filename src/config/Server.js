//region imports
const cors = require("cors");
const express = require("express");
const server = express();
const routes = express.Router();
const path = require("path");


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

//region LearningStyle-routes
const learningStyleTest = require("../routes/LearningStyle.routes");
server.use("/api/v1/learningStyle", learningStyleTest);
//end region LearningStyle-routes

//region test-routes
const routeTest = require("../routes/Test.routes");
server.use("/api/v1/test", routeTest);
//end region test-routes

//region courses-routes
const routeCourses = require("../routes/Course.routes");
server.use("/api/v1/courses", routeCourses);
//end region courses-routes

//region movil-routes
const routeMovil = require("../routes/Movil.routes");
server.use("/api/v1/movil", routeMovil);
//end region courses-routes

//region auth-routes
const authRoutes = require("../routes/Auth.routes");
server.use("/api/v1/auth", authRoutes);
//end region auth-routes

//region users-routes
const usersRoutes = require("../routes/User.routes");
server.use("/api/v1/users", usersRoutes);
//end region users-routes

//region ranking-routes
const rankingRoutes = require("../routes/Ranking.routes");
server.use("/api/v1/ranking", rankingRoutes);
//end region ranking-routes

server.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

server.listen(port, () => {
  console.log(
    `Run server in port ${port} \nrun local : http://localhost:${port}`
  );
});

module.exports = server;
