import RootLayout from '@/-components/layout';
import { useState } from 'react';

const formatTime = (timeString) => {
  const date = new Date(timeString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Europe/Istanbul',
  };
  return date.toLocaleString('en-US', options);
};

export default function ReservationForm() {
  const [userId, setUserId] = useState('');
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const fetchReservations = async (e) => {
    e.preventDefault();
    setError(null);
    setReservations([]);

    try {
      const response = await fetch(`/api/reservation?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setReservations(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while fetching the reservations');
    }
  };

  const cancelReservation = async (reservationId) => {
    console.log('Cancelling reservation with ID:', reservationId); // Log the reservation ID
    try {
      const response = await fetch(`/api/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationId }),
      });
      const data = await response.json();

      if (response.ok) {
        setReservations(reservations.filter(reservation => reservation.id !== reservationId));
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while cancelling the reservation');
    }
  };

  return (
    <RootLayout>
      <div className="bg-gradient-to-b from-blue-900 via-gray-900 to-gray-300 mt-40 max-w-md mx-auto">
        <form onSubmit={fetchReservations} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Fetch Reservations
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-xs italic">{error}</p>}

        {reservations.length > 0 && (
          <table className="min-w-full bg-white shadow-md rounded mt-4">
            <thead>
              <tr>
                {Object.keys(reservations[0]).map((key) => (
                  <th key={key} className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-black text-left text-sm uppercase font-bold">
                    {key}
                  </th>
                ))}
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-black text-left text-sm uppercase font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  {Object.keys(reservation).map((key) => {
                    let value = reservation[key];
                    if (key.toLowerCase().includes('date') || key.toLowerCase().includes('time')) {
                      value = formatTime(value);
                    }
                    return (
                      <td key={key} className="text-black py-2 px-4 border-b border-gray-200">
                        {value}
                      </td>
                    );
                  })}
                  <td className="text-black py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => {
                        window.location.reload();
                        cancelReservation(reservation.idreservation);
                    }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RootLayout>
  );
}
