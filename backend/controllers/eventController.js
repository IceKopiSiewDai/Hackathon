const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Event = require("../models/eventModel");

exports.getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

exports.getEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find the event by ID
    const event = await Event.findById(eventId)
      .populate("submitted_by")
      .populate("feedback.name");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Send the event details as the response
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getEventId = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.find({ _id: eventId });
  res.status(200).json(event);
});

exports.postEvents = asyncHandler(async (req, res) => {
  try {
    const eventExist = await Event.findOne({ title: req.body.title });

    if (eventExist) {
      res.status(400);
      throw new Error("Event already exists");
    }

    const event = await Event.create({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      location: req.body.location,
      genre: req.body.genre,
      date: req.body.date,
      time: req.body.time,
      submitted_by: req.body.submitted_by,
    });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getPastEvents = asyncHandler(async (req, res) => {
  try {
    // Fetch events with date less than current date
    const currentDate = new Date();
    const events = await Event.find({ date: { $lt: currentDate } });
    // Divide events into groups of 3
    const eventGroups = [];
    for (let i = 0; i < events.length; i += 3) {
      eventGroups.push(events.slice(i, i + 3));
    }
    res.status(200).json(eventGroups);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

exports.registerEvent = asyncHandler(async (req, res) => {
  const { userId } = req.body; // Extract userId from request body
  const eventId = req.params.id; // Event ID passed in the request params

  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  // Update the user's registeredEvent array with the event ID
  await User.findByIdAndUpdate(userId, { $push: { registeredEvent: eventId } });

  res.status(200).json({ message: 'Event registered successfully' });
});