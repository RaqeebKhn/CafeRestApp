import React, { useState } from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import forkIcon from '../assets/fork.png';
import searchIcon from '../assets/search.png';
import burgerIcon from '../assets/burger.png';
import pizzaIcon from '../assets/pizza.png';
import drinkIcon from '../assets/drink.png';
import frenchfriesIcon from '../assets/frenchfries.png';
import veggiesIcon from '../assets/veggies.png';

import burger1 from '../assets/burger1.png';
import burger2 from '../assets/burger2.png';
import burger3 from '../assets/burger3.png';
import burger4 from '../assets/burger4.png';
import burger5 from '../assets/burger5.png';
import burger6 from '../assets/burger6.png';

import pizza1 from '../assets/pizza1.png';
import pizza2 from '../assets/pizza2.png';
import pizza3 from '../assets/pizza3.png';
import pizza4 from '../assets/pizza4.png';
import pizza5 from '../assets/pizza5.png';
import pizza6 from '../assets/pizza6.png';

import drink1 from '../assets/drink1.png';
import drink2 from '../assets/drink2.png';
import drink3 from '../assets/drink3.png';
import drink4 from '../assets/drink4.png';
import drink5 from '../assets/drink5.png';
import drink6 from '../assets/drink6.png';

import frenchfries1 from '../assets/frenchfries1.png';
import frenchfries2 from '../assets/frenchfries2.png';
import frenchfries3 from '../assets/frenchfries3.png';
import frenchfries4 from '../assets/frenchfries4.png';
import frenchfries5 from '../assets/frenchfries5.png';
import frenchfries6 from '../assets/frenchfries6.png';

import veggies1 from '../assets/veggies1.png';
import veggies2 from '../assets/veggies2.png';
import veggies3 from '../assets/veggies3.png';
import veggies4 from '../assets/veggies4.png';
import veggies5 from '../assets/veggies5.png';
import veggies6 from '../assets/veggies6.png';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
    { id: 'Burger', icon: burgerIcon },
    { id: 'Pizza', icon: pizzaIcon },
    { id: 'Drinks', icon: drinkIcon },
    { id: 'French Fries', icon: frenchfriesIcon },
    { id: 'Veggies', icon: veggiesIcon }
  ];

  const menuItems = [
    { id: 1, name: 'Cheese Burger', category: 'Burger', image: burger1 },
    { id: 2, name: 'Bacon Burger', category: 'Burger', image: burger2 },
    { id: 3, name: 'BBQ Burger', category: 'Burger', image: burger3 },
    { id: 4, name: 'Black Bean Burger', category: 'Burger', image: burger4 },
    { id: 5, name: 'Mexican Burger', category: 'Burger', image: burger5 },
    { id: 6, name: 'Greek Burger', category: 'Burger', image: burger6 },

    { id: 7, name: 'Margharita Pizza', category: 'Pizza', image: pizza1 },
    { id: 8, name: 'Pepporoni Pizza', category: 'Pizza', image: pizza2 },
    { id: 9, name: 'BBQ Chicken Pizza', category: 'Pizza', image: pizza3 },
    { id: 10, name: 'New York Style Pizza', category: 'Pizza', image: pizza4 },
    { id: 11, name: 'Tandoori Pizza', category: 'Pizza', image: pizza5 },
    { id: 12, name: 'Chilli Paneer Pizza', category: 'Pizza', image: pizza6 },

    { id: 13, name: 'Mint Iced Tea', category: 'Drinks', image: drink1 },
    { id: 14, name: 'Choco Mocha Frappe', category: 'Drinks', image: drink2 },
    { id: 15, name: 'Choco Kitkat Blast', category: 'Drinks', image: drink3 },
    { id: 16, name: 'Chocolate Oreo Blast', category: 'Drinks', image: drink4 },
    { id: 17, name: 'Blaccurrent Mojito', category: 'Drinks', image: drink5 },
    { id: 18, name: 'Green Apple Mojito', category: 'Drinks', image: drink6 },

    { id: 19, name: 'Salted French Fries', category: 'French Fries', image: frenchfries1 },
    { id: 20, name: 'Garlic Masala French Fries', category: 'French Fries', image: frenchfries2 },
    { id: 21, name: 'Peri Peri French Fries', category: 'French Fries', image: frenchfries3 },
    { id: 22, name: 'Cheesy French Fries', category: 'French Fries', image: frenchfries4 },
    { id: 23, name: 'Lemon Pepper French Fries', category: 'French Fries', image: frenchfries5 },
    { id: 24, name: 'Loaded French Fries', category: 'French Fries', image: frenchfries6 },

    { id: 25, name: 'Veggie Wrap', category: 'Veggies', image: veggies1 },
    { id: 26, name: 'Kale Caesar Salad', category: 'Veggies', image: veggies2 },
    { id: 27, name: 'Vegetable Soup', category: 'Veggies', image: veggies3 },
    { id: 28, name: 'Zucchini Noodles', category: 'Veggies', image: veggies4 },
    { id: 29, name: 'Veggie Bun', category: 'Veggies', image: veggies5 },
    { id: 30, name: 'Egg Plant Parmesan', category: 'Veggies', image: veggies6 },
  ];

  const filteredItems = menuItems
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNextClick = () => {
    navigate('/place-order');
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="greeting-container">
          <h2 className="greeting-text">Good evening</h2>
          <p className="greeting-subtext">Place your order here</p>
        </div>

        <div className="custom-search-container">
          <div className="custom-search-input-wrapper">
            <img src={searchIcon} alt="Search" className="custom-search-icon" />
            <input
              type="text"
              className="custom-search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="menu-content">

        <div className="categories-scroll">
          <div className="categories-container">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <img
                  src={category.icon}
                  alt={category.id}
                  className={`category-icon ${category.id === 'Pizza' ? 'pizza-icon' : ''}`}
                />
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
                  <span className="add-item-button">+</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No menu items found. Try another search.</div>
          )}
        </div>
      </div>

      <button className="next-button" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Menu;