import React from 'react';
import { useState } from 'react';
import './filterSidebar.css';

function FilterSidebar({ filters, setFilters }) {
  const categories = ['Music', 'Technology', 'Sports', 'Art'];

  const [showSidebar, setShowSidebar] = useState(false);

  const handleCategoryClick = (category) => {
    setFilters({ ...filters, category });
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button 
        className="toggle-filter-btn" 
        onClick={() => setShowSidebar(prev => !prev)}
      ><i class="bi bi-arrow-bar-right"></i></button>
      <aside  className={`filter-sidebar ${showSidebar ? 'open' : ''}`}>
        <h3>Filter Events</h3>

        <label>Category</label>
        <div className="category-buttons">
          {categories.map((cat) => (
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
      </aside>
    </>
  );
}

export default FilterSidebar;
