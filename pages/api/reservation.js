import pool from "@/lib/db";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userid is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM Reservation WHERE userId = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No reservations found for the given userid' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
