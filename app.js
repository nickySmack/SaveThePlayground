const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const config = require('./config.js')
const formRoute = require('./pages/api/submit-petition');


// Create an instance of Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// // Create a PostgreSQL connection pool
// const pool = new Pool({
//   user: config.db.user,
//   password: config.db.password,
//   host: config.db.host,
//   port: config.db.port, // or your PostgreSQL port
//   database: config.db.database
// });


// Pass the PostgreSQL connection pool to the submit-petition route handler
app.prepare()
  .then(() => {
    // Create an Express server
    const server = express();

    // Middleware for parsing request body
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(formRoute);

    // Handle form submission
    // server.post('/submit-petition', (req, res) => {
    //   const submitPetition = require('./pages/api/submit-petition.js'); // Import the submit-petition module
    //   submitPetition(req, res, pool); // Pass the pool as a parameter
    // });

    // server.get('/', (req, res) => {
    //   // Use the sendFile() function to send the index.js file as the response
    //   res.sendFile(path.join(__dirname, 'index.js'));
    // });
    // Start the server
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
