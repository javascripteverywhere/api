/* Helper file for testing or local dev
/* Generates 25 fake notes */

const faker = require('faker');
const md = require('marked').setOptions({ headerIds: true, sanitize: true });
const mongoose = require('mongoose');

const seedNotes = users => {
  let notes = [];

  // generate notes
  for (var i = 0; i < 25; i++) {
    // pick a random user from the array
    let random = [Math.floor(Math.random() * users.length)];
    let content = faker.lorem.paragraph();
    let htmlContent = md(content);

    let note = {
      content,
      htmlContent,
      favoriteCount: 0,
      favoritedBy: [],
      author: mongoose.Types.ObjectId(users[random]._id)
    };
    notes.push(note);
  }
  return notes;
};

module.exports = seedNotes;
