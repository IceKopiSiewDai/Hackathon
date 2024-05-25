import React from "react";
import { useNavigate } from "react-router-dom";
import "./organizerprofile.css";

const OrganizerProfile = () => {
  const navigate = useNavigate();

  const handleAddEventClick = () => {
    navigate("/AddEvent");
  };

  const handleViewEvent = () => {
    navigate("/ViewEvent");
  };

  return (
    <div className="organizer-profile">
      <button className="add-event-button" onClick={handleAddEventClick}>
        Add Event
      </button>
      <button className="add-event-button" onClick={handleViewEvent}>
        View Past Events
      </button>
    </div>
  );
};

export default OrganizerProfile;
