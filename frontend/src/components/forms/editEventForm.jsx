// src/pages/admin/EditEvent.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import request from '../../utils/request'; // Axios instance
import { useSelector, useDispatch } from 'react-redux';
import { getSingleEvent, updateEvent } from '../../redux/apiCalls/eventApiCalls';
import { ClipLoader } from "react-spinners";
import "./form.css"; 

function EditEvent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {singleEvent} = useSelector((state) => state.events);
  const {isCreated, loading} = useSelector((state) => state.events);
  
  
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const [eventData, setEventData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', eventData.title); 
    formData.append('description', eventData.description);
    formData.append('category', eventData.category);
    formData.append('price', eventData.price);
    formData.append('date', eventData.date);
    formData.append('venue', eventData.venue);
    if (eventData.image) {
      formData.append('image', eventData.image); // Append the image file
    }
    dispatch(updateEvent(id, formData));
    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };


  useEffect(() => {
    // Fetch event only on mount
    dispatch(getSingleEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Populate form fields when event is fetched
    if (singleEvent) {
      setEventData({
        title: singleEvent.name || '',
        description: singleEvent.description || '',
        category: singleEvent.category || '',
        price: singleEvent.price || 0,
        date: singleEvent.date ? singleEvent.date.split('T')[0] : '',
        venue: singleEvent.venue || '',
        image: null,
      });
    }
  }, [singleEvent]);


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
      <form onSubmit={handleSubmit} className="form-container">
          
        <div className="form-header">Edit Event</div>

        <div className="form-body">
          <label>Title</label>
          <input name="title" value={eventData.title} onChange={handleChange} />

          <label>Description</label>
          <input name="description" value={eventData.description} onChange={handleChange} />

          <label>Category</label>
          <input name="category" value={eventData.category} onChange={handleChange} />

          <label>Price</label>
          <input name="price" type="number" value={eventData.price} onChange={handleChange} />

          <label>Date</label>
          <input name="date" type="date" value={eventData.date?.split('T')[0]} onChange={handleChange} />

          <label>Venue</label>
          <input name="venue" value={eventData.venue} onChange={handleChange} />


          <label htmlFor="image">Image</label>
          <input
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setEventData((prev) => ({
              ...prev,
              image: e.target.files[0], // Store the File object
            }))
          }
          />

          <button type="submit" className="form-btn">Update Event</button>
          </div>
      </form>
    </>
  );
}

export default EditEvent;
