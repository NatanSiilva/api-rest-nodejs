const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

class LoginController {
  async singIn(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "Usuário não existe!",
      });
    }

    if (!(await bcrypt.compare(password, userExists.password))) {
      return res.status(400).json({
        success: false,
        message: "Senha invalida!",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        name: userExists.name,
        email: userExists.email,
      },
      token: jwt.sign({ id: userExists._id }, config.secrete, {
        expiresIn: config.expireIn,
      }),
    });
  }
}

module.exports = new LoginController();
