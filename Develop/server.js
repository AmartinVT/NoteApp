// Dependencies for server
const fs = require('fs');
const express = require('express');
//const path = require('path');
//const uuid = require('uuid');
//const notes = require('Develop/public/assets/js/index.js');
const util = require('util');
const PORT = process.env.PORT || 3000;

// Creates app to utilize express for local server management
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static('Develop/public'));

// Reading and writing
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

// GET Route for homepage
app.get("/", (req, res) => {
  read("Develop/db/db.json","utf-8")
}
  
);

// App listening to the port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});