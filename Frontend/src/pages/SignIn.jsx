import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import { login  } from '../databaseFunctions/admin.js';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginDispatch }from "../store/slices/admin_slice"

const SignIn = () => {
  const navigate  = useNavigate ()
  const dispatch = useDispatch ()  

  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emailOrUsername || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    setError(''); 
    console.log("to signin");
    
    try {    
      const response = await login(formData);
      console.log('Login successful, response:', response.data.user); 
      dispatch(loginDispatch(response.data.user));             
      navigate ('/home')
    } catch (error) {      
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError(`Login failed. Please check your credentials and try again.`);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 text-black dark:bg-background-primary dark:text-text-primary">
      <div className="w-full max-w-md p-8 bg-white dark:bg-background-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        {error && (
          <div className="mb-4 text-sm text-accent-error border border-accent-error p-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="emailOrUsername"
              className="block text-sm font-medium mb-2"
            >
              Email / Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded bg-gray-100 text-black placeholder-gray-500 dark:bg-background-primary dark:border-border-primary dark:text-text-primary dark:placeholder-text-placeholder focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
              placeholder="Enter your email or username"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded bg-gray-100 text-black placeholder-gray-500 dark:bg-background-primary dark:border-border-primary dark:text-text-primary dark:placeholder-text-placeholder focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 dark:bg-background-primary dark:hover:bg-background-tertiary transition duration-300"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <NavLink to="/forgot-password" className="text-accent-primary hover:underline">
            Forgot Password?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
