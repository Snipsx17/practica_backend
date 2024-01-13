const User = require('../models/User');
const Advert = require('../models/Advert');

class PrivateController {
  async index(req, res, next) {
    const user = await User.findById(req.session.userID);
    console.log(user);
    const adverts = await Advert.find({ owner: user._id });
    res.locals.email = user.email;
    res.locals.adverts = adverts;
    res.render('private');
  }
}

module.exports = PrivateController;
