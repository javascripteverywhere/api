/* Helper file for seeding user data during testing or local development */

const models = require('../../models');
const seedUsers = require('./users');
const seedNotes = require('./notes');
const db = require('../../db');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;

const seed = async () => {
  console.log('Seeding data...');
  db.connect(DB_HOST);
  const users = await models.User.create(await seedUsers());
  await models.Note.create(await seedNotes(users));
  console.log('Data successfully seeded');
  process.exit(0);
};

seed();

// module.exports = seed;
