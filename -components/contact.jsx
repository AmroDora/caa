import contactBackground from './images/contact-picture.jpg';
import React, { useEffect, useState } from 'react';

const ContactUsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${contactBackground.src})` }}>
      <div className=" w-1/2 mt-24 mx-auto bg-opacity-70 bg-gray-200 p-5 text-gray-800 rounded-xl text-center">
        <h2 className="text-3xl mb-4">Contact Us</h2>
        <h3 className="text-xl mb-6">For any further info feel free to contact us.</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-bold text-black">Name:</label>
            <input type="text" id="name" name="name" className="w-full md:w-1/2 p-2 mb-4 rounded border border-gray-300" required />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-bold text-black">Email:</label>
            <input type="email" id="email" name="email" className="w-full md:w-1/2 p-2 mb-4 rounded border border-gray-300" required />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 font-bold text-black">Message:</label>
            <textarea id="message" name="message" rows="4" className="w-full md:w-1/2 p-2 rounded border border-gray-300 resize-vertical" required></textarea>
          </div>
          <button type="submit" className="w-full md:w-1/2 p-2 mb-4 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 cursor-pointer">Submit</button>
        </form>
      </div>
      {showModal && (
    <div className="fixed text-white inset-0 flex items-center justify-center bg-black bg-opacity-50" >
      Request Submitted
      <button type="button" onClick={() => setShowModal(false)} className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
         Close
      </button>
    </div>
    
  )}
    </div>
   
  );

  
};

export default ContactUsPage;
