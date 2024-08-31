import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
const app = express()
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost', // your database host
    user: 'root',      // your database username
    password: 'ajay',  // your database password
    database: 'RoleAdmin' // your database name
  });
  
  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });

  app.get('/api/servers' , (req,res)=> {
    connection.query('SELECT * FROM Servers', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
        res.json(results);
      });
  });
  app.get('/api/groups-servers' , (req,res)=> {
    connection.query('SELECT * FROM GroupsOnServers ', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
        res.json(results);
      });
  });

const port = 5000
app.listen(port, () => console.log(`Server started on port ${port}`));