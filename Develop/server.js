// Dependencies for server
const fs = require('fs');
const express = require('fs');
const path = require('path');
const uuid = require('uuid');
const notes = require('Develop/public/assets/js/index.js');
const util = require('util');
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));

// Reading and writing
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

// GET Route for homepage
app.get('Develop/public/notes.html', (req, res) => {
  read("Develop/db/db.json","utf-8")
}
  
);

// App listening to the port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});