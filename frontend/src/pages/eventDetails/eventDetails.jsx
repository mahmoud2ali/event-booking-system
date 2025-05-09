import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { getSingleEvent,toggleBookEvent } from '../../redux/apiCalls/eventApiCalls';
import './eventDetails.css';
import Swal from 'sweetalert2';
import { ClipLoader } from "react-spinners";


function EventDetails() {
  const { id } = useParams();

  const {singleEvent, loading} = useSelector((state) => state.events);
  const {user} = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Replace dummyEvent with logic to fetch by ID if backend is available
  
  
  const handleBookNow = (eventId) => {
    const booked = singleEvent?.bookedBy?.includes(user?._id);
    
    if(!user){
      Swal.fire({
        title: 'Please login first',
        text: 'You need to be logged in to book an event.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return; 
    }
    
    dispatch(toggleBookEvent(eventId));
    
    if(booked){
      Swal.fire({
        title: 'Booking Cancelled',
        text: 'You have successfully cancelled your booking.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    else{
      navigate('/congrats');
    }
  };
  
  useEffect(() => {
    dispatch(getSingleEvent(id));
  }
  , [dispatch, id]);
  
  const event = singleEvent;

  return (
    <>
      {loading && 
        <div className="fullscreen-loader">
            <ClipLoader
            color="#3a86ff"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
        </div>
      }
      <div className="event-details-page">
        <img className="event-details-image" src={event?.image?.url} alt={event?.name} />
        <div className="event-details-content">
          <h2 className="event-details-title">{event?.name}</h2>
          <p className="event-details-meta"><strong>Date:</strong> {new Date(event?.date).toLocaleDateString("en-us")}</p>
          <p className="event-details-meta"><strong>Venue:</strong> {event?.venue}</p>
          <p className="event-details-meta"><strong>Category:</strong> {event?.category}</p>
          <p className="event-details-description">{event?.description}</p>
          <p className="event-details-price"><strong>Price:</strong> ${event?.price}</p>
          {
            event?.bookedBy.includes(user?._id)
            ?
            <button className="booked" onClick={() => handleBookNow(event._id)}>Already Booked – Click to Cancel</button>
            :
            <button className="event-details-book-btn" onClick={()=>handleBookNow(event._id)}>Book Now</button>
          }
        </div>
      </div>
    </>
  );
}

export default EventDetails;
