import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { reservationId } = req.body;

      console.log('Request body:', req.body); // Log the request body

      if (!reservationId) {
        return res.status(400).json({ error: 'Reservation ID is required' });
      }

      const connection = await pool.getConnection();
      try {
        const sql = "DELETE FROM Reservation WHERE idreservation = ?";
        const values = [reservationId];

        const [result] = await connection.execute(sql, values);
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Reservation not found' });
        }
      } finally {
        connection.release();
      }

      res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}