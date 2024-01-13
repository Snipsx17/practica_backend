const User = require('../models/User');
const Advert = require('../models/Advert');

class PrivateController {
  async index(req, res, next) {
    try {
      const user = await User.findById(req.session.userID);

      if (!user) {
        req.session.regenerate((error) => {
          if (error) {
            next(error);
            return;
          }
          res.redirect('/');
        });
      }

      const adverts = await Advert.find({ owner: user._id });
      res.locals.email = user.email;
      res.locals.adverts = adverts;
      res.render('private');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PrivateController;
