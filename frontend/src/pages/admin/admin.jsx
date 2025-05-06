import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './admin.css';
import CreateEventForm from './createEventForm';


function AdminPage() {

    const [events, setEvents] = useState([]);   

  useEffect(() => {
        fetch('./events.json')
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleDelete = async (id) => {    
        return;
    }

    return (
    <div className="admin-page">
      {/* <h2>Admin Event Manager</h2> */}
      <Link to="/admin/create" className="btn btn-primary">Create Event</Link>
        <div className="table-container">
            <table >
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through events and display them here */}
                    {/* Example row */}
                    {events.map(event => (
                        <tr>
                        <td>{event.name}</td>
                        <td>{event.description}</td>
                        <td>{event.category}</td>
                        <td>{event.date}</td>
                        <td>{event.venue}</td>
                        <td>{event.price}</td>
                        <td><img src={event.image?.url} alt="Event" /></td>
                        <td><Link to={`/admin/edit/${event._id}`}>Edit</Link> | <Link to={``} onClick={()=>handleDelete(event._id)}>Delete</Link></td>
                    </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="8">Total Events: 1</td>
                    </tr>
                </tfoot>
            </table>
        </div>
      
    </div>
  );
}

export default AdminPage;
