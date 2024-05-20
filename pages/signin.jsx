import React, { useState } from 'react';
import Link from 'next/link';
import contactBackground from '../-components/images/BMW.webp';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Sending email and password
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      // Save user ID to local storage
      localStorage.setItem('userId', data.userId);

      // Authentication successful, redirect or handle accordingly
      window.location.href = '/cat';
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <header className="relative w-full h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${contactBackground.src})` }}>
      <div className="mt-52 w-11/12 max-w-md mx-auto bg-opacity-70 bg-gray-200 p-5 text-gray-800 rounded-xl text-center">
        <h2 className="bg-opacity-70 text-xl font-bold p-3 text-black rounded-xl">Sign In</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignIn} className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 font-bold">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 mb-4 rounded border border-gray-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 mb-4 rounded border border-gray-300"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 mb-4 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">Sign In</button>
        </form>
        <Link href="/"> <button className=" p-2 rounded bg-green-500 text-white hover:bg-blue-600 cursor-pointer">Back</button></Link>
      </div>
    </header>
  );
};

export default SignIn;