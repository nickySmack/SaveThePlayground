// pages/api/petitions.js

import { Pool } from 'pg';
import config from '../../config';

export default function handler(req, res) {
  const { startDate, endDate } = req.query; // Get startDate and endDate from query parameters

  // Create a PostgreSQL connection pool
  const pool = new Pool({
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port, // or your PostgreSQL port
    database: config.db.database
  });

  // Build the SQL query
  let queryText = 'SELECT * FROM PETITIONS';

  // Check if startDate and endDate are provided, and append to the query and values
  const values = [];
  if (startDate && endDate) {
    queryText += ' WHERE date BETWEEN $1 AND $2';
    values.push(startDate, endDate);
  }

  // Append LIMIT clause to limit the result to top 50 rows
  queryText += ' LIMIT 50';

  // Execute the SQL query with the provided parameters
  pool.query(queryText, values)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => {
      console.error('Error fetching petitions:', error);
      res.status(500).json({ error: 'Internal server error' }); // Update error response to return a JSON object
    });
}
