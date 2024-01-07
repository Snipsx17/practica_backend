const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  imagen: String,
  tags: [String],
  owner: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
});

anuncioSchema.statics.lista = function (nombre, fields, skip, limit, sort) {
  const query = Anuncio.find(nombre);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);

  return query.exec();
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
