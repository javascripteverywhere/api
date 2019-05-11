/* Helper file for testing or local dev
/* Generates 10 fake users */

const faker = require('faker');
const bcrypt = require('bcrypt');

const gravatar = require('../gravatar');

const seedUsers = async () => {
  console.log('Seeding users...');
  let users = [];

  // generate 10 user profiles
  for (var i = 0; i < 10; i++) {
    let user = {
      username: faker.internet.userName(),
      password: await bcrypt.hash('password', 10),
      email: faker.internet.email()
    };
    user.avatar = gravatar(user.email);
    users.push(user);
  }
  return users;
};

module.exports = seedUsers;
