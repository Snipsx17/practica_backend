const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET
router.get('/', async (req, res, next) => {
  try {
    //filters.nombre = ;
    const filtroNombre = req.query.nombre;
    const filtroVenta = req.query.venta;
    const filtroTag = req.query.tag;

    const filtro = {};

    //if (filtroNombre) filtro.nombre = filtroNombre;
    if (filtroNombre) filtro.nombre = new RegExp('^' + filtroNombre, 'i');
    if (filtroVenta) filtro.venta = filtroVenta;
    if (filtroTag) filtro.tags = filtroTag;
    console.log(filtro);

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
router.post('/', async (req, res, next) => {
  try {
    const anuncioData = req.body;
    const nuevoAnuncio = Anuncio(anuncioData);
    const anuncioGuardado = await nuevoAnuncio.save();

    res.json({ result: anuncioGuardado });
  } catch (error) {
    next(error);
  }
});

// PUT
router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const anuncioData = req.body;
  const anuncioActualizado = await Anuncio.findByIdAndUpdate(id, anuncioData, {
    new: true,
  });

  res.json(anuncioActualizado);
});
// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Anuncio.deleteOne({ _id: id });
    res.json({ Result: 'Anuncio Eliminado' });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
