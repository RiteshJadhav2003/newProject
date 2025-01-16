import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const [message, setMessage] = useState(""); // For showing success or error messages
  const Navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You already have formData in state, no need to redefine it
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)  // Send the formData directly from state
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success response
        console.log('Signup successful:', data.message);
        setMessage('Signup successful!');
        Navigate('/sign-in');
      } else {
        // Handle error response
        console.error('Signup error:', data.message);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Error during signup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700">
      <form
        className="w-96 bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-center mb-4">Sign Up</h1>

        <input
          type="email"
          id="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Enter Email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Enter Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          id="password"
          value={formData.password || ""}
          onChange={handleChange}
          placeholder="Enter Password"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:bg-green-700 transition-all mt-4"
        >
          Sign Up
        </button>

        {message && (
          <p className="text-center mt-2 text-sm text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
}
