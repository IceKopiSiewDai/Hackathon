// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
  },
  phoneNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  userType: {
    type: String,
    enum: ["customer", "manager"],
    default: "customer",
    required: true,
  },
  registeredEvent: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
  ],
  participatedEvent: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
