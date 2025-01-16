import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const Navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle success response
        console.log('Signin successful:', data.message);
        setErrorMessage('Signin successful!');
        Navigate('/');
      } else {
        // Handle error response
        console.error('Signin error:', data.message);
        setErrorMessage(data.message); // Use setErrorMessage instead
      }
    } catch (error) {
      console.error('Error during signin:', error);
      setErrorMessage('Error during signin');
    }
  };
  
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700">
      <form
        className="w-96 bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-center mb-4">Sign In</h1>

        <input
          type="text"
          id="email"
          onChange={handleChange}
          placeholder="Enter Email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password" // Updated the type to "password" for security
          id="password" // Corrected the casing to match the backend logic
          onChange={handleChange}
          placeholder="Enter Password"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Error message display */}
        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:bg-green-700 transition-all mt-4"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
