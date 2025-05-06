import React, { useState } from 'react';
import "../../components/forms/form.css";

function CreateEventForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    date: '',
    venue: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('date', formData.date);
    data.append('venue', formData.venue);
    data.append('price', formData.price);
    data.append('image', formData.image); // file object
  
    onSubmit(data);
  
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      date: '',
      venue: '',
      price: '',
      image: null
    });
  
    // Optional: reset file input visually (if needed)
    e.target.reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-header">Create New Event</div>
      <div className="form-body">
        <label htmlFor="name">Event Name</label>
        <input name="name" value={formData.name} onChange={handleChange} type="text" required />

        <label htmlFor="description">Description</label>
        <input name="description" value={formData.description} onChange={handleChange} type="text" required />

        <label htmlFor="category">Category</label>
        <input name="category" value={formData.category} onChange={handleChange} type="text" required />

        <label htmlFor="date">Date</label>
        <input name="date" value={formData.date} onChange={handleChange} type="date" required />

        <label htmlFor="venue">Venue</label>
        <input name="venue" value={formData.venue} onChange={handleChange} type="text" required />

        <label htmlFor="price">Price</label>
        <input name="price" value={formData.price} onChange={handleChange} type="number" required />

        <label htmlFor="image">Image</label>
        <input
        name="image"
        type="file"
        accept="image/*"
        onChange={(e) =>
            setFormData((prev) => ({
            ...prev,
            image: e.target.files[0], // Store the File object
            }))
        }
        required
        />
        </div>

      <button className="form-btn" type="submit">Create Event</button>
    </form>
  );
}

export default CreateEventForm;
