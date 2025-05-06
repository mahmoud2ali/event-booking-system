const Event = require('../models/Event');
const asyncHandler = require('express-async-handler');
const fs = require("fs"); 
const path = require("path")
const { cloudinaryUploadImage, cloudinaryremoveImage } = require("../utils/cloudinary");


/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
const getAllEvents = asyncHandler(async (req, res) => {
  try {
    // Retrieve all events from the database
    const events = await Event.find();

    // Check if events exist
    if (events.length === 0) {
      res.status(404);
      throw new Error('No events found');
    }

    // Return the events
    res.status(200).json(events);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching events');
  }
});


// @desc    Book an event
// @route   POST /api/events/book/:eventId
// @access  Private (User must be logged in)
const bookEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user._id; // Assuming user is authenticated (JWT)

  // Find the event by ID
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if the user has already booked the event
  if (event.bookedBy.includes(userId)) {
    res.status(400);
    throw new Error('You have already booked this event');
  }

  // Add the user to the bookedBy array
  event.bookedBy.push(userId);
  await event.save();

  res.status(200).json({ message: 'Event booked successfully' });
});



// @desc    Cancel a booked event
// @route   DELETE /api/book/:eventId
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user._id; // From protect middleware

  // Find the event
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user has booked the event
  const alreadyBooked = event.bookedBy.includes(userId);
  if (!alreadyBooked) {
    res.status(400);
    throw new Error('You have not booked this event');
  }

  // Remove user from bookedBy array
  event.bookedBy = event.bookedBy.filter(id => id.toString() !== userId.toString());

  await event.save();

  res.status(200).json({ message: 'Booking cancelled successfully' });
});



// @desc    Get all users who booked an event
// @route   GET /api/events/booked/:eventId
// @access  Only Admin
const getBookedUsers = asyncHandler(async (req, res) => {
    const eventId = req.params.eventId;
    
    // Find the event and populate bookedBy field
    const event = await Event.findById(eventId).populate('bookedBy', 'name email');
    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }
    
    res.status(200).json(event.bookedBy); // Return the list of booked users
});




// @desc    Admin creates a new event
// @route   POST /api/admin/event
// @access  Admin
const adminCreateEvent = asyncHandler(async (req, res) => {
  console.log(req.user);
  console.log(req.body.name)
  const { name, description, category, date, venue, price } = req.body;

  if(!req.file)
  {
    return res.status(400).json({message: "no image provided"});
  }

  if (!name || !description || !date || !venue || !price) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }


  //upload photo
  const imagePath = path.join(__dirname, "../imgs" ,req.file.filename);
  console.log(imagePath)
  const result = await cloudinaryUploadImage(imagePath);
  console.log(result);

  const newEvent = new Event({
    name,
    description,
    category,
    date,
    venue,
    price,
    image:{
      url: result.secure_url,
      publicId: result.public_id
    }
  });

  fs.unlinkSync(imagePath); 

  const savedEvent = await newEvent.save();

  res.status(201).json(savedEvent);
});



/*
*@desc    Admin deletes an event
*@route   DELETE /api/admin/event/:eventId
*@access  Admin
*/
const adminDeleteEvent = asyncHandler(async (req, res) => {
  // Find the event by ID
  const event = await Event.findById(req.params.eventId);

  // If event not found, return 404
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // If the event has an image, remove it from Cloudinary
  if (event.image && event.image.publicId) {
    try {
      await cloudinaryremoveImage(event.image.publicId);
    } catch (error) {
      res.status(500);
      throw new Error("Error removing image from Cloudinary");
    }
  }

  // Delete the event from the database using deleteOne()
  await Event.deleteOne({ _id: event._id });

  res.status(200).json({ message: "Event removed by admin." });
});



/**
 * @desc    Update an existing event by ID
 * @route   PUT /api/events/admin/update/:eventId
 * @access  Private, Admin only
 */
const updateEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;

  // Find the event by ID
  const event = await Event.findById(eventId);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Destructure the body to get updated fields
  const { name, description, category, date, venue, price } = req.body;

  // Check if a new image is provided
  let updatedImage = event.image; // Keep the old image by default

  if (req.file) {
    // If there is a new image, upload it to Cloudinary
    try {
      const imagePath = path.join(__dirname, `../imgs/${req.file.filename}`);
      const result = await cloudinaryUploadImage(imagePath);
      updatedImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };

      // Remove the old image from Cloudinary
      if (event.image && event.image.publicId) {
        await cloudinaryremoveImage(event.image.publicId);
      }
      fs.unlinkSync(imagePath);
    } catch (error) {
      res.status(500);
      throw new Error('Error uploading image to Cloudinary');
    }
  }

  // Update event details
  event.name = name || event.name;
  event.description = description || event.description;
  event.category = category || event.category;
  event.date = date || event.date;
  event.venue = venue || event.venue;
  event.price = price || event.price;
  event.image = updatedImage;

  // Save the updated event
  const updatedEvent = await event.save();

  res.status(200).json(updatedEvent);
});

module.exports = {
    getAllEvents,
    bookEvent,
    cancelBooking,
    getBookedUsers,
    adminCreateEvent,
    adminDeleteEvent,
    updateEvent
  // (include other exported controllers here, like bookEvent if needed)
};
  