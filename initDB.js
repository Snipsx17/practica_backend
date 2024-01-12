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
  let adminID = '';

  const confirmation = await confirmDelete(
    'Are you sure that you want to delete the entire DB and load default data? (Y/N)'
  );

  // (y/n)
  if (!confirmation) {
    process.exit();
  }

  await initUsers();
  await initAdverts();

  // Close DB connection
  connection.close();
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

async function initAdverts() {
  const deleted = await Advert.deleteMany();
  console.log(`${deleted.deletedCount} adverts were deleted`);

  const adminUser = await User.findOne({ email: 'admin@example.com' });
  const adverts = initData.adverts.map((advert) => ({
    ...advert,
    owner: adminUser,
  }));

  const inserted = await Advert.insertMany(adverts);
  console.log(`${inserted.length} adverts created.`);
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
