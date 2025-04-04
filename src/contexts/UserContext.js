import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state to handle async operations

  useEffect(() => {
    // Fetch the currently logged-in user from the backend
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, { withCredentials: true });
        console.log("Fetched user data:", res.data); // Log the fetched user data
        setUser(res.data); // Set the user data if the user is logged in
      } catch (err) {
        console.error("Error fetching user data:", err.response || err); // Log the error
        setUser(null); // Set user to null if not logged in
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    // Optionally, render a loading state while fetching user data
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;