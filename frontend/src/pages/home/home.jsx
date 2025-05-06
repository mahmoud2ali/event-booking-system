import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../components/eventCard/eventCard'
import './home.css'
import Swal from 'sweetalert2';
import FilterSidebar from '../../components/filterSidebar/filterSidebar';

function Home() {
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('./events.json')
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(error => console.error('Error fetching events:', error));
    }, []);


    const handleBookNow = (eventId) => {
        console.log(`Booking event with ID: ${eventId}`);
        // Logic to handle booking, such as redirecting to a booking page or showing a modal
      
  
        navigate('/congrats');
      };
    
      const [filters, setFilters] = useState({ category: '', maxPrice: '', date: '' });

      
  const filteredEvents = events.filter(event => {
    return (!filters.category || event.category === filters.category) &&
           (!filters.maxPrice || event.price <= parseFloat(filters.maxPrice)) &&
           (!filters.date || event.date === filters.date);
  });

  return (
    <div className='home-page'>

    <FilterSidebar filters={filters} setFilters={setFilters} />
    
      <h2>Your Gateway to Unforgettable Moments</h2>
      <div className="event-cards-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event._id} event={event} onBook={() => handleBookNow(event._id)} />
          ))
        ) : (
          <div className="no-events-message">No events found. Please check back later!</div>
        )}
      </div>
  </div>
  
)}

export default Home