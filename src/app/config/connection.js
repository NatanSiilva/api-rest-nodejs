const mongoose = require("mongoose");

class Connection {
  constructor() {
    this.init();
  }

  init() {
    this.dataBaseConnectionMongoDB();
  }

  dataBaseConnectionMongoDB() {
    this.dataBaseConnection = mongoose
      .connect("mongodb://localhost/api-rest-nodejs", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log("Conexão estabelecida com sucesso!"))
      .catch((err) =>
        console.log(`Error ao estabelecer conexão com o mongoDB: ${err}`)
      );
  }
}

module.exports = new Connection();
