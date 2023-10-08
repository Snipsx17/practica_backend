'use strict';
const readLine = require('node:readline');
const initData = require('./initialData.json');

// DB Connection
const connection = require('./lib/connectMongose');
// Model
const Anuncio = require('./models/Anuncio');
const { resolve } = require('node:path');

main();

// Functions
async function main() {
  await new Promise((resolve) => connection.once('open', resolve));

  const confirmation = await confirmDelete(
    'Are you sure that you want to delete the entire DB and load default data?'
  );

  // SI
  if (!confirmation) {
    process.exit();
  }

  await initAgentes();
  // Close DB connection
  connection.close();
}

async function initAgentes() {
  const deleted = await Anuncio.deleteMany();
  console.log(`Fueron borrados ${deleted.deletedCount} anuncios`);

  const inserted = await Anuncio.insertMany(initData.anuncios);
  console.log(`Fueron creados ${inserted.length} anuncios. `);
}

async function confirmDelete(text) {
  return new Promise((resolve, reject) => {
    const interf = readLine.Interface({
      input: process.stdin,
      output: process.stdout,
    });

    interf.question(text, (respuesta) => {
      interf.close();
      resolve(respuesta.toLowerCase() === 'si');
    });
  });
}
