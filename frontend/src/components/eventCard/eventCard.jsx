import React from 'react';
import { useSelector } from 'react-redux';
import './eventCard.css';
import { Link } from 'react-router-dom';

function EventCard({ event, onBook }) {

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="event-card">
      <img src={event?.image?.url} alt={event?.name} className="event-card-img" />
      <div className="event-card-body">
        <h3 className="event-card-title">{event.name}</h3>
        <p className="event-card-info">{new Date(event.date).toLocaleDateString("en-us")}</p>
        <p className="event-card-info">{event.venue}</p>
        <p className="event-card-price">${event.price}</p>
        <Link to={`/events/${event._id}`} className="event-card-link">View Details</Link>
        {
          event.bookedBy.includes(user?._id) ? 
          <button className="booked" onClick={() => onBook(event._id)}>Already Booked – Click to Cancel</button>
          :
          <button className="book-now-btn" onClick={() => onBook(event._id)}>Book Now</button>
        }


      </div>
    </div>
  );
}

export default EventCard;