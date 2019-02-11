/* Helper file for testing or local dev
/* Generates 10 fake users */

const faker = require('faker');

const seedUsers = () => {
  let users = [];

  // generate 10 user profiles
  for (var i = 0; i < 10; i++) {
    let user = {
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      providerId: faker.random.uuid(),
      provider: 'github',
      email: faker.internet.email(),
      avatar: faker.internet.avatar()
    };
    users.push(user);
  }
  return users;
};

module.exports = seedUsers;
