// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import "./addevent.css";
// import { Context } from "../store/context";

// const AddEvent = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     image: "",
//     description: "",
//     location: "",
//     genre: "",
//     date: "",
//     time: "",
//   });
//   const [error, setError] = useState(null);

//   const [currentUser, setCurrentUser] = useContext(Context);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const response = await fetch("http://localhost:5000/event/postEvent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         ...formData,
//         submitted_by: currentUser._id,
//       }),
//     });

//     const responseData = await response.json();

//     if (response.status === 200) {
//       window.alert("Successfully added new event");
//       navigate("/UserProfile");
//     } else {
//       setError(responseData.message || "Error adding new event");
//       window.alert(responseData.message || "Error adding new event");
//     }
//   };

//   return (
//     <div className="add-event-container">
//       <h1>Add New Event</h1>
//       <form className="add-event-form" onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Image:
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </label>
//         <label>
//           Location:
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Genre:
//           <input
//             type="text"
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Date:
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Time:
//           <input
//             type="time"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default AddEvent;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./addevent.css";
import { Context } from "../store/context";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    location: "",
    genre: "Community Service",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);

  const [currentUser] = useContext(Context);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("http://localhost:5000/event/postEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formData,
        submitted_by: currentUser._id,
      }),
    });

    const responseData = await response.json();

    if (response.status === 200) {
      window.alert("Successfully added new event");
      navigate("/UserProfile");
    } else {
      setError(responseData.message || "Error adding new event");
      window.alert(responseData.message || "Error adding new event");
    }
  };

  const handleReturn = () => {
    navigate("/UserProfile");
  };

  return (
    <div className="add-event-container">
      <h1>Add New Event</h1>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="Community Service">Community Service</option>
            <option value="Education And Mentoring">
              Education And Mentoring
            </option>
            <option value="Environmental Conservation">
              Environmental Conservation
            </option>
            <option value="Healthcare and Wellness">
              Healthcare and Wellness
            </option>
            <option value="Arts and Culture">Arts and Culture</option>
            <option value="Disaster Relief and Emergency Services">
              Disaster Relief and Emergency Services
            </option>
            <option value="Animal Care">Animal Care</option>
            <option value="Human Rights and Advocacy">
              Human Rights and Advocacy
            </option>
            <option value="Sports and Recreation">Sports and Recreation</option>
            <option value="Technology and Innovation">
              Technology and Innovation
            </option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="submit" onClick={handleReturn}>
          Return to profile
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddEvent;
