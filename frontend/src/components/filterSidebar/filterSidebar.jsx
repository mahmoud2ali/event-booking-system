import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './filterSidebar.css';

function FilterSidebar({ filters, setFilters }) {
  // const categories = ['Music', 'Technology', 'Sports', 'Art'];

  const [showSidebar, setShowSidebar] = useState(false);

  const {events} = useSelector((state) => state.events);

  const catigories = [...new Set(events.map(event => event.category))];

  // const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    setFilters({ ...filters, category });
  };

  // const handleChange = (e) => {
  //   setFilters({ ...filters, [e.target.name]: e.target.value });
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  
  return (
    <>
      <button 
        className="toggle-filter-btn" 
        onClick={() => setShowSidebar(prev => !prev)}
      >
        <i className={`${showSidebar ? "bi bi-arrow-bar-left" : "bi bi-arrow-bar-right"}  `}></i>
      </button>
      <aside className={`filter-sidebar ${showSidebar ? 'open' : ''}`}>
        <h3>Filter Events</h3>

        <label>Category</label>
        <div className="category-buttons">
          {catigories?.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${filters.category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
          <button
            className={`category-btn ${filters.category === '' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('')}
          >
            All
          </button>
        </div>

        <label>Max Price</label>
        <input 
          type="number" 
          name="maxPrice" 
          value={filters.maxPrice} 
          onChange={handleChange} 
          placeholder="e.g. 100" 
        />

        <label>Date</label>
        <input 
          type="date" 
          name="date" 
          value={filters.date} 
          onChange={handleChange} 
        />

        <button 
          className="clear-filters-btn" 
          onClick={() => setFilters({ category: '', maxPrice: '', date: '' })}
        >
          Clear Filters
        </button>
      </aside>
    </>
  );
}

export default FilterSidebar;
