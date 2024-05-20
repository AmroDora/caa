import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by looking for user ID in local storage
    const userId = localStorage.getItem('userId');
    console.log('User ID from localStorage:', userId);
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear user ID from local storage
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    // Redirect to home page or sign-in page
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-200 bg-opacity-70 text-white py-4 fixed top-0 left-0 w-full shadow-md">
      <ul className="list-none flex justify-center m-0 p-0">
        <li className="mr-8">
          <Link href="/" passHref>
            <div className="text-black no-underline px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">Home</div>
          </Link>
        </li>
        <li className="mr-8">
          <Link href="/cat" passHref>
            <div className="text-black no-underline px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">Catalog</div>
          </Link>
        </li>
        <li className="mr-8">
          <Link href="/c" passHref>
            <div className="text-black no-underline px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">Contact Us</div>
          </Link>
        </li>
        {isLoggedIn && (
          <li className="mr-8">
            <Link href="/myreservation" passHref>
              <div className="text-black no-underline px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">My Reservation</div>
            </Link>
          </li>
          )}
          {!isLoggedIn && (
            <li className="   mr-28 absolute top-0 right-0 m-4">
              <Link href="/signup" passHref>
                <div className="text-black no-underline px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">Sign Up</div>
              </Link>
            </li>
        )}
        <li className="absolute top-0 right-0 m-4">
          {isLoggedIn ? (
            <div onClick={handleLogout} className="text-black no-underline px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">Logout</div>
          ) : (
            <Link href="/signin" passHref>
              <div className="text-black no-underline px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">Sign In</div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
