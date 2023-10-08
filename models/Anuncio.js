const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String],
});

anuncioSchema.statics.lista = function (nombre) {
  const query = Anuncio.find(nombre);

  return query.exec();
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
