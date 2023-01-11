// index.js
// This is the main entry point of our application
const express = require ('express');
const app = express();
const port = process.env.PORT || 4000;
app.get ('/', (req,res) => res.send ('Hello nice Server!!!'));
app.listen (port, () => 
console.log (`Server running at http:// localhost: ${port}`));