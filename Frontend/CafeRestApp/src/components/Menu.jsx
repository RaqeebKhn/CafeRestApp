import React, { useState } from 'react';
import './Menu.css';
import forkIcon from '../assets/fork.png';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Drinks', 'Desserts'];
  
  
  const menuItems = [
    { id: 1, name: 'Classic Burger', price: 8.99, category: 'Lunch', image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'Caesar Salad', price: 6.99, category: 'Lunch', image: 'https://via.placeholder.com/80' },
    { id: 3, name: 'Pancake Stack', price: 5.99, category: 'Breakfast', image: 'https://via.placeholder.com/80' },
    { id: 4, name: 'Grilled Chicken', price: 9.99, category: 'Dinner', image: 'https://via.placeholder.com/80' },
    { id: 5, name: 'Cappuccino', price: 3.99, category: 'Drinks', image: 'https://via.placeholder.com/80' },
    { id: 6, name: 'Chocolate Cake', price: 4.99, category: 'Desserts', image: 'https://via.placeholder.com/80' },
    { id: 7, name: 'Steak & Fries', price: 14.99, category: 'Dinner', image: 'https://via.placeholder.com/80' },
    { id: 8, name: 'Iced Tea', price: 2.99, category: 'Drinks', image: 'https://via.placeholder.com/80' },
  ];
  
  
  const filteredItems = menuItems
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="greeting-container">
          <h2 className="greeting-text">Good evening</h2>
          <p className="greeting-subtext">Place your order here</p>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="menu-content">
        
        <div className="categories-scroll">
          <div className="categories-container">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        
        <div className="menu-items-container">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="menu-item-details">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <p className="menu-item-price">${item.price.toFixed(2)}</p>
                </div>
                <button className="add-item-button">+</button>
              </div>
            ))
          ) : (
            <div className="no-results">No menu items found. Try another search.</div>
          )}
        </div>
      </div>
      
      
      <div className="mobile-cart-button">
        <span className="cart-items-count">3</span>
        <span className="cart-total">$23.97</span>
        <span className="view-cart">View Cart</span>
      </div>
    </div>
  );
};

export default Menu;