require('dotenv').config();
const createError = require('http-errors');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');

class LoginController {
  async loginJWT(req, res, next) {
    const { email, password } = req.body;
    try {
      // compruebo que el email exista en la base de datos
      const user = await User.findOne({ email });

      // compruebo que la contrase;a sea igual a la de la BD
      // sino devuelvo un error
      if (!user || !(await user.login(password))) {
        next(createError(401, 'Credentials not valid'));
        return;
      }

      // si es valido devuelvo un token JWT
      const tokenJWT = jsonWebToken.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2d' }
      );

      res.json({ token: tokenJWT });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
