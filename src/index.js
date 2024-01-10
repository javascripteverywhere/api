const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello Web Server!!!'));
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));