//require mongoose library
const mongoose = require('mongoose');

//define the note's database schema
const noteSchema = new mongoose.Schema();

//define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);

//export the module
module.exports = Note;