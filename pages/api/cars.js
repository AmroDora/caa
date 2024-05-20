import pool from "@/lib/db"; // Ensure this path is correct based on your project structure

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM cars WHERE availability = 1');

    // Convert binary image data to base64
    const cars = rows.map(car => ({
      ...car,
      imageUrl: car.imageUrl ? Buffer.from(car.imageUrl).toString('base64') : null,
    }));

    res.status(200).json(cars);
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
