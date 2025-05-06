import React from 'react';
import './eventCard.css';
import { Link } from 'react-router-dom';

function EventCard({ event, onBook }) {
  return (
    <div className="event-card">
      <img src={event.image?.url} alt={event.name} className="event-card-img" />
      <div className="event-card-body">
        <h3 className="event-card-title">{event.name}</h3>
        <p className="event-card-info">{event.date}</p>
        <p className="event-card-info">{event.venue}</p>
        <p className="event-card-price">${event.price}</p>
        <Link to={`/events/${event._id}`} className="event-card-link">View Details</Link>
        <button className="book-now-btn" onClick={() => onBook(event._id)}>Book Now</button>
      </div>
    </div>
  );
}

export default EventCard;