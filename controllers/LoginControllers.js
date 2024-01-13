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

  index(req, res, next) {
    res.locals.wrongCredentials = '';
    res.render('login');
  }

  async login(req, res, next) {
    // extraigo el payload
    const { email, password } = req.body;
    if (req.session.userID) {
      res.redirect('/private');
      return;
    }

    // compruebo que el usuario existe en la BD
    const user = await User.findOne({ email });
    if (!user || !(await user.login(password))) {
      // si no existe renderizo un mensaje o la contrase;a no es correcta
      // renderizo un mensaje
      res.locals.wrongCredentials = 'Wrong Credentials';
      res.render('login');
      return;
    }
    //
    // si es correcta renderizo la pagina /private y guardo el id del usuario en la sesion
    req.session.userID = user._id;
    res.redirect('private');
  }

  logout(req, res, next) {
    req.session.regenerate((error) => {
      if (error) {
        next(error);
        return;
      }

      res.redirect('/');
    });
  }
}

module.exports = LoginController;
