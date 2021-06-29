const User = require("../models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");

class UserController {
  async store(req, res) {
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
      });
    }

    let userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Este usuário já existe.",
      });
    }

    const { name, email, password } = req.body;

    const data = {
      name,
      email,
      password,
    };

    data.password = await bcrypt.hash(data.password, 8);

    await User.create(data, (err) => {
      if (err)
        return res.status(400).json({
          success: false,
          message: "Error ao tentar inserir usuário no MongoDB.",
        });

      return res.status(200).json({
        success: true,
        message: "Usuário cadastrado com sucesso!",
        data: {
          name: data.name,
          email: data.email,
          created_at: new Date(),
        },
      });
    });
  }
}

module.exports = new UserController();
