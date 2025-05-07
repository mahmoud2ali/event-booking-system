import React, { useEffect, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import './admin.css';
import { getEvents, deleteEvent } from '../../redux/apiCalls/eventApiCalls';
import CreateEventForm from '../../components/forms/createEventForm';
import Swal from 'sweetalert2';
import { ClipLoader } from "react-spinners";

//for loading spinner
const override = {
    display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f8f9fa",
  zIndex: 999,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",

  };

function AdminPage() {
    const {events} = useSelector((state) => state.events);
    
    const {loading} = useSelector((state) => state.events);

    const dispatch = useDispatch();

    const handleDelete = async (id) => {    
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteEvent(id));
                Swal.fire(
                    'Deleted!',
                    'Event has been deleted.',
                    'success'
                )
            }
        })
    }


    
     useEffect(() => {
            dispatch(getEvents());
        }, [dispatch]);
    

    return (
    <div className="admin-page">

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

      {/* <h2>Admin Event Manager</h2> */}
      <Link to="/admin/create-event" className="btn btn-primary">Create Event</Link>
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
                        <td><Link to={`/admin/edit-event/${event._id}`}>Edit</Link> | <Link to={``} onClick={()=>handleDelete(event._id)}>Delete</Link></td>
                    </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="8">Total Events: {events.length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
      
    </div>
  );
}
export default AdminPage;
