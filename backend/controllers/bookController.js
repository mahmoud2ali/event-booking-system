const Event = require('../models/Event');
const asyncHandler = require('express-async-handler');

// @desc    Book an event
// @route   POST /api/events/book/:eventId
// @access  Private (User must be logged in)
// Toggle booking status
const bookEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.id; // Assuming user is authenticated (JWT)

  // Find the event by ID
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if the user has already booked the event
  const isEventBooked = event.bookedBy.find(user=> user.toString() === userId);
  if (isEventBooked) {
    await Event.findByIdAndUpdate(eventId, {
        $pull: {
          bookedBy: userId 
        }
      }, { new: true});
  }
  else
  {
    await Event.findByIdAndUpdate(eventId,{
        $push: {
          bookedBy: userId
        }  
      }, { new: true});
  }
  const updatedEvent = await Event.findById(eventId);
  res.status(200).json(updatedEvent);
});


module.exports = {
    bookEvent
}