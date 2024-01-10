const Advert = require('../models/Advert');

class HomeController {
  async index(req, res, next) {
    const adverts = await Advert.lista();
    res.locals.title = 'nodepop';
    res.locals.adverts = adverts;
    res.render('index');
  }
}

module.exports = HomeController;
