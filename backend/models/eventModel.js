const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  feedback: [
    {
      name: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  submitted_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
