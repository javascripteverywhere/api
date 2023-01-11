// index.js
// This is the main entry point of our application
const express = require ('express');
const app = express();
app.get ('/', (req,res) => res.send ('Hello World'));
app.listen (4000, () => console.log ('Listening on port 4000!'));