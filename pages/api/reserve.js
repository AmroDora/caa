import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { pickupLocation, pickupDate, dropoffDate, userId, carId } = req.body;

      const connection = await pool.getConnection();
      try {
        const sql = `
        INSERT INTO Reservation 
        (pickup_datetime, return_datetime, car_location, userId, carid) 
        VALUES (?, ?, ?, ?, ?)`;
        const values = [pickupDate, dropoffDate, pickupLocation, userId, carId];

        await connection.execute(sql, values);
      } finally {
        connection.release();
      }

      res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {
      console.error('Failed to handle reservation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}