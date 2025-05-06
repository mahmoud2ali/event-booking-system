// src/pages/admin/EditEvent.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import request from '../../utils/request'; // Axios instance
import "../../components/forms/form.css"; 

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    date: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await request.get(`/api/events/${id}`);
        setEventData(res.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request.put(`/api/events/${id}`, eventData);
      navigate('/admin');
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  return (
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

        <button type="submit" className="form-btn">Update Event</button>
        </div>
    </form>
  );
}

export default EditEvent;
