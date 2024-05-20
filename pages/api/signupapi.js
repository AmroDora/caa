import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, password, email } = req.body;

      // Execute SQL query to insert data into the database
      const [result] = await pool.query('INSERT INTO user (name, password, email) VALUES (?, ?, ?)', [name, password, email]);

      // If insertion is successful, return success message
      res.status(201).json({ message: 'User created successfully', iduser: result.insertId });
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ message: 'Error inserting user' });
    }
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
