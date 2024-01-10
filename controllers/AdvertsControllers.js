const Advert = require('../models/Advert');
const createError = require('http-errors');
const resizeImage = require('../lib/resizeImageConfig');

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

  async getAdById(req, res, next) {
    try {
      const id = req.params.id;
      const response = await Advert.findById(id);

      if (!response) {
        next(createError(404, 'Advert not found'));
        return;
      }

      res.json(response);
    } catch (error) {
      next(createError(404, 'Advert not found'));
    }
  }

  async createAd(req, res, next) {
    try {
      const advertData = req.body;
      const path = '/images/anuncios/';
      advertData.owner = req.userID;
      advertData.imagen = `${path}${req.file.filename}`;
      const newAdvert = Advert(advertData);
      const anuncioGuardado = await newAdvert.save();
      resizeImage(req.file.filename);

      res.json({ result: anuncioGuardado });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdvertsController;
