const { Router } = require("express");
const AuthMiddleware = require("../app/Middleware/AuthMiddleware");

const UserController = require("../app/Controllers/UserController");
const LoginController = require("../app/Controllers/LoginController");

const routes = Router();

routes.post("/user", UserController.store);
routes.post("/login", LoginController.singIn);
routes.get("/show", AuthMiddleware,  UserController.showAllUsers);

module.exports = routes;
