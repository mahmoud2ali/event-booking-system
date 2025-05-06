import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './eventDetails.css';

// Dummy data — replace this with fetched API data if available
const dummyEvent = {
  _id: '1',
  name: 'Tech Conference 2025',
  description: 'An exciting conference about the latest in tech.',
  category: 'Technology',
  date: '2025-08-15',
  venue: 'Grand Hall, Downtown',
  price: 120,
  image: { url: '/imgs/1.jpg' }
};

function EventDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  // Replace dummyEvent with logic to fetch by ID if backend is available
  const event = dummyEvent;

  const bookEvent = () => {
    navigate('/congrats');
  }

  return (
    <div className="event-details-page">
      <img className="event-details-image" src={event.image?.url} alt={event.name} />
      <div className="event-details-content">
        <h2 className="event-details-title">{event.name}</h2>
        <p className="event-details-meta"><strong>Date:</strong> {event.date}</p>
        <p className="event-details-meta"><strong>Venue:</strong> {event.venue}</p>
        <p className="event-details-meta"><strong>Category:</strong> {event.category}</p>
        <p className="event-details-description">{event.description}</p>
        <p className="event-details-price"><strong>Price:</strong> ${event.price}</p>
        <button className="event-details-book-btn" onClick={()=>bookEvent()}>Book Now</button>
      </div>
    </div>
  );
}

export default EventDetails;
