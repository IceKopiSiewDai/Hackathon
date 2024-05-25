import React, { useEffect, useState , useContext} from 'react';
import { useParams } from 'react-router-dom';
import './moreinfo.css'; // Import CSS file
import { Context } from '../store/context'

const MoreInfo = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // Track if the user is registered for the event
  const [currentUser, setCurrentUser] = useContext(Context);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/event/getEventDetails/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvent(data);
        setLoading(false);
        console.log("Below is the current user")
        console.log(currentUser);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

//   Function to handle registering for the event
const handleRegister = async () => {
    try {
      const token = currentUser.token; // Assuming token is stored in currentUser context
      const userId = currentUser._id; // Use the correct field for user ID

      const response = await fetch(`http://localhost:5000/user/registerEvent/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify({ userId }), // Pass the userId in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to register for the event');
      }

      setIsRegistered(true); // Update state to indicate successful registration
    } catch (err) {
      setError(err.message);
    }
  };
  
  if (loading) return <div className="more-info-container">Loading...</div>;
  if (error) return <div className="more-info-container">Error: {error}</div>;

  return (
    <div className="more-info-container">
      <h1>{event.title}</h1>
      <img src={event.image} alt={event.title} />
      <p>{event.description}</p>
      <p>Location: <a href={event.location} target="_blank" rel="noopener noreferrer">Google Maps Link</a></p>
      <p>Genre: {event.genre}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Start Time: {event.time}</p>
      <p>Organizer: {event.submitted_by ? event.submitted_by.name : 'Unknown'}</p>
      <h3>Feedback:</h3>
      {event.feedback && event.feedback.length > 0 ? (
        <ul>
          {event.feedback.map(fb => (
            <li key={fb._id}>
              <p>{fb.name && fb.name.username ? fb.name.username : 'Anonymous'}: {fb.review} (Rating: {fb.rating})</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback yet.</p>
      )}
      {!isRegistered ? (
        <button className="register-button" onClick={handleRegister}>Register</button>
      ) : (
        <button className="registered-button" disabled>Registered</button>
      )}
    </div>
  );
};

export default MoreInfo;
