const mongoose = require('mongoose');

const anuncionSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String],
});

const Anuncio = mongoose.model('Anuncio', anuncionSchema);

module.exports = Anuncio;
