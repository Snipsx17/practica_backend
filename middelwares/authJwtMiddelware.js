const createError = require('http-errors');
const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // extraemos el token de la cabecera o del body o de la url
  const tokenJWT = req.get('Authorization') || req.body.jwt || req.query.jwt;
  // comprobamos el token
  //sino es valido
  if (!tokenJWT) {
    next(createError(401, 'No token provided'));
    return;
  }

  jsonWebToken.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      next(createError(401, 'invalid token'));
      return;
    }
    req.userID = payload.id;
    next();
  });
};
