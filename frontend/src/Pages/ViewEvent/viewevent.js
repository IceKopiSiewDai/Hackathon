import React, { useState, useEffect } from "react";
import "./viewevent.css";
import NavBar from "../Navbar/navbar";

const ViewEvent = () => {
  const [eventGroups, setEventGroups] = useState([]);

  useEffect(() => {
    // Fetch past events from backend
    fetchPastEvents();
  }, []);

  const fetchPastEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/event/getPastEvents");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventData = await response.json();
      setEventGroups(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <>
      <NavBar />
      <h1 className="event-heading">Past Events</h1>

      <div className="event-grid-container">
        {eventGroups.map((eventGroup, index) => (
          <div key={index} className="event-group">
            {eventGroup.map((event, eventIndex) => (
              <div key={event._id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  Location:{" "}
                  <a
                    href={event.location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps Link
                  </a>
                </p>{" "}
                <p>Genre: {event.genre}</p>{" "}
                <p>
                  Date:{" "}
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p>Start Time: {event.time}</p>
                <img src={event.image} alt="Event" />
              </div>
            ))}
            {/* Fill up empty spaces for maintaining 3x3 grid */}
            {Array.from({ length: 3 - eventGroup.length }).map(
              (_, emptyIndex) => (
                <div key={emptyIndex} className="empty-event-card"></div>
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewEvent;
