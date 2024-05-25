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
    const event = await Event.findById(eventId).populate('submitted_by').populate('feedback.name');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
  
    // Send the event details as the response
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
