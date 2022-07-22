// Dependencies for server
const fs = require('fs');
const express = require('fs');
const path = require('path');
const uuid = require('uuid');
const notes = require('Develop/public/assets/js/index.js')

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/db/db.json'));
});

app.get('/api/notes', (req, res) => res.json(notes));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});