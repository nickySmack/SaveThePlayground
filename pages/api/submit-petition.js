export default function handler(req, res) {
  const { Pool } = require('pg');
  const config = require('../../config')
  // Create a PostgreSQL connection pool
const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port, // or your PostgreSQL port
  database: config.db.database
});
  const { name, address, comments } = req.body;
  const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '');
  // Insert form data into PostgreSQL
  const query = {
    text: 'INSERT INTO PETITIONS (name, address, comments, date) VALUES ($1, $2, $3, $4)',
    values: [name, address, comments, timestamp]
  };

  pool.query(query)
    .then(() => {
      console.log('Form data inserted into PostgreSQL successfully');
      //res.send('Form data submitted successfully');
      res.redirect(301, '/thankyou');
    })
    .catch(error => {
      console.error('Error inserting form data into PostgreSQL', error);
      res.status(500).send('Internal server error');
    });
}
