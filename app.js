const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const port = 3000;

// Set up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a MongoDB client and connect to the database
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'petitions';
let db;

MongoClient.connect(url, function(err, client) {
  if (err) throw err;

  db = client.db(dbName);
  console.log(`Connected to MongoDB database at ${url}`);
});

// Define a route to handle form submissions
app.post('/submit-petition', function(req, res) {
  const name = req.body.name;
  const address = req.body.address;
  const comments = req.body.comments;

  // Insert the petition data into the MongoDB collection
  const collection = db.collection('petitions');
  collection.insertOne({ name, address, comments }, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving petition data');
      return;
    }

    console.log(`Saved petition data: ${name}, ${address}, ${comments}`);
    res.send('Petition submitted successfully!');
  });
});

// Start the server
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
