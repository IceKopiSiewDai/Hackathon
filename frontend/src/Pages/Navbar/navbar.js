import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/context';
import './navbar.css';  // Import the CSS file

const NavBar = () => {
  const [currentUser, setCurrentUser] = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);  // Clear the current user
    navigate('/login');  // Navigate back to the login page
    console.log("User logged out")
    const token = localStorage.getItem('token');
    if (!token) {
    console.log("Token removed. User logged out successfully.");
    } else {
    console.log("Token still exists in localStorage. Logout failed.");
    };
  }

  return (
    <nav>
      <ul>
        <li><Link to="/homepage">Home</Link></li>
        <li><Link to="/UserProfile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
