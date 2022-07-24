// Dependencies for server
const fs = require('fs'); // User entry 
const express = require('express'); // Node web-app express for use with node
const path = require('path'); // Dependency for managing file paths on the local server
const util = require('util'); // Allows for node promising to read and write


// Creates app to utilize express for local server management
const app = express();
const PORT = process.env.PORT || 3001; //3001 for localhost and process.env.PORT for heroku

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static("./public"));

// Reading and writing using .fs
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

// GET Route for database
app.get("/api/notes", (req, res) => {
  read("./db/db.json","UTF-8").then(function (data){
    notes = [].concat(JSON.parse(data)) // Sets notes variable with parising
    res.json(notes);
  })
});
 
// POST Route for database
app.post("/api/notes", (req, res) => {
  const note = req.body; // Defines the notes as the body entry field
  read("./db/db.json","UTF-8").then(function (data){
    let notes = [].concat(JSON.parse(data)); // Sets notes variable w/ parsing
    note.id = notes.length + 1; // Incremental ID development based on array length
    notes.push(note); // Pushes new note to end of the array
    return notes;
  }).then(function (notes){
    write("./db/db.json",JSON.stringify(notes)) // Adds note to the database file
    res.json(notes);
  })
});

// HTML Route for homepage

// URL for the notes page ending in /notes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname,"/public/notes.html"));
});

// URL for the home page if the URL ends in /
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

// URL for the home page if anything BUT /notes or / is entered, essentially error-proofing
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

// App listening to the port >> returns validation that the server is listening and the port #
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});