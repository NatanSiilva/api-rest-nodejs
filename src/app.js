const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
require("./config/connection");

class App {
  constructor() {
    this.init();
  }

  init() {
    this.app = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use((req, res, next) => {
      res.header("Access-Controll-Allow-origin", "*");
      res.header("Access-Controll-Allow-Methods", "Get, Post, Put, Delete");
      res.header(
        "Access-Controll-Allow-Headers",
        "Access, Content-type, Acept, Origin, X-Requested-With"
      );

      this.app.use(cors());
      next();
    });
  }

  router() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
