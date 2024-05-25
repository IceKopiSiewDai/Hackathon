import React from "react";
import { useNavigate } from "react-router-dom";
import "./organizerprofile.css";

const OrganizerProfile = () => {
  const navigate = useNavigate();

  const handleAddEventClick = () => {
    navigate("/AddEvent");
  };

  return (
    <div className="organizer-profile">
      <button className="add-event-button" onClick={handleAddEventClick}>
        Add Event
      </button>
    </div>
  );
};

export default OrganizerProfile;
