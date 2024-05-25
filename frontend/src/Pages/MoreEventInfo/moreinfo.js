import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MoreInfo = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/event/getEventDetails/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvent(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{event.title}</h1>
      <img src={event.image} alt={event.title} />
      <p>{event.description}</p>
      <p>Location: <a href={event.location} target="_blank" rel="noopener noreferrer">Google Maps Link</a></p>
      <p>Genre: {event.genre}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Submitted by: {event.submitted_by.name}</p>
      <h3>Feedback:</h3>
      {event.feedback.length > 0 ? (
        <ul>
          {event.feedback.map(fb => (
            <li key={fb._id}>
              <p>{fb.name.username}: {fb.review} (Rating: {fb.rating})</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback yet.</p>
      )}
    </div>
  );
};

export default MoreInfo;
