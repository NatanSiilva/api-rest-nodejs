class UserController {
  index(req, res, next) {
    console.log(req.body);
  }
}

module.exports = new UserController();
