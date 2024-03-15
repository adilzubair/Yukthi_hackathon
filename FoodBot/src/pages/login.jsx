import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/sample2.jpg'; // Add your image path here

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ 
        backgroundImage: `url(${backgroundImage})`, // Background image is added here
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
      <div className="w-full max-w-xl space-y-8 bg-white p-20 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"> {/* Increased max-width and padding */}
        <div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900">Sign in to FoodBot</h2> {/* Optional: Increased text size */}
          <p className="mt-2 text-center text-sm text-gray-600">Your ultimate food destination</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
