import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Catalog() {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Failed to fetch car data:', error);
    }
  };

  const handleRentNowClick = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      pickupLocation,
      pickupDate,
      dropoffDate,
      userId,
      carId: selectedCar.idcars, // Use selected car's ID
    };
    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      const data = await response.json();
      console.log(data);
      setShowModal(false);
      // Optionally, you can refresh the car list or provide user feedback here
    } catch (error) {
      console.error('Failed to submit reservation:', error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 via-gray-900 to-gray-300 mx-auto py-10 pt-36">
      <div className="ml-48 grid grid-cols-1 container md:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.idcars} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              alt={car.car_type}
              src={car.car_pic ? `data:image/jpeg;base64,${Buffer.from(car.car_pic).toString('base64')}` : '/images/placeholder.png'}
              width={300}
              height={300}
              fetchpriority="high"
            />
            <div className="p-4">
              <h2 className="text-lg text-blue-600 font-semibold mb-2">Car Name : {car.car_type}</h2>
              <h2 className="text-lg text-blue-600 font-semibold mb-2">PickUp Location : {car.car_location}</h2>
              <h2 className="text-lg text-blue-600 font-semibold mb-2">Number of Seats : {car.number_of_seats}</h2>
              <p className="text-blue-600 mb-2">Price : {car.rental_price}/Daily</p>
              <button onClick={() => handleRentNowClick(car)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Reservation Form</h2>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="pickupLocation" className="text-sm font-medium">Pickup Location:</label>
                <input type="text" id="pickupLocation" name="pickupLocation" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required className="input-field border border-black rounded-lg" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="pickupDate" className="text-sm font-medium">Pickup Date:</label>
                <input type="datetime-local" id="pickupDate" name="pickupDate" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required className="input-field border border-black rounded-lg" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dropoffDate" className="text-sm font-medium">Dropoff Date:</label>
                <input type="datetime-local" id="dropoffDate" name="dropoffDate" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} required className="input-field border border-black rounded-lg" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="userId" className="text-sm font-medium">User ID:</label>
                <input type="text" id="userId" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required className="input-field border border-black rounded-lg" />
              </div>
              <div className="flex justify-between">
                <button onClick={() => window.location.reload()} className="btn-secondary">Back</button>
                <input type="submit" value="Submit" className="btn-primary cursor-pointer" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;
