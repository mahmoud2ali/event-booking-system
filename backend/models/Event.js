const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Event category is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Event price is required'],
      min: 0,
    },
    image: {
      type: Object,
      default:{
        url: "",
        publicId: null,
      },
      required: [true, 'Event image is required'],
    },
    bookedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model (users who booked the event)
      }],
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Event', eventSchema);
