import React, { useContext } from 'react';
import { Context } from '../store/context';
import './homepage.css';
import NavBar from '../Navbar/navbar';

const Homepage = () => {
  const [currentUser] = useContext(Context);

  return (
    <>
     <NavBar/>
      <h1>Welcome to the Homepage</h1>
      <p>This is the homepage.</p>
      {currentUser && (
          <p>User Name: {currentUser.name}</p>
      )}
    </>
  );
};

export default Homepage;
