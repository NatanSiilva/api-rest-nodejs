const express = require("express");
const cors = require("cors");
const router = require("./routes");

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.app.use(express.json());

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
    this.app.use(router);
  }
}

module.exports = new App().app;
