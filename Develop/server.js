// Dependencies for server
const fs = require('fs');
const express = require('express');
//const path = require('path');
//const uuid = require('uuid');
//const notes = require('Develop/public/assets/js/index.js');
const util = require('util');
const PORT = process.env.PORT || 5500;

// Creates app to utilize express for local server management
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static("Develop/public"));

// Reading and writing
const getNotes = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

// GET Route for homepage
app.get("/api/notes", (req, res) => {
  getNotes("./Develop/db/db.json","utf-8").then(function (data){
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
}
  
);

// App listening to the port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});