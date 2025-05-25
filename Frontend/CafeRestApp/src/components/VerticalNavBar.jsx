import React from "react";
import "./VerticalNavBar.css";

const navItems = [
  { id: 1, label: "Dashboard", icon: <span className="icon-placeholder" /> },
  { id: 2, label: "Orders", icon: <span className="icon-placeholder" /> },
  { id: 3, label: "Reports", icon: <span className="icon-placeholder" /> },
  { id: 4, label: "Analytics", icon: <span className="icon-placeholder" /> },
];

export default function VerticalNavBar({ active = 0 }) {
  return (
    <nav className="vertical-navbar">
      <div className="navbar-top-circle" />
      <ul>
        {navItems.map((item, idx) => (
          <li
            key={item.id}
            className={idx === active ? "active" : ""}
            title={item.label}
          >
            {item.icon}
          </li>
        ))}
      </ul>
      <div className="navbar-bottom-circle" />
    </nav>
  );
}