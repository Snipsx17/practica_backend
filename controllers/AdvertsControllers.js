const Advert = require('../models/Advert');

class AdvertsController {
  async get(req, res, next) {
    try {
      //filters.nombre = ;
      const filtroNombre = req.query.nombre;
      const filtroVenta = req.query.venta;
      const filtroTag = req.query.tag;
      const skip = req.query.skip;
      const limit = req.query.limit;
      const sort = req.query.sort;
      const fields = req.query.fields;

      const filtro = {};

      //if (filtroNombre) filtro.nombre = filtroNombre;
      if (filtroNombre) filtro.nombre = new RegExp('^' + filtroNombre, 'i');
      if (filtroVenta) filtro.venta = filtroVenta;
      if (filtroTag) filtro.tags = filtroTag;

      const anuncios = await Advert.lista(filtro, skip, limit, sort, fields);
      res.json(anuncios);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdvertsController;
