'use strict';
const readLine = require('node:readline');
const initData = require('./initialData.json');

// DB Connection
const connection = require('./lib/connectMongose');
// Model's
const Advert = require('./models/Advert');
const User = require('./models/User');

main();

// Functions
async function main() {
  await new Promise((resolve) => connection.once('open', resolve));

  const confirmation = await confirmDelete(
    'Are you sure that you want to delete the entire DB and load default data? (Y/N)'
  );

  // (y/n)
  if (!confirmation) {
    process.exit();
  }

  await initAdverts();
  await initUsers();

  // Close DB connection
  connection.close();
}

async function initAdverts() {
  const deleted = await Advert.deleteMany();
  console.log(`${deleted.deletedCount} adverts were deleted`);

  const inserted = await Advert.insertMany(initData.adverts);
  console.log(`${inserted.length} adverts created.`);
}

async function initUsers() {
  const deleted = await User.deleteMany();
  console.log(`${deleted.deletedCount} users were deleted`);

  // hash passwords
  const users = await Promise.all(
    initData.users.map(async ({ email, password }) => ({
      email,
      password: await User.hashPassword(password),
    }))
  );

  const inserted = await User.insertMany(users);
  console.log(`${inserted.length} users created.`);
}

async function confirmDelete(text) {
  return new Promise((resolve, reject) => {
    const interf = readLine.Interface({
      input: process.stdin,
      output: process.stdout,
    });

    interf.question(text, (respuesta) => {
      interf.close();
      resolve(respuesta.toLowerCase() === 'y');
    });
  });
}
