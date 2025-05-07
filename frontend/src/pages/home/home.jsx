import React , { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EventCard from '../../components/eventCard/eventCard'
import './home.css'
import Swal from 'sweetalert2';
import FilterSidebar from '../../components/filterSidebar/filterSidebar';
import { getEvents, toggleBookEvent } from '../../redux/apiCalls/eventApiCalls';
function Home() {
  // const [events, setEvents] = useState([]);
  
  const {user} = useSelector((state) => state.auth);
  const {events} = useSelector((state) => state.events);
  
  const [filters, setFilters] = useState({ category: '', maxPrice: '', date: '' });
    
  const navigate = useNavigate();
   
  const dispatch = useDispatch();

   
  const handleBookNow = (eventId) => {
      const updatedEvent = events.find(ev => ev._id === eventId);
      const booked = updatedEvent.bookedBy.includes(user?._id);

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
  
  const filteredEvents = events.filter((event) => {
    const matchesCategory = filters.category ? event.category === filters.category : true;
    const matchesPrice = filters.maxPrice ? event.price <= Number(filters.maxPrice) : true;
    const matchesDate = filters.date
      ? event.date?.split('T')[0] === filters.date
      : true;

    return matchesCategory && matchesPrice && matchesDate;
  });

      useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);


  return (
    <div className='home-page'>

    <FilterSidebar filters={filters} setFilters={setFilters} />
    
      <h2>Your Gateway to Unforgettable Moments</h2>
      <div className="event-cards-container">
        {filteredEvents.length > 0 ? (
          filteredEvents?.map(event => (
            <EventCard key={event._id} event={event} onBook={() => handleBookNow(event._id)} />
          ))
        ) : (
          <div className="no-events-message">No events found. Please check back later!</div>
        )}
      </div>
  </div>
  
)}

export default Home