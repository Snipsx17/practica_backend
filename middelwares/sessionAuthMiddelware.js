module.exports = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect('/');
    return;
  }

  next();
};
