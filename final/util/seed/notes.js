/* Helper file for testing or local dev
/* Generates 25 fake notes */

const faker = require('faker');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const seedNotes = async users => {
  console.log('Seeding notes...');
  let notes = [];

  // generate notes
  for (var i = 0; i < 25; i++) {
    // pick a random user from the array
    let random = [Math.floor(Math.random() * users.length)];
    let content;

    // grab content from the lorem markdownum api
    const response = await fetch(
      'https://jaspervdj.be/lorem-markdownum/markdown.txt'
    );

    // if the response is ok, use the content else generate a fake ipsum paragraph
    if (response.ok) {
      content = await response.text();
    } else {
      content = faker.lorem.paragraph();
    }

    let note = {
      content,
      favoriteCount: 0,
      favoritedBy: [],
      author: mongoose.Types.ObjectId(users[random]._id)
    };
    notes.push(note);
  }
  return notes;
};

module.exports = seedNotes;
