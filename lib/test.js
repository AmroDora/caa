const mysql = require('mysql2');

const dbConfig = {
  host: 'mysql-33b5817a-car-rental-company.k.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_LE3V8r6yNStKVUxsFTL',
  database: 'defaultdb',
  port: 24150
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL successfully!');

  connection.end((endErr) => {
    if (endErr) {
      console.error('Error closing MySQL connection:', endErr);
      return;
    }
    console.log('MySQL connection closed.');
  });
});
