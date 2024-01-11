//require mongoose library
const mongoose = require('mongoose');

//define the note's database schema
const noteSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},
{
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

//define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);

//export the module
module.exports = Note;