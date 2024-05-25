import React, { useContext, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Context } from '../store/context';
import './homepage.css';
import NavBar from '../Navbar/navbar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  const ArrowStyle = {
    display: 'block',
    background: 'black',
    borderRadius: '50%',
    width: '30px',      // Specifies width of the arrow
    height: '30px',     // Specifies height of the arrow
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '20px'    // Adjust font size for icon if using font icons
  };

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ ...style, ...ArrowStyle }}
    >
      → {/* Simple text arrow or you could use an icon */}
    </div>
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      onClick={onClick}
    >
      ← {/* Simple text arrow or you could use an icon */}
    </div>
  );
}

const Homepage = () => {
  const [currentUser] = useContext(Context);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/event/getEvents'); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: events.length > 3 ? <NextArrow /> : null,
    prevArrow: events.length > 3 ? <PrevArrow /> : null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <NavBar />
      <h1>Welcome to the Homepage</h1>
      <p>This is the homepage.</p>
      {currentUser && (
        <p>User Name: {currentUser.name}</p>
      )}
      <section id='recommended'>
        <div className='recommendedSection'>
          <Slider {...settings}>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="eventDetails">
                  <div id='imageContainer'>
                  <img src={event.image} alt={event.title} className="eventImage"/>
                  </div>
                  <div id='textContainer'>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Location:</strong> <a href={event.location} target="_blank" rel="noopener noreferrer">View on Map</a></p>
                </div>
                <Link to={`/moreinfo/${event._id}`} key={event._id}>
                  <button>View Details</button>
                </Link>
                </div>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Homepage;

