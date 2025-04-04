import React, { useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const Login = () => {
  const { user, setUser } = useContext(UserContext); // Get user and setUser from context

  // This function handles the response from Google after a user signs in.
  const handleCredentialResponse = useCallback((response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    // Send the token to your backend for verification and to create a session
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`, { token: response.credential }, { withCredentials: true })
      .then((res) => {
        console.log("Backend response:", res.data); // Log the backend response
        setUser(res.data.user); // Update the UserContext with the logged-in user's data
        window.location.href = '/'; // Redirect to the homepage
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        alert("Failed to log in. Please try again.");
      });
  }, [setUser]);

  // Logout function
  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {}, { withCredentials: true }) // Adjust endpoint if needed
      .then(() => {
        setUser(null); // Clear the user from context
        window.location.href = '/'; // Redirect to the homepage
      })
      .catch((err) => {
        console.error("Logout error:", err);
        alert("Failed to log out. Please try again.");
      });
  };

  useEffect(() => {
    // Dynamically load the Google Identity Services script
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      // Render the Google Sign-In button inside the div with id "googleSignInDiv"
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [handleCredentialResponse]);

  return (
    <div>
      <h2>{user ? `Welcome, ${user.name}` : 'Login'}</h2>
      {user ? (
        <button onClick={handleLogout}>Logout</button> // Directly logs out the user
      ) : (
        <div id="googleSignInDiv"></div>
      )}
    </div>
  );
};

export default Login;