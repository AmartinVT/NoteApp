// Dependencies for server
const fs = require('fs');
const express = require('express');
const path = require('path');
const util = require('util');


// Creates app to utilize express for local server management
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static("./public"));

// Reading and writing
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

// GET Route for database
app.get("api/notes", (req, res) => {
  read("/db/db.json","UTF-8").then(function (data){
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
});
 
// POST Route for database
app.post("/api/notes", (req, res) => {
  const note = req.body;
  read("/db/db.json","UTF-8").then(function (data){
    let notes = [].concat(JSON.parse(data));
    note.id == notes.length + 1;
    notes.push(note);
    return notes;
  }).then(function (notes){
    write("/db/db.json",JSON.stringify(notes))
    res.json(notes);
  })
});

// HTML Route for homepage
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname,"/public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

// App listening to the port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});