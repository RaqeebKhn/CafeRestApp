import React from "react";
import { Link } from "react-router-dom";
import "./VerticalNavBar.css";


import dashboardIcon from '../assets/dashboard.png';
import menuIcon from '../assets/menu.png';
import orderlineIcon from '../assets/orderline.png';
import tablesIcon from '../assets/tables.png';

const navItems = [
  { id: 0, icon: null, empty: true },  
  { id: 1, icon: dashboardIcon },
  { id: 2, icon: menuIcon },
  { id: 3, icon: orderlineIcon },
  { id: 4, icon: tablesIcon },
  { id: 5, icon: null, empty: true },  
];

export default function VerticalNavBar({ active = 0 }) {
  return (
    <nav className="vertical-navbar">
      <ul className="nav-list">
        {navItems.map((item, idx) => (
          <li
            key={item.id}
            className={`nav-item ${item.empty ? 'empty' : ''} ${idx === active ? "active" : ""}`}
          >
            {item.empty ? (
              <div className="empty-icon"></div>
            ) : (
              <Link to={`/${idx + 1}`}>
                <img 
                  src={item.icon} 
                  alt={`nav-${item.id}`}
                  className="nav-icon"
                />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}