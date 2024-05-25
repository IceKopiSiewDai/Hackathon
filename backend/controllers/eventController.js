const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// Get all events
exports.getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get event details by ID
exports.getEventDetails = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId)
      .populate("submitted_by")
      .populate("feedback.name");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get event by specific ID (if needed)
exports.getEventId = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new event
exports.postEvents = asyncHandler(async (req, res) => {
  try {
    const eventExist = await Event.findOne({ title: req.body.title });
    if (eventExist) {
      return res.status(400).json({ message: "Event already exists" });
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
    res.status(201).json(event);
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
