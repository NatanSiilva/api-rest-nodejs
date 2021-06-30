const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");
const Hubspot = require("../../clients/hubspot");

class UserController {
  async store(req, res) {
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
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

    const { name, email, password, phone } = req.body;

    const data = {
      name,
      email,
      phone,
      password,
    };

    Hubspot.connect(data);

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
          phone: data.phone,
          created_at: new Date(),
        },
      });
    });
  }

  async showAllUsers(req, res) {
    const allUsers = await User.find({});

    if (!allUsers)
      return res.status(400).json({
        success: false,
        message: "Não existe usuários",
      });

    const users = allUsers.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      };
    });

    return res.status(200).json({
      success: true,
      message: "Lista de todos os usuários",
      data: {
        users,
      },
    });
  }
}

module.exports = new UserController();
