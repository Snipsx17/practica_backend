const Advert = require('../models/Advert');
const createError = require('http-errors');
const resizeImage = require('../lib/resizeImageConfig');

class AdvertsController {
  index(req, res, next) {
    res.render('create-advert');
  }

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
      advertData.imagen = `${path}/${req.file.filename}`;
      const newAdvert = Advert(advertData);
      const anuncioGuardado = await newAdvert.save();
      resizeImage(req.file.filename);

      res.json({ result: anuncioGuardado });
    } catch (error) {
      next(error);
    }
  }

  async createAdvertForm(req, res, next) {
    try {
      const advertData = req.body;
      //advertData.tags = advertData.tags.split(',');
      const path = '/images/anuncios/';
      advertData.owner = req.session.userID;
      advertData.imagen = `${path}/${req.file.filename}`;
      const newAdvert = Advert(advertData);
      await newAdvert.save();
      resizeImage(req.file.filename);

      res.redirect('/private');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const userID = req.session.userID;
      const advertId = req.params.advertID;

      const advert = await Advert.findById(advertId);
      if (!advert) {
        console.warn(
          `User ${userID} try to delete the advert ${advertId}, it doesn't exist`
        );
        next(createError(404, 'Product not found'));
        return;
      }

      if (advert.owner.toString() !== userID) {
        console.warn(
          `User ${userID} try to delete the advert ${advertId}, it's not the owner`
        );
        next(createError(401, 'Unauthorize to delete the advert'));
        return;
      }

      await Advert.deleteOne({ _id: advertId });
      res.redirect('/private');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdvertsController;
