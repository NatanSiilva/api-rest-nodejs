const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      success: false,
      code: 130,
      message: "Token de autenticação não existe!",
    });
  }

  const [, token] = auth.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, config.secrete);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        code: 130,
        message: "Token está expirado!",
      });
    } else {
      req.user_id = decoded.id;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: 130,
      message: "Token invalido",
    });
  }
};
