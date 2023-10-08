const mongoose = require('mongoose');

mongoose.connection.on('error', (error) =>
  console.log(`DB connection Error ${error}`)
);
mongoose.connection.once('open', () =>
  console.log(`Conected to DB ${mongoose.connection.name}`)
);

mongoose.connect('mongodb://127.0.0.1/nodepop');

module.exports = mongoose.connection;
