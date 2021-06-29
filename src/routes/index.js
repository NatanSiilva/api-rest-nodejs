const { Router } = require("express");
const UserController = require("../app/Controllers/UserController");

const routes = Router();

routes.post("/user", UserController.store);

module.exports = routes;
