import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch('/api/signupapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('User created successfully with ID:', data.iduser);
        // Redirect to another page after successful signup
        router.push('/signin');
      } else {
        console.error('Failed to create user:', response.statusText);
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover" style={{ backgroundImage: `url('/BMW.webp')` }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md  w-1/4">
        <h2 className="text-2xl text-black font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-black">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-black">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400 text-black"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Sign Up</button>
        </form>
        <div className="mt-4">
          <button onClick={goBack} className="text-blue-500 hover:underline">Back</button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
