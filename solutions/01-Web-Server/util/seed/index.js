/* Helper file for seeding user data during testing or local development */

const models = require('../../models');
const seedUsers = require('./users');
const seedNotes = require('./notes');

const seed = async () => {
  const users = await models.User.create(seedUsers());
  const notes = await models.Note.create(seedNotes(users));
  return {
    notes,
    users
  };
};

module.exports = seed;
