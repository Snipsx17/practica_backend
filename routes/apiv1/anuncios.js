const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET
router.get('/', async (req, res, next) => {
  try {
    const filtroNombre = req.query.nombre;

    const filtro = {};

    if (filtroNombre) filtro.nombre = filtroNombre;

    const anuncios = await Anuncio.lista(filtro);
    res.json(anuncios);
  } catch (error) {
    next(error);
  }
});

router.get('/id/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const respuesta = await Anuncio.findById(id);

    res.json(respuesta);
  } catch (error) {
    next(error);
  }
});

// POST

// PUT

// DELETE

module.exports = router;
